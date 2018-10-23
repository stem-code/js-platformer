var path = require("path");
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// respond with "hello world" when a GET request is made to the homepage

app.set('port', process.env.PORT || 8080);
app.use("/", express.static(path.join(__dirname, 'public')));

var playerList = [];
var map = [];

var idCount = 0;
io.on("connection", function(socket){
    var myId = idCount;
    idCount++;
    playerList.push({socket: socket, id: myId, x: 0, y: 0});
    console.log("Someone connected");

    if (map.length > 0 ){//&& playerList.length != 0){
        console.log("A map exists");
        socket.emit("getMap", {map:true, mapData:map});

        var incr = 0;
        playerList.forEach(player => {
            if (incr != myId){
                socket.emit("newUser", {userId:player.id, initX:player.x, initY:player.y});
                incr++;
            }
        });
    } else {
        console.log("We don't have a map. Asking the player to generate one...");
        socket.emit("getMap", {map:false} );
    }

    socket.on('updatePos', function(newPos){
        playerList[myId].x = newPos.x;
        playerList[myId].y = newPos.y;

        var incr = 0;
        playerList.forEach(player => {
            if (incr != myId){
                player.socket.emit('updateUserPos', {userId: myId, x:newPos.x, y:newPos.y});
                incr++;
            }
        });
    });

    socket.on("setMap", function(passMap){
        console.log("Player has generated map, this is now our current map.")
        map = passMap;
        console.log(map);
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });

    socket.on('message', function(data){

    });
})

http.listen(app.get('port'), function(){
    console.log("Listening on port " + app.get("port"));
});