'use strict';

var express = require('express');

var usersController = require('../controllers/users.controller');
var articlesController = require('../controllers/articles.controller');

module.exports = (function () {

	var api = express.Router();

	api.get('/users', usersController.getUsers);
	api.post('/users', usersController.saveUser);
	api.get('/users/:id', usersController.getUserById);
	api.put('/users/:id', usersController.updateUser);
	api.delete('/users/:id', usersController.deleteUser);

  api.get('/articles', articlesController.getArticles);
  api.post('/articles', articlesController.saveArticle);
  api.get('/articles/:id', articlesController.getArticleById);
  api.put('/articles/:id', articlesController.updateArticle);
  api.delete('/articles/:id', articlesController.deleteArticle);


  return api;

})();