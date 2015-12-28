'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  async = require('async'),
	errorHandler = require('./errors.server.controller'),
	eqiRes = mongoose.model('eqiresult'),
	eqiDet = mongoose.model('eqidetail');

var pctFn = exports.calculateEqiPercentage = function(minVal, maxVal, value, isPositive) {

	var step = 0.1;
	var position = (value + step - minVal) / step;
	var numberOfVal = ((maxVal - minVal) / step) + 1;
	if (!isPositive)
		return (1 - position / numberOfVal) * 100;
	else
		return position / numberOfVal * 100;

};

exports.calculateOtherPercentage = function(minVal, maxVal, value) {

	if (value >= 0)
		return (value / maxVal) * 100;
	else
		return (value / minVal) * 100;

};

exports.calculateUnemploymentPercentage = function(minVal, maxVal, value) {

	if (value >= 0)
		return 100 - ((value / maxVal) * 100);
	else
		return 100 - ((value / minVal) * 100);

};

exports.minimumValue = function(array) {

	return Math.min.apply(null, array);

};

exports.maximumValue = function(array) {

	return Math.max.apply(null, array);

};

exports.rating = function(percent) {

	if (percent > 0 && percent <= 40) {
		return 'Poor';
	} else if (percent > 40 && percent <= 80) {
		return 'Average';
	} else if (percent > 80) {
		return 'Good';
	}

};

exports.minimumVariables = function(deferred) {
	var varArray = {};
	eqiDet.aggregate([
		// { $match: {
		//     variableCode: 'a_no2_mean_ln'
		// }},

		{
			$group: {
				_id: '$variableCode',
				minVar: {
					$min: '$variableValue'
				}
			}
		}
	], function(err, results) {
		if (err) {
			console.log(err);
			return;
		}
		//console.log(results);

		for (var item in results) {
			//console.log('id:'+results[item]._id + ':: val:'+results[item].minVar);
			if (results[item]._id === 'a_no2_mean_ln')
				varArray.minNitro = results[item].minVar;
			else if (results[item]._id === 'a_so2_mean_ln')
				varArray.minSulfur = results[item].minVar;
			else if (results[item]._id === 'a_co_mean_ln')
				varArray.minCarbon = results[item].minVar;
			else if (results[item]._id === 'avgofd3_ave')
				varArray.minDrought = results[item].minVar;
			else if (results[item]._id === 'w_hg_ln')
				varArray.minMercury = results[item].minVar;
			else if (results[item]._id === 'w_as_ln')
				varArray.minArsenic = results[item].minVar;
			else if (results[item]._id === 'hwyprop')
				varArray.minHighway = results[item].minVar;
			else if (results[item]._id === 'ryprop')
				varArray.minStreets = results[item].minVar;
			else if (results[item]._id === 'fatal_rate_log')
				varArray.minFatalities = results[item].minVar;
			else if (results[item]._id === 'med_hh_inc')
				varArray.minIncome = results[item].minVar;
			else if (results[item]._id === 'pct_unemp')
				varArray.minUnemployed = results[item].minVar;
			else if (results[item]._id === 'violent_rate_log')
				varArray.minCrime = results[item].minVar;
		}
		console.log(varArray);
		deferred.resolve(varArray);

	});


};

exports.maximumVariables = function(deferred) {

	var varArray = {};
	eqiDet.aggregate([
		// { $match: {
		//     variableCode: 'a_no2_mean_ln'
		// }},

		{
			$group: {
				_id: '$variableCode',
				maxVar: {
					$max: '$variableValue'
				}
			}
		}
	], function(err, results) {
		if (err) {
			console.log(err);
			return;
		}
		// console.log(results);
		for (var item in results) {
			//console.log('id:'+results[item]._id + ':: val:'+results[item].maxVar);
			if (results[item]._id === 'a_no2_mean_ln')
				varArray.maxNitro = results[item].maxVar;
			else if (results[item]._id === 'a_so2_mean_ln')
				varArray.maxSulfur = results[item].maxVar;
			else if (results[item]._id === 'a_co_mean_ln')
				varArray.maxCarbon = results[item].maxVar;
			else if (results[item]._id === 'avgofd3_ave')
				varArray.maxDrought = results[item].maxVar;
			else if (results[item]._id === 'w_hg_ln')
				varArray.maxMercury = results[item].maxVar;
			else if (results[item]._id === 'w_as_ln')
				varArray.maxArsenic = results[item].maxVar;
			else if (results[item]._id === 'hwyprop')
				varArray.maxHighway = results[item].maxVar;
			else if (results[item]._id === 'ryprop')
				varArray.maxStreets = results[item].maxVar;
			else if (results[item]._id === 'fatal_rate_log')
				varArray.maxFatalities = results[item].maxVar;
			else if (results[item]._id === 'med_hh_inc')
				varArray.maxIncome = results[item].maxVar;
			else if (results[item]._id === 'pct_unemp')
				varArray.maxUnemployed = results[item].maxVar;
			else if (results[item]._id === 'violent_rate_log')
				varArray.maxCrime = results[item].maxVar;
		}
		console.log(varArray);
		deferred.resolve(varArray);

	});

};


exports.minimumEqi = function(deferred) {
	var varArray = {};
	eqiRes.aggregate([{
		$group: {
			_id: '$domain',
			minVar: {
				$min: '$eqi'
			}
		}
	}], function(err, results) {
		if (err) {
			console.log(err);
			return;
		}
		//console.log(results);

		for (var item in results) {
			//console.log('id:'+results[item]._id + ':: val:'+results[item].minVar);
			if (results[item]._id === 'Air')
				varArray.minAir = results[item].minVar;
			else if (results[item]._id === 'Water')
				varArray.minWater = results[item].minVar;
			else if (results[item]._id === 'Built')
				varArray.minBuilt = results[item].minVar;
			else if (results[item]._id === 'Sociodemographic')
				varArray.minSocio = results[item].minVar;
			else if (results[item]._id === 'Overall')
				varArray.minOverall = results[item].minVar;
		}
		console.log(varArray);
		deferred.resolve(varArray);

	});


};

exports.maximumEqi = function(deferred) {

	var varArray = {};
	eqiRes.aggregate([{
		$group: {
			_id: '$domain',
			maxVar: {
				$max: '$eqi'
			}
		}
	}], function(err, results) {
		if (err) {
			console.log(err);
			return;
		}
		// console.log(results);
		for (var item in results) {
			//console.log('id:'+results[item]._id + ':: val:'+results[item].maxVar);
			if (results[item]._id === 'Air')
				varArray.maxAir = results[item].maxVar;
			else if (results[item]._id === 'Water')
				varArray.maxWater = results[item].maxVar;
			else if (results[item]._id === 'Built')
				varArray.maxBuilt = results[item].maxVar;
			else if (results[item]._id === 'Sociodemographic')
				varArray.maxSocio = results[item].maxVar;
			else if (results[item]._id === 'Overall')
				varArray.maxOverall = results[item].maxVar;
		}
		console.log(varArray);
		deferred.resolve(varArray);

	});

};

exports.averageEqi = function(deferred) {

	var varArray = {};
	eqiRes.aggregate([{
		$group: {
			_id: '$domain',
			avgVar: {
				$avg: '$eqi'
			}
		}
	}], function(err, results) {
		if (err) {
			console.log(err);
			return;
		}
		// console.log(results);
		for (var item in results) {
			//console.log('id:'+results[item]._id + ':: val:'+results[item].maxVar);
			if (results[item]._id === 'Air')
				varArray.avgAir = results[item].avgVar;
			else if (results[item]._id === 'Water')
				varArray.avgWater = results[item].avgVar;
			else if (results[item]._id === 'Built')
				varArray.avgBuilt = results[item].avgVar;
			else if (results[item]._id === 'Sociodemographic')
				varArray.avgSocio = results[item].avgVar;
			else if (results[item]._id === 'Overall')
				varArray.avgOverall = results[item].avgVar;
		}
		console.log(varArray);
		deferred.resolve(varArray);

	});

};

 var topFiveEqiByCategory = function(domainArg, minEqiArray, maxEqiArray, callback) {
	var domainObj = {};
//	domainObj.domain = domainArg;

	var topFive = [];

	eqiRes.find({"domain":domainArg}).sort({"eqi":-1}).limit(5).exec(function(err, results) {
		if (err) {
			console.log(err);
			return;
		}
		// console.log(results);
		for (var item in results) {
			var detailObj = {};
			detailObj.stateCode = results[item].stateCode;
			detailObj.countyCode = results[item].countyCode;
			detailObj.countyDescription = results[item].countyDescription;
			detailObj.eqi = results[item].eqi;

			var minVal, maxVal;
      if(domainArg === 'Air') {
				minVal = minEqiArray.minAir;
				maxVal = maxEqiArray.maxAir;
			}
			else if (domainArg === 'Water') {
				minVal = minEqiArray.minWater;
				maxVal = maxEqiArray.maxWater;
			}
			else if (domainArg === 'Built'){
				minVal = minEqiArray.minBuilt;
				maxVal = maxEqiArray.maxBuilt;
			}
			else if (domainArg === 'Sociodemographic'){
				minVal = minEqiArray.minSocio;
				maxVal = maxEqiArray.maxSocio;
			}
			else if (domainArg === 'Overall'){
				minVal = minEqiArray.minOverall;
				maxVal = maxEqiArray.maxOverall;
			}
			detailObj.overall_perc = pctFn(minVal, maxVal, detailObj.eqi, true);
			topFive.push(detailObj);
		}
		domainObj[domainArg] = topFive;
    console.log('domainObj : ' + JSON.stringify(domainObj));
		callback(null,domainObj);
	});

};

exports.topFiveListings = function(minEqiArray, maxEqiArray, deferred) {
	async.series([
		function (callback) {
    	var resultObj = topFiveEqiByCategory('Air',minEqiArray, maxEqiArray, callback);
		},
		function (callback) {
			var resultObj = topFiveEqiByCategory('Water',minEqiArray, maxEqiArray, callback);
		},
		function (callback) {
			var resultObj = topFiveEqiByCategory('Built',minEqiArray, maxEqiArray, callback);
		},
		function (callback) {
			var resultObj = topFiveEqiByCategory('Sociodemographic',minEqiArray, maxEqiArray, callback);
		}
	], function(err, results) {
		 console.log('RESULTS : ' + results);
		 deferred.resolve(results);
	});
};



exports.averageVariables = function(deferred) {
	var varArray = {};
	eqiDet.aggregate([
		// { $match: {
		//     variableCode: 'a_no2_mean_ln'
		// }},

		{
			$group: {
				_id: '$variableCode',
				avgVar: {
					$avg: '$variableValue'
				}
			}
		}
	], function(err, results) {
		if (err) {
			console.log(err);
			return;
		}
		//console.log(results);

		for (var item in results) {
			//console.log('id:'+results[item]._id + ':: val:'+results[item].minVar);
			if (results[item]._id === 'a_no2_mean_ln')
				varArray.avgNitro = results[item].avgVar;
			else if (results[item]._id === 'a_so2_mean_ln')
				varArray.avgSulfur = results[item].avgVar;
			else if (results[item]._id === 'a_co_mean_ln')
				varArray.avgCarbon = results[item].avgVar;
			else if (results[item]._id === 'avgofd3_ave')
				varArray.avgDrought = results[item].avgVar;
			else if (results[item]._id === 'w_hg_ln')
				varArray.avgMercury = results[item].avgVar;
			else if (results[item]._id === 'w_as_ln')
				varArray.avgArsenic = results[item].avgVar;
			else if (results[item]._id === 'hwyprop')
				varArray.avgHighway = results[item].avgVar;
			else if (results[item]._id === 'ryprop')
				varArray.avgStreets = results[item].avgVar;
			else if (results[item]._id === 'fatal_rate_log')
				varArray.avgFatalities = results[item].avgVar;
			else if (results[item]._id === 'med_hh_inc')
				varArray.avgIncome = results[item].avgVar;
			else if (results[item]._id === 'pct_unemp')
				varArray.avgUnemployed = results[item].avgVar;
			else if (results[item]._id === 'violent_rate_log')
				varArray.avgCrime = results[item].avgVar;
		}
		console.log(varArray);
		deferred.resolve(varArray);

	});


};
