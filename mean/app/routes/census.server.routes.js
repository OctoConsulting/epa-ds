'use strict';

/**
 * Module dependencies.
 */
var census = require('../../app/controllers/census.server.controller');

module.exports = function(app) {

	app.route('/api/getHousingInfo')
		.get(census.getHousingInfo); 

	app.route('/api/getPopulationInfo')
		.get(census.getPopulationInfo);

};
