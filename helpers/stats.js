import Champion from '../schemas/champions';
import Match from '../schemas/matches';

function calculateStats () {
  Match.count((err, numMatches) => {
    Champion.aggregate([
      {
        $project: {
          championId: 1,
          winRate: {
            $divide: ['$gamesWon', '$gamesTotal']
          },
          pickRate: {
            $divide: ['$gamesTotal', numMatches]
          },
          banRate: {
            $divide: ['$gamesBanned', numMatches]
          }
        }
      }
    ], (err, result) => {
      if (err) {
        console.log('Error aggregate', err);
      } else {
        console.log('Results: ', result);
      }
    });
  });
}

export { calculateStats };