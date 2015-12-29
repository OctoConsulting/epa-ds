var Db = require('mongodb').Db;
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var assert = require('assert');
var fs = require('fs');
var config = require('./config');
var async = require('async');

module.exports = function(app, cb) {

console.log("\n Starting Migration");
var jsonData;
var jdata;
var count ;
var rcount;
var database;

async.series([
  function(callback) {
    console.log("Reading  eqi_details.json");
      fs.readFile('./config/eqi_details.json', 'utf8', function (err, data) {
        if (err) throw err;
        jsonData = JSON.parse(data);
        console.log("Eqi_Details records to be added " + jsonData.length);
        callback(null);
      });
    },
 function(callback) {
   console.log("Reading eqi_results.json");
    fs.readFile('./config/eqi_results.json','utf8',function(err,data){
    	if(err) throw err;
    	jdata = JSON.parse(data);
    	console.log("Eqi_Results records to be added: " + jdata.length + "\n");
      callback(null);
    });
  },
  function(callback) {
    console.log("Uri is " + config.db.uri);
    MongoClient.connect(config.db.uri, function (err, db) {
    		db.open(function(err,db){
    			assert.equal(null,err);
          database = db;
          callback(null);
        });
     });
   },
   function(callback) {
      database.collection('eqidetails').drop( function(err, response) {
        database.command({ping : 1},function(err,result){
          assert.equal(null,err);
          count = jsonData.length;
          database.createCollection("eqidetails",function(err,collection){
             console.log('Populating eqidetails');
            assert.equal(null,err);
            for(var i = 0 ; i < jsonData.length; i++){
              collection.insert(jsonData[i],function(err,result){
                if (err) throw err;
                count = count - 1;
                if(count === 0) {
                  console.log('Done Populating eqidetails');
                  callback(null);
                }
              });
            }
          });
      });
    });
  },
  function(callback) {
      database.collection('eqiresults').drop(function(err,response){
        database.command({ping : 1},function(err,result){
          assert.equal(null,err);
          rcount = jdata.length;
          database.createCollection("eqiresults",function(err,collection){
           console.log('Populating eqiresults');
           assert.equal(null,err);
           for(var i = 0 ; i < jdata.length; i++){
             collection.insert(jdata[i],function(err,result){
                if(err) throw err;
                rcount = rcount - 1;
                if(rcount === 0) {
                  console.log('Done Populating eqiresults');
                  callback(null);
                }
             });
           }
         });
      });
     });
   },
   function(callback) {
     console.log('Closing DB connection');
     database.close();
     callback(null);
   },
   function(callback) {
     console.log('Calling Aggregate cache');
     cb(app);
   }]);
};
