import Champion from '../schemas/champions';
import Match from '../schemas/matches';

function calculateStats (cb) {
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
          },
          gamesWon: '$gamesWon',
          gamesTotal: '$gamesTotal',
          gamesBanned: '$gamesBanned'
        }
      }
    ], (err, result) => {
      if (err) {
        console.log('Error aggregate', err);
      } else {
        cb(result);
      }
    });
  });
}

export { calculateStats };