var Db = require('mongodb').Db;
var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var assert = require('assert');
var fs = require('fs');
var config = require('./config')

console.log("\n Starting");
var jsonData;

fs.readFile('eqi_details.json', 'utf8', function (err, data) {
  if (err) throw err;
  jsonData = JSON.parse(data);
  console.log("Eqi_Details records to be added " + jsonData.length);
  
});

var jdata;
fs.readFile('eqi_results.json','utf8',function(err,data){
	if(err) throw err;
	jdata = JSON.parse(data);
	console.log("Eqi_Results records to be added: " + jdata.length + "\n");
})


var count ;
var rcount;

//var db = new Db('Testing',new Server('localhost',27017));
console.log("Uri is " + config.db.uri);
MongoClient.connect(config.db.uri, function (err, db) {

		db.open(function(err,db){
			assert.equal(null,err);
			var temp = false;
			var rtemp = false;
			 db.collection('eqidetails').drop( function(err, response) {
			      	
			 });
			 
			 db.collection('eqiresults').drop(function(err,response){
			 	
			 }); 
			 
			db.command({ping : 1},function(err,result){
				assert.equal(null,err);
				count = jsonData.length;
				rcount = jdata.length;
				db.createCollection("eqidetails",function(err,collection){
					assert.equal(null,err);
					for(var i = 0 ; i < jsonData.length; i++){
						collection.insert(jsonData[i],function(err,result){
							count = count - 1;
							if(rcount == 0 && count == 0){
								console.log("All Records Added");
								db.close();
							}
						});
					}
				});

				db.createCollection("eqiresults",function(err,collection){
					assert.equal(null,err);
					for(var i = 0 ; i < jdata.length; i++){
						collection.insert(jdata[i],function(err,result){
							rcount = rcount - 1;
							if(rcount == 0 && count == 0){
								console.log("All Records Added");
								db.close();
							}
						});
					}
				})


			});
			
			
		});
});