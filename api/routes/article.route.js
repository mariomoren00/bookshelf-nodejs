'use strict';

var express = require('express');
var articleController = require('../controllers/article.controller');
var article = express.Router();

/* GET /articles */
article.get('/articles', articleController.getArticles);
/* GET /article/:article_id */
article.get('/article/:article_id', articleController.getArticleById);
/* POST /article */
article.post('/article', articleController.saveArticle);
/* put /article/:article_id */
article.put('/article/:article_id', articleController.updateArticle);
/* delete /article/:article_id */
article.delete('/article/:article_id', articleController.deleteArticle);

module.exports = article;
