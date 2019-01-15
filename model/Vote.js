const mongoose = require('mongoose');
const VoteSchema = mongoose.Schema({
    club: String,
    points: String
});

const Vote = mongoose.model('vote', VoteSchema);

module.exports = Vote;