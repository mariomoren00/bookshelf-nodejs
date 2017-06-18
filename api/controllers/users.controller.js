'use strict';

var userModel = require('../models/user.model');


function getUsers(req, res, next){
	userModel.Users.forge()
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
}

function getUserById(req, res, next){
	userModel.User.forge({
		id : req.params.id
	})
	.query('where', 'deleted', '=', '0')
	.fetch()
	.then(function(user){
		if(!user){
			res.status(404)
			.json({
				error : true,
				data : {}
			})
		}else{
			res.json({
				error : false,
				data : user.toJSON()
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
}

function saveUser(req, res, next){
	userModel.User.forge({
		name : req.body.name,
		email : req.body.email,
		password : req.body.password
	})
	.save()
	.then(function(user){
		res.json({
			error: false,
			data: {
				id : user.get('id'),
				name : user.get('name')
			},
			message : 'User successfully created'
		});
	})
	.catch(function (err) {
		res.status(500)
		.json({
			error: true,
			data: {message: err.message}
		});
	});
}

function updateUser(req, res, next){
	userModel.User.forge({ id : req.params.id })
	.fetch({ require : true })
	.then(function(user){
		user.save({
			name : req.body.name || user.get('name'),
			email : req.body.name || user.get('name')
		})
		.then(function(){
			res.json({
				error : false,
				data : { 
					id : user.get('id'),
					name : user.get('name')
				},
				message : 'User successfully updated'
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
}

function deleteUser(req, res, next){
	userModel.User.forge({id : req.params.id})
	.fetch({require : true})
	.then(function(user){
		user.destroy()
		.then(function(){
			res.json({
				error : false,
				data : {
					id : user.get('id'),
					name : user.get('name')
				},
				message : 'User successfully deleted'
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
}



module.exports = {
  getUsers,
  getUserById,
  saveUser,
  updateUser,
  deleteUser
}