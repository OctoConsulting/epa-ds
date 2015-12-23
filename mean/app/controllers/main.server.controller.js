'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	eqiRes = mongoose.model('eqiresult'),
	eqiDet = mongoose.model('eqidetail'),
	calcService = require('./calc.server.controller'),
	Q = require('q'),
	_ = require('lodash');

//This function returns array of JSON objects of County Name, State
//based on the matching RegEx pattern
exports.autoComplete = function(req, res) {
	var stateCounty = req.query.q;
	var regex = new RegExp(stateCounty, 'i');
	console.log('stateCounty is :' + stateCounty);

	eqiRes.aggregate({
		$match: {
			countyDescription: regex
		}
	}, function(err, results) {

		if (err) throw err;

		var counties = [];

		for (var countyDescription in results) {

			counties.push(results[countyDescription].countyDescription + ',' +
				results[countyDescription].stateCode);

		}

		var result = {
			results: counties
		};

		res.json(result);

	});
};

//This funciton returns aggregate results and score for a given county
exports.searchByCountyState = function(req, res) {
	var stateCounty = req.query.q;
	//split county and code
	console.log('index : ' + stateCounty.indexOf(','));
	if (stateCounty.indexOf(',') === -1) {
		console.log('inside');
		res.status(400).send({
			'error': 'Invalid Search'
		});
		return false;
	}
	var str = stateCounty.split(',');
	console.log('stateCounty is :' + stateCounty);
	var county = str[0];
	var stateCd = str[1];

	console.log('County is :' + county);
	console.log('State is :' + stateCd);
	var data = {};
	data.detail = {};
	data.detail.air = {};
	data.detail.water = {};
	data.detail.infra = {};
	data.detail.socio = {};

	// set results
	var setVarVals = function(results, minVarArray, maxVarArray, avgVarArray) {

		if (minVarArray === undefined && maxVarArray === undefined &&
			avgVarArray === undefined) return false;
		for (var i = 0; i < results.length; i++) {

			if (results[i].variableCode.toLowerCase() === 'a_no2_mean_ln' &&
				results[i].domain.toLowerCase() === 'air') {
				data.detail.air.nitro = results[i].variableValue;
				data.detail.air.nitro_perc = calcService.calculateOtherPercentage(
					minVarArray.minNitro, maxVarArray.maxNitro, results[i].variableValue
				);
				data.detail.air.nitro_avg = avgVarArray.avgNitro;
			} else if (results[i].variableCode.toLowerCase() === 'a_so2_mean_ln' &&
				results[i].domain.toLowerCase() === 'air') {
				data.detail.air.sulfur = results[i].variableValue;
				data.detail.air.sulfur_perc = calcService.calculateOtherPercentage(
					minVarArray.minSulfur, maxVarArray.maxSulfur, results[i].variableValue
				);
				data.detail.air.sulfur_avg = avgVarArray.avgSulfur;
			} else if (results[i].variableCode.toLowerCase() === 'a_co_mean_ln' &&
				results[i].domain.toLowerCase() === 'air') {
				data.detail.air.carbon = results[i].variableValue;
				data.detail.air.carbon_perc = calcService.calculateOtherPercentage(
					minVarArray.minCarbon, maxVarArray.maxCarbon, results[i].variableValue
				);
				data.detail.air.carbon_avg = avgVarArray.avgCarbon;
			} else if (results[i].variableCode.toLowerCase() === 'avgofd3_ave' &&
				results[i].domain.toLowerCase() === 'water') {
				data.detail.water.drought = results[i].variableValue;
				data.detail.water.drought_perc = calcService.calculateOtherPercentage(
					minVarArray.minDrought, maxVarArray.maxDrought, results[i].variableValue
				);
				data.detail.water.drought_avg = avgVarArray.avgDrought;
			} else if (results[i].variableCode.toLowerCase() === 'w_hg_ln' &&
				results[i].domain.toLowerCase() === 'water') {
				data.detail.water.mercury = results[i].variableValue;
				data.detail.water.mercury_perc = calcService.calculateOtherPercentage(
					minVarArray.minMercury, maxVarArray.maxMercury, results[i].variableValue
				);
				data.detail.water.mercury_avg = avgVarArray.avgMercury;
			} else if (results[i].variableCode.toLowerCase() === 'w_as_ln' &&
				results[i].domain.toLowerCase() === 'water') {
				data.detail.water.arsenic = results[i].variableValue;
				data.detail.water.arsenic_perc = calcService.calculateOtherPercentage(
					minVarArray.minArsenic, maxVarArray.maxArsenic, results[i].variableValue
				);
				data.detail.water.arsenic_avg = avgVarArray.avgArsenic;
			} else if (results[i].variableCode.toLowerCase() === 'hwyprop' &&
				results[i].domain.toLowerCase() === 'built') {
				data.detail.infra.highway = results[i].variableValue;
				data.detail.infra.highway_perc = calcService.calculateOtherPercentage(
					minVarArray.minHighway, maxVarArray.maxHighway, results[i].variableValue
				);
				data.detail.infra.highway_avg = avgVarArray.avgHighway;
			} else if (results[i].variableCode.toLowerCase() === 'ryprop' &&
				results[i].domain.toLowerCase() === 'built') {
				data.detail.infra.streets = results[i].variableValue;
				data.detail.infra.streets_perc = calcService.calculateOtherPercentage(
					minVarArray.minStreets, maxVarArray.maxStreets, results[i].variableValue
				);
				data.detail.infra.streets_avg = avgVarArray.avgStreets;
			} else if (results[i].variableCode.toLowerCase() === 'fatal_rate_log' &&
				results[i].domain.toLowerCase() === 'built') {
				data.detail.infra.fatalities = results[i].variableValue;
				data.detail.infra.fatalities_perc = calcService.calculateOtherPercentage(
					minVarArray.minFatalities, maxVarArray.maxFatalities, results[i].variableValue
				);
				data.detail.infra.fatalities_avg = avgVarArray.avgFatalities;
			} else if (results[i].variableCode.toLowerCase() === 'med_hh_inc' &&
				results[i].domain.toLowerCase() === 'sociodemographic') {
				data.detail.socio.income = results[i].variableValue;
				data.detail.socio.income_perc = calcService.calculateOtherPercentage(
					minVarArray.minIncome, maxVarArray.maxIncome, results[i].variableValue
				);
				data.detail.socio.income_avg = avgVarArray.avgIncome;
			} else if (results[i].variableCode.toLowerCase() === 'pct_unemp' &&
				results[i].domain.toLowerCase() === 'sociodemographic') {
				data.detail.socio.unemployed = results[i].variableValue;
				data.detail.socio.unemployed_perc = calcService.calculateUnemploymentPercentage(
					minVarArray.minUnemployed, maxVarArray.maxUnemployed, results[i].variableValue
				);
				data.detail.socio.unemployed_avg = avgVarArray.avgUnemployed;
			} else if (results[i].variableCode.toLowerCase() === 'violent_rate_log' &&
				results[i].domain.toLowerCase() === 'sociodemographic') {
				data.detail.socio.crimes = results[i].variableValue;
				data.detail.socio.crimes_perc = calcService.calculateOtherPercentage(
					minVarArray.minCrime, maxVarArray.maxCrime, results[i].variableValue
				);
				data.detail.socio.crimes_avg = avgVarArray.avgCrime;
			}

		}
	};

	var setEqiVals = function(results, minEqiArray, maxEqiArray, avgEqiArray) {

		if (minEqiArray === undefined && maxEqiArray === undefined &&
			avgEqiArray === undefined) return
		false;

		for (var i = 0; i < results.length; i++) {
			var percent = 0;
			var rate;
			if (results[i].domain.toLowerCase() === 'overall') {
				data.overall_result = results[i].eqi;
				percent = calcService.calculateEqiPercentage(minEqiArray.minOverall,
					maxEqiArray.maxOverall, results[i].eqi, true);
				data.overall_result_perc = percent;
				data.overall_result_rate = calcService.rating(percent);
				data.overall_result_avg = avgEqiArray.avgOverall;

			} else if (results[i].domain.toLowerCase() === 'air') {

				data.detail.air.overall = results[i].eqi;
				percent = calcService.calculateEqiPercentage(minEqiArray.minAir,
					maxEqiArray.maxAir, results[i].eqi, true);
				data.detail.air.overall_perc = percent;
				data.detail.air.overall_rate = calcService.rating(percent);
				data.detail.air.overall_avg = avgEqiArray.avgAir;

			} else if (results[i].domain.toLowerCase() === 'water') {

				data.detail.water.overall = results[i].eqi;
				percent = calcService.calculateEqiPercentage(minEqiArray.minWater,
					maxEqiArray.maxWater, results[i].eqi, true);
				data.detail.water.overall_perc = percent;
				data.detail.water.overall_rate = calcService.rating(percent);
				data.detail.water.overall_avg = avgEqiArray.avgWater;
			} else if (results[i].domain.toLowerCase() === 'built') {

				data.detail.infra.overall = results[i].eqi;
				percent = calcService.calculateEqiPercentage(minEqiArray.minBuilt,
					maxEqiArray.maxBuilt, results[i].eqi, true);
				data.detail.infra.overall_perc = percent;
				data.detail.infra.overall_rate = calcService.rating(percent);
				data.detail.infra.overall_avg = avgEqiArray.avgBuilt;

			} else if (results[i].domain.toLowerCase() === 'sociodemographic') {

				data.detail.socio.overall = results[i].eqi;
				percent = calcService.calculateEqiPercentage(minEqiArray.minSocio,
					maxEqiArray.maxSocio, results[i].eqi, true);
				data.detail.socio.overall_perc = percent;
				data.detail.socio.overall_rate = calcService.rating(percent);
				data.detail.socio.overall_avg = avgEqiArray.avgSocio;
			}

		}
		//console.log( data);

	};

	eqiDet.find({
		countyDescription: county,
		stateCode: stateCd
	}, function(err, results) {
		//console.log('Results detail '+results);
		// if there is an error retrieving, send the error. nothing after res.send(err) will execute
		if (err)
			res.send(err);
		if (results.length === 0) {
			res.status(400).send({
				'error': 'No Results in Details'
			});
			return false;
		}

		var minVarArray = req.app.locals.minVarArray;
		var maxVarArray = req.app.locals.maxVarArray;
		var avgVarArray = req.app.locals.avgVarArray;

		setVarVals(results, minVarArray, maxVarArray, avgVarArray);

		eqiRes.find({
				countyDescription: county,
				stateCode: stateCd
			}, function(err, results) {
				//console.log('Results result '+results);
				// if there is an error retrieving, send the error. nothing after res.send(err) will execute
				if (err)
					res.send(err);

				if (results.length === 0) {
					res.status(400).send({
						'error': 'No Results in Results'
					});
					return false;
				}

				var minEqiArray = req.app.locals.minEqiArray;
				var maxEqiArray = req.app.locals.maxEqiArray;
				var avgEqiArray = req.app.locals.avgEqiArray;

				// set results
				data.county_name = results[0].countyDescription;
				data.state = results[0].stateCode;
				data.stfips = results[0].countyCode;
				setEqiVals(results, minEqiArray, maxEqiArray, avgEqiArray);

				console.log('County ' + results[0].countyDescription);
		    res.json(data);

			});

	});

};
