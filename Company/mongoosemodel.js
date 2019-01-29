const mongoose = require('mongoose');
const companySchema = require('./schema');

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
