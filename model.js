//Require Mongoose
let mongoose = require('mongoose');

//Define a schema
let Schema = mongoose.Schema;

var companySchema = new Schema({
	name: {type: String, 
		required: true },
	founded: Date,
	employees: Number,
	active: Boolean,
	products: [String],
	CEO: { name: String, age: Number }
});


let CompanyModel = mongoose.model('tech1', companySchema);

module.exports = CompanyModel;

