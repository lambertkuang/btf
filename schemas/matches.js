import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const matchSchema = new Schema({
  matchId: Number,
  participants: [],
  champions: []
});

const Match = mongoose.model('Match', matchSchema);

export default Match;