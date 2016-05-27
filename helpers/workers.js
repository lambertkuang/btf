import helper from './helpers';
import Match from '../schemas/matches';
import Champion from '../schemas/champions';

// need function to check if the match is already in the database
// if it is, don't do anything
// otherwise, add the match and update data for each champion in the match

function parseMatchAndChamp(id) {
  Match.count({matchId: id}, (err, count) => {
    if (count === 0) {
      // retrieve match from Riot API and save the match
      helper.getMatch(id)
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

        // determine which champions won and update them
        let champInfo = match.participants.map((info) => {
          return {
            championId: info.championId,
            winner: info.stats.winner
          };
        });

        champInfo.forEach((champ) => {
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

        bannedChamps.forEach((championId) => {
          Champion.findOneAndUpdate({championId: championId}, {
            $inc: {gamesBanned: 1}
          }, {upsert: true, new: true}, (err, champion) => {
            if (err) {
              console.log('Error updating banned Champs: ', err);
            } else {
              console.log('Successfully updated banned champ: ', champion);
            }
          });
        });
      })
      .catch((res) => {
        console.log('Error with getting match: ', res);
      });
    }
  })
}

export default {
  parseMatchAndChamp: parseMatchAndChamp
};