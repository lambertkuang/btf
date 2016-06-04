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
  })
  .catch((err) => {
    console.log('Error somewhere: ', err);
  });
}

export { fillEmUp };
