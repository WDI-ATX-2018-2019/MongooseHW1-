const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
	name: String,
	founded: Date,
	employees: Number,
	active: Boolean,
	products: [String],
	CEO: {
		name: String,
		age: Number
	}
});

module.exports = companySchema;
