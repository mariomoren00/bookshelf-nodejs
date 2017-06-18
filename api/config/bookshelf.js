var connection = require('./knexfile');
var knex = require('knex')(connection);
var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;
