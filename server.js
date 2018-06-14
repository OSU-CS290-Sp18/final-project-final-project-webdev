// setup
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

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

var data = require('./data.json');
// root route
app.get('/', function (req, res, next) {
    res.status(200).render('home', { posts: data.posts, active: {home: true} });
});

app.get('/tag/:tag', function (req, res, next) {
    const tag = req.params.tag;
    
    if (data.tags.includes(tag)) {
        var posts = [];
        for (let i = 0; i < data.posts.length; i++) {
            const e = data.posts[i];
            if (e.tags.includes(tag)) posts.push(e);
        }
        if (posts) {
            var active = {};
            active[tag] = true;
            res.status(200).render('home', {
                posts: posts,
                active
            });
        }
    } else {
        next();
    }
});

app.use(express.static('public'));

app.post('/newPost', (req, res, next) => {
    // author and text are strings, tags is an array of strings
    var post = {
        author: req.body.author,
        text: req.body.text,
        tags: req.body.tags
    }
    
    if (req.body.author && req.body.text) {
        data.posts.push(post);
        res.status(200).end();
    }
    else res.status(400).send("Request needs a json body with an author string, text string, and array of string tags.");
});

app.post('/post/:id/newComment', (req, res, next) => {
    var id = parseInt(req.params.id, 10);
    var post = data.posts.filter(e => e._id === id)[0];
    if (post) {
        if (req.body.author && req.body.text)
        {
            var comment = {
                author: req.body.author,
                text: req.body.text
            }
            post.comments.push(comment);
            res.status(200).end();
        } 
        else res.status(400).send("Request needs a json body with an author string and text string.");
    } else {
        next();
    }
});
    
app.get('*', function (req, res) {
    res.status(404).render('404');
});

///////////////////////////////////////////////////////

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});
