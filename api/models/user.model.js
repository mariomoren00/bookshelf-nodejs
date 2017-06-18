'use strict';

var Bookshelf = require('../config/bookshelf');

var User = Bookshelf.Model.extend({
  tableName: 'user',
  hasTimestamps: true
});

var Users = Bookshelf.Collection.extend({
	model : User
});

module.exports = {
  Users,
  User
};
