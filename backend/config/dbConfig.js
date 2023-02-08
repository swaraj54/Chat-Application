const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("DataBase Connected !🗳️");
})

db.on('error',()=>{
    console.log("DataBase Connected  Failed !❌");
})

module.exports = db;
