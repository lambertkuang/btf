import Champion from '../schemas/champions';
import Champion3v3 from '../schemas/champions3v3';
import Match from '../schemas/matches';

function calculateStats (cb) {
  Match.count((err, numMatches) => {
    if (!err) {
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
    }
  });
}

function calculate3v3Stats (cb) {
  Match.count({queueType: 'RANKED_TEAM_3x3'}, (err, numMatches) => {
    if (!err) {
      Champion3v3.aggregate([
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
    }
  });
}

export {
  calculateStats,
  calculate3v3Stats
};