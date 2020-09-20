const router = require('express').Router();
const photo = require('../database/models/photo')

router.route('/').get((req,res) => {

    photo.Photo.find()
    .then(photos => res.json(photos))
    .catch(err => res.status(400).json('Error: ' + err));
})


router.route('/:user').get((req,res)=> {
    photo.Photo.find({user: req.params.user})
    .then(photos => res.json(photos))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;