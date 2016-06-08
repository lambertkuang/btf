import helper from './helpers';
import Champion from '../schemas/champions';
import Match from '../schemas/matches';
import Summoner from '../schemas/summoners';

// summonerId for ftlulz
const seedId = 40944736;

function fillEmUp() {
  helper.parseSummonerMatches(seedId)
  .then((summoner) => {
    return summoner.matches.map((match) => {
      return match.matchId;
    });
  })
  .then((matches) => {
    return Promise.all(matches.map((match) => {
      return helper.parseMatchAndChamp(match);
    }));
  })
  .then(() => {
    console.log('Done with first round');
    // get more matches
  })
  .catch((err) => {
    console.log('Error somewhere: ', err);
  });
}

function getMoreMatches() {
  // go through summoner db and parse each summoner's matches
  Summoner.find((err, summoners) => {
    let allMatches = summoners.map((summoner) => {
      return summoner.matches;
    })
    .reduce((cur, next) => {
      return cur.concat(next);
    });
    Promise.all(allMatches.map((match) => {
      return helper.parseMatchAndChamp(match.matchId);
    }))
    .then(() => {
      console.log('all matches from all summoners in db have been parsed');
    })
    .catch((err) => {
      console.log('Error parsing matches from summonersdb: ', err);
    });
  });
}

export {
  fillEmUp,
  getMoreMatches
};
