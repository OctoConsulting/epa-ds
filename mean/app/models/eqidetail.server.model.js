var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var EqidetailSchema = new Schema({
                                stateCode : String,
                                stateDescription : String,
                                countyCode : String,
                                countyDescription : String,
                                variableCode : String,
                                variableDescription : String,
                                variableValue : Number,
                                domain : String
});

mongoose.model('eqidetail', EqidetailSchema);