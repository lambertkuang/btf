import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const championSchema = new Schema({
  championId: Number,
  gamesWon: {type: Number, default: 0},
  gamesTotal: {type: Number, default: 0},
  gamesBanned: {type: Number, default: 0}
});

const Champion = mongoose.model('Champion', championSchema);

export default Champion;