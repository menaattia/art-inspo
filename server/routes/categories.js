const router = require('express').Router();
const User = require('../database/models/user')
const category = require('../database/models/category')
const resource = require('../database/models/resource')

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


router.route('/post').post((req,res) => {

	const newResource = new resource.Resource({
	        user: req.body.user,
	        title: req.body.title,
	        content: req.body.content
	    })

console.log(newResource);

	category.Category.findOneAndUpdate({name: req.body.category},{$push: {resources: newResource}}, function (error, success) {
	        if (error) {
	            console.log(error);
	            res.status(400).json('Error: ' + error)
	        } else {
	            console.log(success)
	            res.json('Resource added to category!')

	        } })


})

module.exports = router;
