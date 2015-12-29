'use strict';

/**
 * Module dependencies.
 */
var Client = require('node-rest-client').Client;
var request = require('request');

//Proxy API to Ruby Housing Info API
exports.getHousingInfo = function(req, res) {
    var client = new Client();
    var fips = req.query.q;
    
    if(fips.length == 4){
      fips = "0" + fips;
    }

    var state = fips.substring(0,2);
    var county = fips.substring(2,fips.length);
    console.log("State code is: " + state);
    console.log("County code is " + county);
    console.log('Calling sensus getHousingInfo');

     request('http://api.census.gov/data/2010/sf1?get=H0030001,H0030002,H0030003,H0040001,H0040002,H0040003,H0040004&for=county:'+county+'&in=state:'+state+'&key=a81b69c2d8637be2124661c1dfdddf4f7dd03adf', function(error, response, body){
          
          if(error){
            return console.log("Error",error);
          }

          if(response.statusCode !== 200){
            return console.log('Invalid Status Code Returned:', response.statusCode);
          }
          else{
            console.log("Response " + response);
            var result = eval(response.body);
            console.log("Result " + result);
            var output = {};
            output.total = parseFloat(result[1][0]);
            output.vacancy = {};
            output.vacancy.number = parseFloat(result[1][2]);
            output.vacancy.percent = ((parseFloat(result[1][2])/parseFloat(result[1][0])*100).toFixed(2));
            output.occupancy = {};
            output.occupancy.number = parseFloat(result[1][1]);
            output.occupancy.percent = ((parseFloat(result[1][1])/parseFloat(result[1][0])*100).toFixed(2));
            output.rentalOccupancy = {};
            output.rentalOccupancy.number = parseFloat(result[1][6]);
            output.rentalOccupancy.percent = ((parseFloat(result[1][6])/parseFloat(result[1][0])*100).toFixed(2));
            output.ownerOccupancy = {};
            output.ownerOccupancy.number = parseFloat(result[1][4])+parseFloat(result[1][5]);
            output.ownerOccupancy.percent = (((parseFloat(result[1][4])+parseFloat(result[1][5]))/parseFloat(result[1][0])*100).toFixed(2)); 
            console.log(JSON.stringify(output));
            res.send(output);
          }
              
           // if(err) {
          //      console.log('Error occured in getHousingInfo');
        //        res.send('Error Occured');
        //    } else {
                //var results= data;
                //console.log(results);                                                
                //res.send(results);
         //   }


           
        }); 

    //Client.on('error', function(err1) {
    //    console.log('Error occured in getHousingInfo');
   // });

    

};

//Proxy API to Ruby Population Info API
exports.getPopulationInfo = function(req, res) {

    var client = new Client();
    var fips = req.query.q;

    var state = fips.substring(0,2);
    var county = fips.substring(2,fips.length);
    console.log("State code is: " + state);
    console.log("County code is " + county);

    request('http://api.census.gov/data/2010/sf1?get=P0010001,P0120002,P0030002,P0030003,P0030005,P0030004,P0030006,P0030008,P0030007&for=county:'+county+'&in=state:'+state+'&key=a81b69c2d8637be2124661c1dfdddf4f7dd03adf',function(error,response,body){
            //if(err) {
            //    console.log('Error occured in getHousingInfo');
           //     res.send('Error Occured');
           // }                    
          // else {
                //var results= data;
                //console.log(results);                                                
                //res.send(results);
          //  }
          if(error){
              return console.log("Error",error);
            }
            if(response.statusCode !== 200){
               return console.log('Invalid Status Code Returned:', response.statusCode);
            }
            else{
              console.log("Response1 " + response);
              var result = eval(response.body);
              console.log("Result1 " + result);
              console.log();
              var output = {};
              output.race = {};
              output.race.white = {};
              output.race.white.number = parseFloat(result[1][2]);
              output.race.white.percent = (parseFloat(result[1][2])/parseFloat(result[1][0])*100).toFixed(2);
              output.race.black = {};
              output.race.black.number = parseFloat(result[1][3]);
              output.race.black.percent = (parseFloat(result[1][3])/parseFloat(result[1][0])*100).toFixed(2);
              output.race.americanIndianAlaskaNative = {};
              output.race.americanIndianAlaskaNative.number = parseFloat(result[1][5]);
              output.race.americanIndianAlaskaNative.percent = (parseFloat(result[1][5])/parseFloat(result[1][0])*100).toFixed(2);
              output.race.asian = {};
              output.race.asian.number = parseFloat(result[1][4]);
              output.race.asian.percent = (parseFloat(result[1][4])/parseFloat(result[1][0])*100).toFixed(2);
              output.race.nativeHawaiian = {};
              output.race.nativeHawaiian.number = parseFloat(result[1][6]);
              output.race.nativeHawaiian.percent = (parseFloat(result[1][6])/parseFloat(result[1][0])*100).toFixed(2);
              output.race.otherRace = {};
              output.race.otherRace.number = parseFloat(result[1][8]);
              output.race.otherRace.percent = (parseFloat(result[1][8])/parseFloat(result[1][0])*100).toFixed(2);
              output.race.twoOrMore = {};
              output.race.twoOrMore.number = parseFloat(result[1][7]);
              output.race.twoOrMore.percent = (parseFloat(result[1][7])/parseFloat(result[1][0])*100).toFixed(2);
              output.sex = {};
              output.sex.male ={};
              output.sex.male.number = parseFloat(result[1][1]);
              output.sex.male.percent = (parseFloat(result[1][1])/parseFloat(result[1][0])*100).toFixed(2);
              output.sex.female = {};
              output.sex.female.number = parseFloat(result[1][0]) - parseFloat(result[1][1]);
              output.sex.female.percent = ((parseFloat(result[1][0]) - parseFloat(result[1][1]))/parseFloat(result[1][0])*100).toFixed(2);
              output.total = parseFloat(result[1][0]);
              console.log(JSON.stringify(output));
              res.send(output);
            }
  

           
        });

    //Client.on('error', function(err1) {
    //    console.log('Error occured in getPopulationInfo');
   // });
  
};