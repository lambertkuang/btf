import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const matchSchema = new Schema({
  matchId: Number,
  queueType: String,
  participants: [],
  participantIdentities: [],
  teams: []
});

const Match = mongoose.model('Match', matchSchema);

export default Match;