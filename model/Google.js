const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Google = new mongoose.Model('Google',company)({
	name: 'Google',
	founded: 'September 4, 1998',
	employees: 57100,
	active: true,
	products: ['search','maps','email'],
	CEO: {name: 'Larry Page', age: 43}
})

module.exports = mongoose.model('Google', )