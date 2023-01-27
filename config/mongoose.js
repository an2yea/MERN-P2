const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/userdb');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Connection to database failed"));

db.once('open', function(){
    console.log("Connected Successfully to MongoDb")
})
