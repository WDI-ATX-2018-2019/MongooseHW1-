const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let companySchema = new Schema({
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

let company = mongoose.model('company', companySchema)

let apple = new company({
    name: 'Apple',
    founded: new Date(4, 1, 1976),
    employees: 2,
    active: false,
    products: 'computers',
    CEO: {
        name: 'Steve Jobs',
        age: 21
    }
});

apple.save()


let google = new company({
    name: 'Google',
    founded: new Date(9 4, 1998),
    employees: 57100,
    active: true,
    products: ['search', 'maps', 'email'],
    CEO: {
        name: 'Larry Page',
        age: 41
    }
})

google.save()

apple.updateOne({ name: 'Apple Inc' }, { founded: new Date(4, 1, 1976) }, { employees: 66000 }, { active: true }, { products: ['computers', 'phones', 'tablets'] }, {
    CEO: {
        name: 'Tim Cook',
        age: 56
    }
});