// setup
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


///////////////////////////////////////////////////////
/////////////////////// ROUTES ////////////////////////
///////////////////////////////////////////////////////

var data = require('./data.json');
// root route
app.get('/', function (req, res, next) {
    res.status(200).render('home', { posts: data.posts, active: {active_home: true} });
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
            var active_tag = "active_" + tag;
            var active = {};
            active[active_tag] = true;
            console.log(active);
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

app.get('*', function (req, res) {
    res.status(404).render('404');
});

///////////////////////////////////////////////////////

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});
