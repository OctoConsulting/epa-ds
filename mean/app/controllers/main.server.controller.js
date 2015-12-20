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

            counties.push(results[countyDescription].countyDescription + ',' + results[countyDescription].stateCode);

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

        var minVarArray, maxVarArray;

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


        setMinVariables()
            .then(function(success) {
                minVarArray = success;
                setVarVals();
            });

        setMaxVariables()
            .then(function(success) {
                maxVarArray = success;
                setVarVals();
            });


        // set results
        var setVarVals = function() {

            if (minVarArray === undefined && maxVarArray === undefined) return false;
            for (var i = 0; i < results.length; i++) {

                if (results[i].variableCode.toLowerCase() === 'a_no2_mean_ln' && results[i].domain.toLowerCase() === 'air') {
                    data.detail.air.nitro = results[i].variableValue;
                    data.detail.air.nitro_perc = calcService.calculateOtherPercentage(minVarArray.minNitro, maxVarArray.maxNitro, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() === 'a_so2_mean_ln' && results[i].domain.toLowerCase() === 'air') {
                    data.detail.air.sulfur = results[i].variableValue;
                    data.detail.air.sulfur_perc = calcService.calculateOtherPercentage(minVarArray.minSulfur, maxVarArray.maxSulfur, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() === 'a_co_mean_ln' && results[i].domain.toLowerCase() === 'air') {
                    data.detail.air.carbon = results[i].variableValue;
                    data.detail.air.carbon_perc = calcService.calculateOtherPercentage(minVarArray.minCarbon, maxVarArray.maxCarbon, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() === 'avgofd3_ave' && results[i].domain.toLowerCase() === 'water') {
                    data.detail.water.drought = results[i].variableValue;
                    data.detail.water.drought_perc = calcService.calculateOtherPercentage(minVarArray.minDrought, maxVarArray.maxDrought, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() === 'w_hg_ln' && results[i].domain.toLowerCase() === 'water') {
                    data.detail.water.mercury = results[i].variableValue;
                    data.detail.water.mercury_perc = calcService.calculateOtherPercentage(minVarArray.minMercury, maxVarArray.maxMercury, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() === 'w_as_ln' && results[i].domain.toLowerCase() === 'water') {
                    data.detail.water.arsenic = results[i].variableValue;
                    data.detail.water.arsenic_perc = calcService.calculateOtherPercentage(minVarArray.minArsenic, maxVarArray.maxArsenic, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() === 'hwyprop' && results[i].domain.toLowerCase() === 'built') {
                    data.detail.infra.highway = results[i].variableValue;
                    data.detail.infra.highway_perc = calcService.calculateOtherPercentage(minVarArray.minHighway, maxVarArray.maxHighway, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() === 'ryprop' && results[i].domain.toLowerCase() === 'built') {
                    data.detail.infra.streets = results[i].variableValue;
                    data.detail.infra.streets_perc = calcService.calculateOtherPercentage(minVarArray.minStreets, maxVarArray.maxStreets, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() === 'fatal_rate_log' && results[i].domain.toLowerCase() === 'built') {
                    data.detail.infra.fatalities = results[i].variableValue;
                    data.detail.infra.fatalities_perc = calcService.calculateOtherPercentage(minVarArray.minFatalities, maxVarArray.maxFatalities, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() === 'med_hh_inc' && results[i].domain.toLowerCase() === 'sociodemographic') {
                    data.detail.socio.income = results[i].variableValue;
                    data.detail.socio.income_perc = calcService.calculateOtherPercentage(minVarArray.minIncome, maxVarArray.maxIncome, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() === 'pct_unemp' && results[i].domain.toLowerCase() === 'sociodemographic') {
                    data.detail.socio.unemployed = results[i].variableValue;
                    data.detail.socio.unemployed_perc = calcService.calculateUnemploymentPercentage(minVarArray.minUnemployed, maxVarArray.maxUnemployed, results[i].variableValue);
                } else if (results[i].variableCode.toLowerCase() === 'violent_rate_log' && results[i].domain.toLowerCase() === 'sociodemographic') {
                    data.detail.socio.crimes = results[i].variableValue;
                    data.detail.socio.crimes_perc = calcService.calculateOtherPercentage(minVarArray.minCrime, maxVarArray.maxCrime, results[i].variableValue);
                }

            }


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

                var minEqiArray, maxEqiArray;

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


                setMinEqis()
                    .then(function(success) {
                        minEqiArray = success;
                        setEqiVals();
                    });

                setMaxEqis()
                    .then(function(success) {
                        maxEqiArray = success;
                        setEqiVals();
                    });



                // set results
                data.county_name = results[0].countyDescription;
                data.state = results[0].stateCode;
                data.stfips = results[0].countyCode;

                console.log('County ' + results[0].countyDescription);

                var setEqiVals = function() {

                    if (minEqiArray === undefined && maxEqiArray === undefined) return false;

                    for (var i = 0; i < results.length; i++) {
                        var percent = 0;
                        var rate;
                        if (results[i].domain.toLowerCase() === 'overall') {
                            data.overall_result = results[i].eqi;
                            percent = calcService.calculateEqiPercentage(minEqiArray.minOverall, maxEqiArray.maxOverall, results[i].eqi, true);
                            data.overall_result_perc = percent;
                            data.overall_result_rate = calcService.rating(percent);

                        } else if (results[i].domain.toLowerCase() === 'air') {

                            data.detail.air.overall = results[i].eqi;
                            percent = calcService.calculateEqiPercentage(minEqiArray.minAir, maxEqiArray.maxAir, results[i].eqi, true);
                            data.detail.air.overall_perc = percent;
                            data.detail.air.overall_rate = calcService.rating(percent);

                        } else if (results[i].domain.toLowerCase() === 'water') {

                            data.detail.water.overall = results[i].eqi;
                            percent = calcService.calculateEqiPercentage(minEqiArray.minWater, maxEqiArray.maxWater, results[i].eqi, true);
                            data.detail.water.overall_perc = percent;
                            data.detail.water.overall_rate = calcService.rating(percent);

                        } else if (results[i].domain.toLowerCase() === 'built') {

                            data.detail.infra.overall = results[i].eqi;
                            percent = calcService.calculateEqiPercentage(minEqiArray.minBuilt, maxEqiArray.maxBuilt, results[i].eqi, true);
                            data.detail.infra.overall_perc = percent;
                            data.detail.infra.overall_rate = calcService.rating(percent);

                        } else if (results[i].domain.toLowerCase() === 'sociodemographic') {

                            data.detail.socio.overall = results[i].eqi;
                            percent = calcService.calculateEqiPercentage(minEqiArray.minSocio, maxEqiArray.maxSocio, results[i].eqi, true);
                            data.detail.socio.overall_perc = percent;
                            data.detail.socio.overall_rate = calcService.rating(percent);
                        }

                    }
                    //console.log( data);
                    res.json(data);


                };


            });


        };



    });



};

/**
 * Create a article
/*
exports.create = function(req, res) {
	var article = new Article(req.body);
	article.user = req.user;

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};*/

/**
 * Show the current article
 */
/*exports.read = function(req, res) {
	res.json(req.article);
};*/

/**
 * Update a article
 */
/*exports.update = function(req, res) {
	var article = req.article;

	article = _.extend(article, req.body);

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};*/

/**
 * Delete an article
 */
/*exports.delete = function(req, res) {
	var article = req.article;

	article.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};*/

/**
 * List of Articles
 */
/*exports.list = function(req, res) {
	Article.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(articles);
		}
	});
};*/

/**
 * Article middleware
 */
/*exports.articleByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Article is invalid'
		});
	}

	Article.findById(id).populate('user', 'displayName').exec(function(err, article) {
		if (err) return next(err);
		if (!article) {
			return res.status(404).send({
				message: 'Article not found'
			});
		}
		req.article = article;
		next();
	});
};*/

/**
 * Article authorization middleware
 */
/*exports.hasAuthorization = function(req, res, next) {
	if (req.article.user.id !=== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}
	next();
};*/
