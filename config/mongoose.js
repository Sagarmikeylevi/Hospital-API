const mongoose = require('mongoose');
require('dotenv').config();
/* mongoose.set('strictQuery', false); is a method that is used to configure Mongoose to be less strict when querying MongoDB collections.*/
mongoose.set('strictQuery', false);
/* The "useNewUrlParser" option is used to configure the MongoDB driver to use the new url parser instead of the deprecated one. */
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection;

/* console.error.bind() is a method that allows you to create a new function that has the same behavior as the console.error() function */
db.on('error' , console.error.bind(console , "Error connecting to MongoDB"));

db.on('connected', () => {
    console.log('Mongoose default connection open');
});

module.exports = db;