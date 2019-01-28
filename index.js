const mongoose = require('mongoose');
//const express = require('express');
//const control = require('./controller');
//const bodyParser = require('body-parser')
//const app = express();
const server = 'localhost:27017'; 
const databaseName = 'tech';      
const PORT = 3000;
let Company = require('./model');

class Database {
	constructor() {
    this.connect()
}

	async connect() {
	  try {
	    const response = await mongoose.connect(`mongodb://${server}/${databaseName}`, {useNewUrlParser: true});
	    console.log('Database connection successful');
	  }
	  catch(e) {
	    console.error('Database connection error');
	  }
	}
}


let companyApple = new Company({
	name: "Apple",
	founded: "April 1, 1976",
	employees: 2,
	active: false,
	products: ['computers'],
	CEO: {name: "Steve Jobs", age: 21}
})

let companyGoogle = new Company({
	name: "Google",
	founded: "September 4, 1998",
	employees: 57100,
	active: true,
	products: ['search','maps','email'],
	CEO: {name: "Larry Page", age: 43}
})

let companyAppleUpdate = new Company({
	name: "Apple Inc",
	founded: "April 1, 1976",
	employees: 66000,
	active: true,
	products: ['computers', 'phones', 'tablets'],
	CEO: {name: "Time Cook", age: 56}
})


 async function writeCompany() {
	try {
		let responseA =  await companyApple.save();
		let responseG =  await companyGoogle.save();
		console.log("Write Successful");
	}
	catch(e) {
		console.error('Database create entry error');
	}
}

//find Apple and log its employees
async function queryOne(objName,objQuery,ret1) {
	try {
		await objName.find(objQuery,function (err, ret) {
			if (err) return console.error(err);
  			if (!Array.isArray(ret) || ret.length !== 0) { 
  			//console.log(apple.length)
  			//console.log(apple);
  			console.log(ret[0][ret1]);
  			}
		});
		
	}
	catch(e) {
		console.error('Database find error');
	}
}

async function updateOne(objName,objAlter,query) {
	try {
		//Must be made into an object
		let objAlter1 = objAlter.toObject();

		// Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
		delete objAlter1._id;

		await objName.updateOne(query, objAlter1, function (err, raw) {
  		if (err) return console.error(err);
  		//console.log('The raw response from Mongo was ', raw);
  		if (raw.n > 0) {
  			console.log("Update successful")
  		}
  		else {
  			console.log("No Update")
  		}
	}); 

	}
	catch(e) {
		console.error('Database find error');
	}
}

async function deleteOne(query) {
	try {
		
		let ret = await Company.deleteOne(query, function (err) {
			if (err) return console.error(err);
		});
		console.log(ret);
	}
	catch(e) {
		console.error('Database delete error');
	}
}




async function start() {
	let database = new Database;
	await database.connect;
	
	//Write to the document
	await writeCompany();
	
	//find Apple and log its employees
	queryOne(Company,{ name: "Apple" },"employees");
	
	//find Google and log its employees
	queryOne(Company,{ name: "Google" },"employees");

	//Update Apple
	updateOne(Company,companyAppleUpdate,{ name: "Apple" });

	//find Apple and log its employees
	queryOne(Company,{ name: "Apple Inc" },"employees");

	//Make sure we delete last 
	setTimeout(function() {
    	deleteOne({ name: 'Apple Inc' })
	}, 0);

	//Make sure we delete last 
	setTimeout( function() {
		deleteOne({ name: 'Google' }) }, 0);

}


start();



/*
	//MyModel.findOneAndUpdate(query, req.newData,
	let companyAppleUpdate1 = companyAppleUpdate.toObject();

	// Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
	delete companyAppleUpdate1._id;
	console.log(companyAppleUpdate1);

	await Company.updateOne({ name: "Apple" }, companyAppleUpdate1, function (err, raw) {
  		if (err) return console.error(err);
  		//console.log('The raw response from Mongo was ', raw);
  		if (raw.n > 0) {
  			console.log("Update successful")
  		}
  		else {
  			console.log("No Update")
  		}
	}); 
*/
/*
	await Company.find({ name: "Apple Inc" }, function (err, apple) {
  		if (err) return console.error(err);
  		if (!Array.isArray(apple) || apple.length !== 0) { 
  			//console.log(apple.length)
  			//console.log(apple);
  			console.log(apple[0].name);
  		}
  		
	})

	await Company.find({ name: "Google" }, function (err, google) {
  		if (err) return console.error(err);
  		if (!Array.isArray(google) || google.length !== 0) { 
  			console.log(google[0].name);
  		}
	})
*/
/*
	let ret = await Company.deleteOne({ name: 'Google' }, function (err) {
		if (err) return console.error(err);
	});
	console.log(ret);
	
	ret = await Company.deleteOne({ name: 'Apple Inc' }, function (err) {
		if (err) return console.error(err);
	});
	console.log(ret);
*/		


//writeCompany();
//setTimeout( writeCompany, 1000);

