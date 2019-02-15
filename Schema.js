const mongoose = require('mongoose')
mongoose.set('useNewUrlParser', true)
const Schema = mongoose.Schema
const myDb = 'mongodb://localhost:27017'
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('were connected!')
});

const companySchema = new Schema({
	name: String,
	founded: String,
	employees: Number,
	active: Boolean,
	products: Array,
	CEO: {name: String, age: Number,},
	name: String,
	age: Number,
})

let company = mongoose.model('Company', companySchema);

const Google = new company({
	name: 'Google',
	founded: 'September 4, 1998',
	employees: 57100,
	active: true,
	products: ['search','maps','email'],
	CEO: {name:'Larry Page', age:41},
})

const Apple = new company({
	name: 'Apple',
	founded: 'April 1 1976',
	employees: 2,
	active: false,
	products: ['computers'],
	CEO: {name:'Steve Jobs', age: 21}
})

Google.save()
Apple.save()



company.find(function (err, company) {
  if (err) return console.error(err);
  console.log(company);
})

company.deleteMany(Apple, Google)


mongoose.connect(myDb)
