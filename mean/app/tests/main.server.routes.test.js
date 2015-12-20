'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	agent = request.agent(app);


/**
 * County routes tests
 */
describe('County Search Test', function() {
	/*beforeEach(function(done) {
			done();
	});*/


	
	it('should be able to search country and return results for each domain and overall', function(done) {
		agent.get('/inflo/api/search?q=Fairfax County,VA')
			.end(function(req, res) {
				// Call the assertion callback
				//res.body.should.be.an.Array.with.lengthOf(5);
				var result = res.body;				
				result.state.should.match('VA');
				//result.should.have.property('overall_result_perc');
				result.overall_result_perc.should.be.within(0,100);
				result.overall_result_rate.should.match('Good');

				result.should.containDeep({detail:{air:{nitro:7.950482}}});
				result.should.containDeep({detail:{water:{drought:1.616873}}});
				result.should.containDeep({detail:{infra:{highway:0.0483773}}});
				result.should.containDeep({detail:{socio:{income:81050}}});
				
				//result.should.containDeep({detail:{air:{overall_perc:}}});
				result.detail.air.overall_perc.should.be.within(0,100);
				result.detail.water.overall_perc.should.be.within(0,100);
				result.detail.infra.overall_perc.should.be.within(0,100);
				result.detail.socio.overall_perc.should.be.within(0,100);
				
				result.detail.socio.overall_rate.should.match('Good');
				
				result.detail.air.nitro_perc.should.be.within(0,100);
				result.detail.water.drought_perc.should.be.within(0,100);
				result.detail.infra.highway_perc.should.be.within(0,100);
				result.detail.socio.income_perc.should.be.within(0,100);				
			
				done();
			});
	});

	it('should return list of counties', function(done) {
		agent.get('/inflo/api/autoComplete?q=Fair')
			.end(function(req, res) {
				// Call the assertion callback
				var results = res.body.results;
				results.should.be.an.instanceOf(Array);
				//results.should.not.be.empty;
				

				done();
			});
	});	

	/*afterEach(function(done) {
		done();
	});*/
});