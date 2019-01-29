const mongoose = require('mongoose');
mongoose.connect(
	'mongodb://localhost:27017/test',
	{ useNewUrlParser: true }
);

let database = mongoose.connection;
database.on('open', () => {
	console.log('Connection successful');
});

const Company = require('./Company/mongoosemodel.js');

let apple = new Company({
	name: 'Apple',
	founded: new Date('April 1, 1976'),
	employees: 2,
	active: false,
	products: ['computers'],
	CEO: {
		name: 'Steve Jobs',
		age: 21
	}
});
let google = new Company({
	name: 'Google',
	founded: new Date('September 4, 1998'),
	employees: 57100,
	active: true,
	products: ['search', 'maps', 'email'],
	CEO: {
		name: 'Larry Page',
		age: 43
	}
});
function createCompany(company) {
	company
		.save()
		.then(doc => {
			console.log(doc);
		})
		.catch(err => {
			console.log(err);
		});
}
function getCompanyEmployees(company) {
	Company.find({
		name: company
	})
		.then(companies => {
			companies.map(singleCompany => {
				console.log(singleCompany.employees);
			});
		})
		.catch(err => {
			console.log(error);
		});
}

createCompany(apple);
updateCompany(
	'Apple',
	'Apple Inc',
	new Date('April 1, 1976'),
	66000,
	true,
	['computers', 'phones', 'tablets'],
	{ name: 'Tim Cook', age: 56 }
);
getCompanyEmployees('Apple Inc');
deleteCompany(apple._id);

createCompany(google);
getCompanyEmployees('Google');
deleteCompany(google._id);

function updateCompany(
	nameSearch,
	newName,
	newDate,
	newEmployees,
	newActive,
	newProducts,
	newCEO
) {
	Company.findOneAndUpdate(
		{
			name: nameSearch
		},
		{
			name: newName,
			founded: newDate,
			employees: newEmployees,
			active: newActive,
			products: newProducts,
			CEO: newCEO
		},
		{
			new: true
		}
	)
		.then(doc => {
			console.log(doc);
		})
		.catch(error => {
			console.error(error);
		});
}

function deleteCompany(id) {
	let itemId = { _id: id };
	Company.findOneAndDelete(itemId)
		.then(doc => {
			console.log(doc);
		})
		.catch(err => {
			console.log(err);
		});
}
