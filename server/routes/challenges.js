const router = require('express').Router();
let User = require('../database/models/user')
let challenge = require('../database/models/challenge')

router.route('/').get((req,res) => {

    challenge.Challenge.find()
    .then(challenges => res.json(challenges))
    .catch(err => res.status(400).json('Error: ' + err));
}).post((req,res) => {
    const newChallenge = new challenge.Challenge({
        user: req.body.user,
        name: req.body.name,
        description: req.body.description
    })

    newChallenge.save()
    .then(()=> {
        res.json('Challenge added!')})
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:challengeName').get((req,res) => {
    const challengeName = req.params.challengeName
    challenge.Challenge.findOne({name: challengeName})
    .then(challenge => res.json(challenge))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
