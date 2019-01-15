const router = require('express').Router();
const Pusher = require('pusher');
const mongoose = require('mongoose');
const Vote = require('../model/vote');

var pusher = new Pusher({
    appId: '689965',
    key: '224f08dea179306d4b56',
    secret: '8c2af3d9c1a2a6cf07cd',
    cluster: 'eu',
    encrypted: true
  });

router.get('/', (req, res) => {
    Vote.find().then(votes => res.json({success: true, votes: votes}));
});

router.post('/', (req, res) => {
    const newVote = {
        club: req.body.club,
        points: 1
    }
    new Vote(newVote).save().then(vote => {
        pusher.trigger('club-poll', 'club-vote', {
            points: parseInt(vote.points),
            club: vote.club
        });
    
        return res.json({success: true, message: 'Thanks!, your vote has been added.'});
    });
});

module.exports = router;