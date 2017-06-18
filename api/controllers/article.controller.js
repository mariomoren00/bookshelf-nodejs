'use strict';

var articleModel = require('../models/article.model');

/* GET /api/articles */
function getArticles(req, res, next){
	articleModel.Articles.forge()
	.query('where', 'deleted', '=', '0')
	.fetch()
	.then(function(collection){
		res.json({
			error : false,
			data : collection.toJSON()
		});
	})
	.catch(function (err) {
			res.status(500)
		.json({
			error: true,
			data: {message: err.message}
		});
	});
};

/* GET /api/article/:article_id */
function getArticleById(req, res, next){
	articleModel.Article.forge({
		id : req.params.article_id
	})
	.query('where', 'deleted', '=', '0')
	.fetch()
	.then(function(article){
		if(!article){
			res.status(404)
			.json({
				error : true,
				data : {}
			})
		}else{
			res.json({
				error : false,
				data : article.toJSON()
			})
		}
	})
	.catch(function(err){
		res.status(500)
		.json({
			error : false,
			data : {message : err.message}
		})
	})
};

/* POST /api/article */
function saveArticle(req, res, next){
	articleModel.Article.forge({
		title : req.body.title,
		body : req.body.body,
		author : req.body.author
	})
	.save()
	.then(function(article){
		res.json({
			error: false,
			data: {
				title : article.get('title'),
				body : article.get('body'),
				author : article.get('author')
			}
		});
	})
	.catch(function (err) {
		res.status(500)
		.json({
			error: true,
			data: {message: err.message}
		});
	});
};

/* PUT /api/article/:article_id */
function updateArticle(req, res, next){
	articleModel.Article.forge({ id : req.params.article_id})
	.fetch({ require : true })
	.then(function(article){
		article.save({
			title : req.body.title || article.get('title'),
			body : req.body.body || article.get('body'),
			author : req.body.author || article.get('author')
		})
		.then(function(){
			res.json({
				error : false,
				data : {
					title : article.get('title'),
					message : 'Article deatils update'
				}
			});
		})
		.catch(function(err){
			res.json({
				error : true,
				data : { message : err.message }
			})
		})
	})
	.catch(function(err){
		res.status(500)
		.json({
			error : true,
			data : {message : err.message}
		})
	})
};

/* DELETE /api/article/:article_id */
function deleteArticle(req, res, next){
	articleModel.Article.forge({id : req.params.article_id})
	.fetch({require : true})
	.then(function(article){
		article.save({
			deleted : 1
		})
		//article.destroy()
		.then(function(){
			res.json({
				error : false,
				data : {
					title : article.get('title'),
					message : 'Article successfully deleted'
				}
			})
		})
		.catch(function(err){
			res.status(500)
			.json({error : true, data : {message : err.message}})
		})
	})
	.catch(function(err){
		res.status(500)
		.json({error : true, data : {message : err.message}})
	})
};

module.exports = {
  getArticles,
  getArticleById,
  saveArticle,
  updateArticle,
  deleteArticle
}
