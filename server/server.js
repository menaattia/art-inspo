require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session')
const dbConnection = require('./database')
const MongoStore = require('connect-mongo')(session)
const passport = require('./passport');
const fileUpload = require('express-fileupload');
const app = express()
// Route requires
const user = require('./routes/user')
const postsRouter = require('./routes/posts')
const challengesRouter = require('./routes/challenges')
const categoriesRouter = require('./routes/categories')
const resourcesRouter = require('./routes/resources')
const themesRouter = require('./routes/themes')
const photosRouter = require('./routes/photos')
const post = require('./database/models/post')
const photo = require('./database/models/photo')
const challenge = require('./database/models/challenge')
const theme = require('./database/models/theme')
const User = require('./database/models/user')


app.use(fileUpload({
    createParentPath: true
}));

app.use('/uploads', express.static(__dirname +'/uploads'));
// MIDDLEWARE
app.use(morgan('dev'))
app.use(
	bodyParser.urlencoded({
		extended: true
	})
)
app.use(bodyParser.json())

// Sessions
app.use(
	session({
		secret: 'stop-stalking',
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)

// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser



// Routes
app.use('/user', user)
app.use('/posts', postsRouter)
app.use('/challenges', challengesRouter)
app.use('/categories', categoriesRouter)
app.use('/themes', themesRouter)
app.use('/resources', resourcesRouter)
app.use('/photos', photosRouter)

app.post('/posts', (req,res) => {
	const img = req.files.img
	img.mv('./server/uploads/' + img.name)

	const newPost = new post.Post({
	        user: req.body.user,
	        title: req.body.title,
	        content: req.body.content,
	        img: 'uploads/' +img.name
	    })


	newPost.save(function(err, savedPost, numAffected) {
			if (savedPost) {
				console.log('saved');

					User.findOneAndUpdate({username: newPost.user}, {$push: {posts: newPost}}, function (error, success) {
							if (error) {
									console.log(error);
									res.status(400).json('Error: ' + error)
							} else {
									console.log(success);
									res.json('Post added!')
							}
					});
				}
			})

})

app.post('/posts/challenges', (req,res) => {
	const img = req.files.img
	console.log(img);
	console.log(req.body);
	img.mv('./server/uploads/' + img.name)

	const newPost = new post.Post({
	        user: req.body.user,
	        title: req.body.title,
	        content: req.body.content,
	        img: 'uploads/' +img.name
	    })

console.log(newPost);

	challenge.Challenge.findOneAndUpdate({name: req.body.challenge},{$push: {posts: newPost}}, function (error, success) {
	        if (error) {
	            console.log(error);
	            res.status(400).json('Error: ' + error)
	        } else {
	            console.log(success)
	            res.json('Post added to challenge!')

	        } })


})

app.post('/photos', (req,res) => {
	const img = req.files.img
	img.mv('./server/uploads/' + img.name)

	const newPhoto = new photo.Photo({
	        user: req.body.user,
	        title: req.body.title,
	        img: 'uploads/' +img.name
	    })


	newPhoto.save(function(err, savedPhoto, numAffected) {
			if (savedPhoto) {
				console.log('saved');

					User.findOneAndUpdate({username: newPhoto.user}, {$push: {photos: newPhoto}}, function (error, success) {
							if (error) {
									console.log(error);
									res.status(400).json('Error: ' + error)
							} else {
									console.log(success);
									res.json('Photo added!')
							}
					});
				}
			})

})

app.post('/photos/themes', (req,res) => {
	const img = req.files.img
	console.log(img);
	console.log(req.body);
	img.mv('./server/uploads/' + img.name)

	const newPhoto = new photo.Photo({
	        user: req.body.user,
	        title: req.body.title,
	        img: 'uploads/' +img.name
	    })

console.log(newPhoto);

	theme.Theme.findOneAndUpdate({name: req.body.theme},{$push: {photos: newPhoto}}, function (error, success) {
	        if (error) {
	            console.log(error);
	            res.status(400).json('Error: ' + error)
	        } else {
	            console.log(success)
	            res.json('Photo added to theme!')

	        } })


})

app.post('/bio', (req,res) => {
	const user= req.body.username
	const bio= req.body.bio

	User.findOneAndUpdate({username: user},{$set: {bio: bio}}, function (error, success) {
		if (error) {
			console.log(error);
			res.status(400).json('Error: ' + error)
		} else {
			console.log(success)
			res.json({data: bio, message:"bio updated!"})

		} })
})



const PORT = process.env.PORT;
if (port == null || port == "") {
	port = 8080
}

// Starting Server
app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
