import axios from 'axios';
import fs from 'fs';
import path from 'path';
import Match from '../schemas/matches';
import Champion from '../schemas/champions';
import Summoner from '../schemas/summoners';
import Bottleneck from 'bottleneck';

const limiter = new Bottleneck(1, 1000);
const API_KEY = fs.readFileSync(path.join(__dirname, '../private/api_key.txt')).toString();
const days = 10;
const daysAgo = days * 24 * 60 * 60 * 1000;

const summonerByName = axios.create({
  baseURL: 'https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/',
  params: {
    api_key: API_KEY
  }
});

const matchList = axios.create({
  baseURL: 'https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/',
  params: {
    api_key: API_KEY,
    seasons: 'SEASON2016'
    // beginTime: Date.now() - daysAgo
  }
});

const singleMatch = axios.create({
  baseURL: 'https://na.api.pvp.net/api/lol/na/v2.2/match/',
  params: {
    api_key: API_KEY
  }
});

// return a promise with summoner info
function getSummonerId(name) {
  return new Promise((resolve, reject) => {
    summonerByName.get('/' + name.toString())
    .then((response) => {
      resolve(response.data);
    })
    .catch((response) => {
      reject(response);
    });
  });
}

// return a promise with matchlist of a summoner
function getMatchList(id) {
  return new Promise((resolve, reject) => {
    matchList.get('/' + id)
    .then((response) => {
      resolve(response.data);
    })
    .catch((response) => {
      reject(response);
    });
  });
}

// return a promise with the match info
function getMatch(id) {
  return new Promise((resolve, reject) => {
    singleMatch.get('/' + id)
    .then((response) => {
      resolve(response.data);
    })
    .catch((response) => {
      reject(response);
    })
  });
}

function getMatchFromDb(id) {
  return new Promise((resolve, reject) => {
    Match.findOne({matchId: id}, (err, match) => {
      if (err) {
        reject(err);
      } else {
        resolve(match);
      }
    });
  });
}

// TODO: handle errors

function parseMatchAndChamp(id) {

  Match.count({matchId: id}, (err, count) => {
    if (count === 0) {
      // retrieve match from Riot API and save the match
      limiter.schedule(getMatch, id)
      .then((match) => {
        let newMatch = new Match({
          matchId: id,
          queueType: match.queueType,
          participants: match.participants,
          participantIdentities: match.participantIdentities,
          teams: match.teams
        });

        newMatch.save((err) => {
          if (err) {
            console.log('Error saving match to db: ', err);
          }
        });

        // store each player into summoner db
        Promise.all(match.participantIdentities.map((participant) => {
          return parseSummonerMatches(participant.player.summonerId);
        }))
        .then(() => {
          console.log('Done adding summoners to db');
        });

        // determine which champions won and update them
        Promise.all(match.participants.map((info) => {
          let champData = {
            championId: info.championId,
            winner: info.stats.winner
          };
          return Promise.resolve(updateChampion(champData));
        }))
        .then(() => {
          console.log('Champions updated');
        })
        .catch((err) => {
          console.log('Error updating champions: ', err);
        });

        // update ban rate for champion; bannedChamps is an array of champion Ids
        let bannedChamps = match.teams.map((team) => {
          return team.bans.map((champ) => {
            return champ.championId;
          });
        })
        .reduce((cur, next) => {
          return cur.concat(next);
        });

        Promise.all(bannedChamps.map((id) => {
          return Promise.resolve(updateBannedChampion(id));
        }))
        .then(() => {
          console.log('Updated banned champions');
        })
        .catch((err) => {
          console.log('Error updating banned champions: ', err);
        });
      })
      .catch((res) => {
        console.log('Error with getting match: ', res);
      });
    }
  })
}

function parseSummonerMatches(id) {
  return new Promise((resolve, reject) => {
    Summoner.count({summonerId: id}, (err, count) => {
      if (count === 0) {
        limiter.schedule(getMatchList, id)
        .then((matchData) => {
          Summoner.findOneAndUpdate({summonerId: id}, {
            matches: matchData.matches
          }, {upsert: true, new: true}, (err, summoner) => {
            if (err) {
              console.log('Error updating Summoner history: ', err);
              reject(err);
            } else {
              console.log(summoner.summonerId, 'Successfully updated summoner');
              resolve(summoner);
            }
          });
        })
        .catch((res) => {
          console.log('Error with getting match history: ', res);
        });
      }
    });
  });
}

function updateChampion(champ) {
  if (champ.winner) {
    Champion.findOneAndUpdate({championId: champ.championId}, {
      $inc: {gamesWon: 1, gamesTotal: 1}
    }, {upsert: true, new: true}, (err, champion) => {
      if (err) {
        console.log('Error updating champion: ', err);
      } else {
        console.log('Successfully updated champion: ', champion);
      }
    });
  } else {
    Champion.findOneAndUpdate({championId: champ.championId}, {
      $inc: {gamesTotal: 1}
    }, {upsert: true, new: true}, (err, champion) => {
      if (err) {
        console.log('Error updating champion: ', err);
      } else {
        console.log('Successfully updated champion: ', champion);
      }
    });
  }
}

function updateBannedChampion(championId) {
  Champion.findOneAndUpdate({championId: championId}, {
    $inc: {gamesBanned: 1}
  }, {upsert: true, new: true}, (err, champion) => {
    if (err) {
      console.log('Error updating banned Champs: ', err);
    } else {
      console.log('Successfully updated banned champ: ', champion);
    }
  });
}

export default {
  getSummonerId: getSummonerId,
  getMatchList: getMatchList,
  getMatch: getMatch,
  getMatchFromDb: getMatchFromDb,
  parseMatchAndChamp: parseMatchAndChamp,
  parseSummonerMatches: parseSummonerMatches
};
