var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/my_database'; //пример надо поменять 
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console,'MongoDB connection error'));