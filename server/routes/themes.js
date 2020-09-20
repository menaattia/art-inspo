const router = require('express').Router();
const theme = require('../database/models/theme')

router.route('/').get((req,res) => {

    theme.Theme.find()
    .then(themes => res.json(themes))
    .catch(err => res.status(400).json('Error: ' + err));
}).post((req,res) => {
    const newTheme = new theme.Theme({
        user: req.body.user,
        name: req.body.name,
        description: req.body.description
    })

    newTheme.save()
    .then(()=> {
        res.json('Theme added!')})
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:themeName').get((req,res) => {
    const themeName = req.params.themeName
    theme.Theme.findOne({name: themeName})
    .then(theme => res.json(theme))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;