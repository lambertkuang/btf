import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const champion3v3Schema = new Schema({
  championId: Number,
  gamesWon: {type: Number, default: 0},
  gamesTotal: {type: Number, default: 0},
  gamesBanned: {type: Number, default: 0}
});

const Champion3v3 = mongoose.model('Champion3v3', champion3v3Schema);

export default Champion3v3;