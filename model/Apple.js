const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
const Apple = new mongoose.Model('Apple',company)({
	name: 'Apple',
	founded: 'April 1 1976',
	employees: 2,
	active: false,
	products: ['computers'],
	CEO: {name:'Steve Jobs', age: 21}
})

module.exports = Apple