let mongo = require("./mongo");

mongo.ready(function(db){
    // nothing yet...
});

var defaultUserTemplate = {
    username: undefined,
    password: undefined,

}

module.exports = {
    createUser: function(username, password, cb){
        let userDoc = {
            username: username,
            password: password,
            score: 0
        }

        if (mongo.isReady){
            mongo.db.insertOne(userDoc, function(err) {
                if (!err) {
                    cb({success:true});
                } else {
                    cb({success:false, err:err});
                }
            });
        } else {
            cb({success:false, err:"DB is still initializing"});
        }
    },
    findUserByUsername: function(username){
        return new Promise(function(resolve, reject){
            mongo.db.collection("users").findOne({username:username}, (err, doc) => {
                if (err){
                    console.log("Error When Calling findUserByUsername: ", err);
                }
    
                resolve({doc:doc, success: !err, err:(err ? undefined : err)});
            });
        });
    },
    authenticateUser: function(){

    },
    removeUser: function(){

    },
    updateUserScore: function(){

    }
}