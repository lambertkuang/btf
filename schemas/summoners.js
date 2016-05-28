import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const summonerSchema = new Schema({
  summonerId: Number,
  matches: []
});

const Summoner = mongoose.model('Summoner', summonerSchema);

export default Summoner;