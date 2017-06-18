'use strict';

// When the app starts
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Promise  = require('bluebird');

// Declare access control
var allowCrossDomain=function(req,res,next){
        res.header('Access-Control-Allow-Origin','*');
        next();
};

app.use(allowCrossDomain);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

// Declare routes
var routes = require('./api/routes/api.route');

app.use('/api/v1', routes);

// Start server
app.listen(3000,function(){
	console.log("Express started at port 3000");
});
