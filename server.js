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
    res.status(200).render('home', { posts: data.posts });
});

app.use(express.static('public'));

app.get('*', function (req, res) {
    res.status(404).render('404');
});

///////////////////////////////////////////////////////

app.listen(port, function () {
    console.log("== Server is listening on port", port);
});
