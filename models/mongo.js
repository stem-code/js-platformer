const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

let DBConnectionStr = process.env.DB_CONNECTION_STR;
let DBName = process.env.DB_NAME;

let readyList = [];

exports.isReady = false;
exports.ready = function(cb){
    readyList.push(cb);
}

if (DBConnectionStr && DBName){
    // Create a new MongoClient
    const client = new MongoClient(DBConnectionStr);

    // Use connect method to connect to the Server
    client.connect(function(err) {
        assert.equal(null, err);
        console.log("Connected successfully to MongoDB!");
        exports.db = client.db(DBName);

        exports.isReady = true;
        readyList.forEach(function(cb){ // loop through waiting callbacks
            cb(db);
        });

        client.close();
    });
} else {
    console.log("Running without DB...");
    console.log("   - Please provide a connection string in the ENV variables.")
    console.log("   - This is normal when running in localhost | connection strings are not stored in Github for security reasons.");
}

