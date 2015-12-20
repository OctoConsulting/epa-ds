'use strict';

/**
 * Module dependencies.
 */
var census = require('../../app/controllers/census.server.controller');

module.exports = function(app) {

	app.route('/inflo/api/getHousingInfo')
		.get(census.getHousingInfo);				

	app.route('/inflo/api/getPopulationInfo')
		.get(census.getPopulationInfo);	

};
