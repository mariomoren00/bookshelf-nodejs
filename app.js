'use strict';

// When the app starts
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Promise  = require('bluebird');

//var bookshelf = require('./api/config/bookshelf');

//app.set('bookshelf', bookshelf);

var allowCrossDomain=function(req,res,next){
        res.header('Access-Control-Allow-Origin','*');
        next();
};

app.use(allowCrossDomain);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }))



// elsewhere, to use the bookshelf client:
//var bookshelf = app.get('bookshelf');



var article = require('./api/routes/article.route');

app.disable('etag');

app.use('/api/v1', article);


app.listen(3000,function(){
	console.log("Express started at port 3000");
});
