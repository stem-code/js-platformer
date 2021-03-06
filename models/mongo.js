const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

let DBConnectionStr = process.env.DB_CONNECTION_STR;
let DBName = process.env.DB_NAME;

let readyList = [];

exports.isReady = false;
exports.ready = function(cb){
    readyList.push(cb);
}

if (DBConnectionStr && DBName){
    // Create a new MongoClient
    const client = new MongoClient(DBConnectionStr, {useNewUrlParser: true});

    // Use connect method to connect to the Server
    client.connect(function(err) {
        if (err){
            console.log(err);
            return 0;
        }
        console.log("Connected successfully to MongoDB!");
        let db = client.db(DBName);
        exports.db = db;

        exports.isReady = true;
        readyList.forEach(function(cb){ // loop through waiting callbacks
            cb(db);
        });

        // client.close();
    });
} else {
    console.log("Running without DB...");
    console.log("   - Please provide a connection string in the ENV variables.")
    console.log("   - This is normal when running in localhost | connection strings are not stored in Github for security reasons.");
}


process.on('SIGINT', function () {
    console.log('Got SIGINT exit.');
    if (exports.db) exports.db.close(); // exit DB cleanly
    console.log("MongoDB has been shut down.");
    process.abort();
});
