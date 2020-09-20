const router = require('express').Router();
const User = require('../database/models/user')
const resource = require('../database/models/resource')


router.route('/').get((req,res) => {
    resource.Resource.find()
    .then(resources => res.json(resources))
    .catch(err => res.status(400).json('Error: ' + err));
})
.post((req,res) => {
    const newResource = new resource.Resource({
      user: req.body.user,
      title: req.body.title,
      content: req.body.content
    })

    newResource.save(function(err, savedResource, numAffected) {

      if (savedResource) {
        console.log('saved');

        User.findOneAndUpdate({username: newResource.user}, {$push: {resources: newResource}}, function (error, success) {
            if (error) {
                console.log(error);
                res.status(400).json('Error: ' + error)
            } else {
                console.log(success);
                res.json('resource added!')
            }
        });

      }
  })

})


router.route('/:user').get((req,res)=> {
  resource.Resource.find({user: req.params.user})
  .then(resources => res.json(resources))
  .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
