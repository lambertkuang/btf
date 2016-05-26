import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const championSchema = new Schema({
  championId: Number,
  championName: String,
  gamesWon: Number,
  gamesTotal: Number
});

const Champion = mongoose.model('Champion', championSchema);

export default Champion;