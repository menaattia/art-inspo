const router = require('express').Router();
const User = require('../database/models/user')
const category = require('../database/models/category')

router.route('/').get((req,res) => {

    category.Category.find()
    .then(categories => res.json(categories))
    .catch(err => res.status(400).json('Error: ' + err));
}).post((req,res) => {
    const newCategory = new category.Category({
        user: req.body.user,
        name: req.body.name,
        description: req.body.description
    })

    newCategory.save()
    .then(()=> {
        res.json('Category added!')})
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:categoryName').get((req,res) => {
    const categoryName = req.params.categoryName
    category.Category.findOne({name: categoryName})
    .then(category => res.json(category))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
