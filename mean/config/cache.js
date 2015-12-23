'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	eqiDetail = require('../app/models/eqidetail.server.model'),
	eqiResult = require('../app/models/eqiresult.server.model'),
	eqiRes = mongoose.model('eqiresult'),
	eqiDet = mongoose.model('eqidetail'),
	calcService = require('../app/controllers/calc.server.controller'),
	Q = require('q'),
	async = require('async'),
	_ = require('lodash');

module.exports = function(app) {

	var setMinVariables = function() {
		var deferred = Q.defer();
		calcService.minimumVariables(deferred);
		return deferred.promise;
	};

	var setMaxVariables = function() {
		var deferred = Q.defer();
		calcService.maximumVariables(deferred);
		return deferred.promise;
	};

	var setAvgVariables = function() {
		var deferred = Q.defer();
		calcService.averageVariables(deferred);
		return deferred.promise;
	};

	setMinVariables()
		.then(function(success) {
			app.locals.minVarArray = success;
		});

		setMaxVariables()
			.then(function(success) {
				app.locals.maxVarArray = success;
		});

		setAvgVariables()
			.then(function(success) {
				app.locals.avgVarArray = success;
			});


	var setMinEqis = function() {
		var deferred = Q.defer();
		calcService.minimumEqi(deferred);
		return deferred.promise;
	};

	var setMaxEqis = function() {
		var deferred = Q.defer();
		calcService.maximumEqi(deferred);
		return deferred.promise;
	};

	var setAvgEqis = function() {
		var deferred = Q.defer();
		calcService.averageEqi(deferred);
		return deferred.promise;
	};

	var setTopFives = function(minValArray, maxValArray) {
		var deferred = Q.defer();
		calcService.topFiveListings(minValArray, maxValArray, deferred);
		return deferred.promise;
	};


	  async.series([
			function(callback) {
				console.log('Calling setMinEqis:  ');
				setMinEqis()
					.then(function(success) {
						app.locals.minEqiArray = success;
						callback(null);
					});
			},
			function(callback) {
				console.log('Calling setMaxEqis :  ');
				setMaxEqis()
					.then(function(success) {
						app.locals.maxEqiArray = success;
						callback(null);
					});
			},
			function(callback) {
				setAvgEqis()
					.then(function(success) {
						app.locals.avgEqiArray = success;
						callback(null);
					});
			},
			function(callback) {
				console.log('Calling Top Five with:  ' + app.locals.minEqiArray);
				setTopFives(app.locals.minEqiArray, app.locals.maxEqiArray)
					.then(function(success) {
						app.locals.topFives = success;
						console.log('app values : ' + app.locals.topFives);
						callback(null);
					});
			},
		]);
};
