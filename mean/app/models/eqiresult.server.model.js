var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var EquiresultSchema = new Schema({
                                stateCode : String,
                                stateDescription : String,
                                countyCode : String,
                                countyDescription : String,
                                domain : String,
                                eqi : Number
});

mongoose.model('eqiresult', EquiresultSchema);