'use strict';

var Bookshelf = require('../config/bookshelf');

var Article = Bookshelf.Model.extend({
  tableName: 'article',
  hasTimestamps: true
});

var Articles = Bookshelf.Collection.extend({
	model : Article
});

module.exports = {
  Articles,
  Article
};
