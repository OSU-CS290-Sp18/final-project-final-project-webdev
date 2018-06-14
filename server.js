// setup
var path = require('path'),
    express = require('express'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    Mongo = require('mongodb').MongoClient;

var mongoHost = process.env.MONGO_HOST,
    mongoPort = process.env.MONGO_PORT || '27017',
    mongoUsername = process.env.MONGO_USERNAME,
    mongoPassword = process.env.MONGO_PASSWORD,
    mongoDBName = process.env.MONGO_DB_NAME,
    mongoURL = "mongodb://" + mongoUsername + ":" + mongoPassword + "@" + mongoHost + ":" + mongoPort + "/" + mongoDBName,
    mongoDB = null;

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());

///////////////////////////////////////////////////////
/////////////////////// ROUTES ////////////////////////
///////////////////////////////////////////////////////

app.get('/', function (req, res, next) {
    var postCollection = mongoDB.collection('posts');
    postCollection.find().toArray((err, posts) => {
        if (err) {
            res.status(500).send("Error fetching posts from DB.");
        } else {
            res.status(200).render('home', { posts: posts, active: {home: true} });
        }
    });
});

app.get('/tags/:tag', (req, res, next) => {
    const tag = req.params.tag;
    
    var postCollection = mongoDB.collection('posts');
    postCollection.find({tags: tag}).toArray((err, posts) => {
        if (err) {
            res.status(500).send("Error fetching posts from DB.");
        } else {
            var active = {};
            active[tag] = true;
            res.status(200).render('home', {
                posts: posts,
                active
            });
        }
    });
});

app.get('/tags', (req, res, next) => {
    res.status(200).render('tags', { active: { tags: true } });
});

app.use(express.static('public'));

app.post('/newPost', (req, res, next) => {
    if (req.body.author && req.body.text) {
        var postCollection = mongoDB.collection('posts');
        postCollection.count((err, count) => {
            if (err) {
                res.status(500).send('Error accessing DB.');
            } else {
                var post = {
                    postID: count, 
                    author: req.body.author,
                    text: req.body.text,
                    tags: req.body.tags,
                    comments: []
                }
        
                postCollection.insertOne(post, (err, result) => {
                    if (err) {
                        res.status(500).send('Error inserting post into DB.');
                    } else {
                        if (result.insertedCount > 0) {
                            res.status(200).end();
                        } else {
                            next();
                        }
                    }
                });
            }
        });

    }
    else res.status(400).send("Request needs a json body with an author string, text string, and array of string tags.");
});

app.post('/post/:id/newComment', (req, res, next) => {
    var id = parseInt(req.params.id, 10);
    
    if (req.body.author && req.body.text)
    {
        var comment = {
            author: req.body.author,
            text: req.body.text
        }
        var postCollection = mongoDB.collection('posts');
        postCollection.updateOne(
            {postID: id},
            {$push: { comments: { $each: [comment], $position: 0 }}},
            (err, result) => {
                if (err) {
                    res.status(500).send('Error adding comment to post.');
                } else {
                    if (result.matchedCount > 0) {
                        res.status(200).end();
                    } else {
                        next();
                    }
                }
            }
        );
    } 
    else res.status(400).send("Request needs a json body with an author string and text string.");
});

app.delete('/post/:id/delete', (req, res, next) => {
    var id = parseInt(req.params.id, 10);
    
    var postCollection = mongoDB.collection('posts');
    postCollection.remove(
        {postID: id},
        (err, numRemoved) => {
            if (err) {
                res.status(500).send('Error adding comment to post.');
            } else {
                if (numRemoved > 0) {
                    res.status(200).end();
                } else {
                    next();
                }
            }
        }
    );
});
    
app.get('*', function (req, res) {
    res.status(404).render('404', {active: { none: true }});
});

///////////////////////////////////////////////////////

Mongo.connect(mongoURL, (err, client) => {
    if (err) {
        throw err;
    }
    mongoDB = client.db(mongoDBName);
    app.listen(port, () => {
        console.log("== Server listening on port", port);
    });
});
