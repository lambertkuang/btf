import helper from './helpers';
import Champion from '../schemas/champions';
import Match from '../schemas/matches';
import Summoner from '../schemas/summoners';

// summonerId for ftlulz
const seedId = 40944736;

function fillEmUp() {
  // what to do if the summoner id has already been seen?
  Promise.resolve(helper.parseSummonerMatches(seedId)).then((summoner) => {
    // get all the match Ids for that summoner
    console.log('this is summoner ======>', summoner);
    return summoner.matches.map((match) => {
      return match.matchId;
    });
  })
  .then((matches) => {
    // go through each of the matches and store info into dbs
    console.log('matches =-====-===>> ', matches);
    return Promise.all(matches.map((match) => {
      return Promise.resolve(helper.parseMatchAndChamp(match));
    }));
  })
  .then(() => {
    // restart process with a new summoner Id
    console.log('Done with this first round');
  })
  .catch((err) => {
    console.log('Error somewhere in the chain: ', err);
  });
}

export { fillEmUp };
