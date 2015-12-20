'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	agent = request.agent(app);



/**
 * Census routes tests
 */
describe('Sensus Test', function() {
	/*beforeEach(function(done) {
			done();
	});*/

	
	it('should return housing info', function(done) {

		agent.get('/inflo/api/getHousingInfo?q=01003')
			.end(function(req, res) {
				// Call the assertion callback
				var results = res.body;

				//results.should.have.property('total');
				//results.total.should.match(104061);

				done();
			});
	});	

	it('should return population info', function(done) {

		agent.get('/inflo/api/getPopulationInfo?q=01003')
			.end(function(req, res) {
				// Call the assertion callback
				var results = res.body;
          		//results.total.should.match(104061);

				done();
			});
	});		



	/*afterEach(function(done) {
		done();
	});*/
});