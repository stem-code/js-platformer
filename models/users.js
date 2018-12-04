let mongo = require("./mongo");

mongo.ready(function(db){
    // nothing yet...
});

var defaultUserTemplate = {
    username: undefined,
    password: undefined,

}

var collection = "users";

module.exports = {
    createUser: function(userId, email, firstname, profilePic, cb){
        let userDoc = {
            userId: userId,
            email: email,
            firstname: firstname,
            profilePicUrl: profilePic
        }

        if (mongo.isReady){
            mongo.db.collection(collection).insertOne(userDoc, function(err) {
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
    findUserById: function(userId){
        return new Promise(function(resolve, reject){
            mongo.db.collection(collection).findOne({userId:userId}, (err, doc) => {
                if (err){
                    console.log("Error When Calling findUserById: ", err);
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