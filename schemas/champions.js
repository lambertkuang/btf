import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const championSchema = new Schema({
  championId: Number,
  gamesWon: Number,
  gamesTotal: Number,
  gamesBanned: Number
});

const Champion = mongoose.model('Champion', championSchema);

export default Champion;