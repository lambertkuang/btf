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