const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MajorProject_dev');
const db  = mongoose.connection;

db.on('error', console.error.bind(console, "Error Connecting to Mongo"));
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;