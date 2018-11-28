let mongo = require("./mongo");

mongo.ready(function(db){
    // nothing yet...
});

var defaultUserTemplate = {
    username: undefined,
    password: undefined,

}

module.exports = {
    createUser: function(username, password){
        let userDoc = {
            username: username,
            password: password,
            score: 0
        }

        if (mongo.isReady){
            mongo.db.insertOne(userDoc, function(err){
                if (err) throw err;
            });
        }
    },
    findUserByUsername: function(username){
        db.collection("users").find({username:username}, (err, document) => {
            if (err) throw err;
            console.log(document);
        });
    },
    authenticateUser: function(){

    },
    removeUser: function(){

    },
    updateUserScore: function(){

    }
}