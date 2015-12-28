'use strict';

/**
 * Module dependencies.
 */
var main = require('../../app/controllers/main.server.controller');

module.exports = function(app) {
console.log('In autocomplete');
	app.route('/api/autoComplete')
		.get(main.autoComplete);

	app.route('/api/search')
		.get(main.searchByCountyState);

	app.route('/api/topFives')
	  .get(main.topFives);

};
