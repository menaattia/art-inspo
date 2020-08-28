const router = require('express').Router();
const User = require('../database/models/user')
const post = require('../database/models/post')
const challenge = require('../database/models/challenge')
const passport = require('passport')
require('mongoose').set('debug', true)

const fs = require('fs');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        // cb(null, file.fieldname + '-' + Date.now())
        cb(null, file.originalname)
    }
});

const fileFilter = (req,file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }


}

var upload = multer({ storage: storage, limits: {
    fileFilter: fileFilter
}});



router.route('/').get((req,res) => {
    // console.log(req.session.id);

    post.Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
})
// .post(upload.single('img'),(req,res, next) => {
//         console.log(req.file);
//
//
//     const newPost = new post.Post({
//         user: req.body.user,
//         title: req.body.title,
//         content: req.body.content,
//         img: req.file.path
//     })
//
//     console.log('new post', newPost);
//
//     newPost.save(function(err, savedPost, numAffected) {
//         if (savedPost) {
//           console.log('saved');
//
//             User.findOneAndUpdate({username: newPost.user}, {$push: {posts: newPost}}, function (error, success) {
//                 if (error) {
//                     console.log(error);
//                     res.status(400).json('Error: ' + error)
//                 } else {
//                     console.log(success);
//                     res.json('Post added!')
//                 }
//             });
//
//             // challenge.Challenge.findOneAndUpdate({name: req.body.challenge},{$push: {posts: newPost}}, function (error, success) {
//             //     if (error) {
//             //         console.log(error);
//             //         res.status(400).json('Error: ' + error)
//             //     } else {
//             //         console.log(success)
//             //         res.json('Post added!')
//
//             //     } })
//
//         } else {
//           console.log(err);
//         }
//     })
//     // .then(()=> {
//     //     res.json('Post added!')})
//     // .catch(err => res.status(400).json('Error: ' + err))
// })


// router.route('/challenges').post((req,res, next) => {
//       console.log(req.file);
//
//     const newPost = new post.Post({
//         user: req.body.user,
//         title: req.body.title,
//         content: req.body.content,
//         img: req.body.img
//     })
//
//     console.log('new post', newPost);
//
//
//     challenge.Challenge.findOneAndUpdate({name: req.body.challenge},{$push: {posts: newPost}}, function (error, success) {
//         if (error) {
//             console.log(error);
//             res.status(400).json('Error: ' + error)
//         } else {
//             console.log(success)
//             res.json('Post added to challenge!')
//
//         } })
// })

router.route('/:user').get((req,res)=> {
    post.Post.find({user: req.params.user})
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json('Error: ' + err));
})

module.exports = router;
