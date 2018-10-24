var path = require("path");
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// respond with "hello world" when a GET request is made to the homepage

app.set('port', process.env.PORT || 8080);
app.use("/", express.static(path.join(__dirname, 'public')));

var playerList = {};

var map = [];

var idCount = 0;

var currentGame = {
    startsIn: 10,
    countdownStartTime:0,
    countdownStarted: false,
    lavaHeight: 0,
    startTime: 0,
    started: false
}
io.on("connection", function(socket){
    var myId = idCount;
    idCount++;
    playerList[myId] = {socket: socket, x: 0, y: 0};
    console.log("Someone connected");

    if (map.length > 0 ){//&& playerList.length != 0){
        console.log("A map exists");
        socket.emit("getMap", {map:true, mapData:map});

        for (var id in playerList){
            player = playerList[id];

            if (id != myId){
                socket.emit("newUser", {userId:id, initX:player.x, initY: player.y}); 
                player.socket.emit("newUser", {userId:myId, initX:playerList[myId].x, initY:playerList[myId].y}); // Tell each user about this guy who just joined
            }
        }
    } else {
        console.log("We don't have a map. Asking the player to generate one...");
        socket.emit("getMap", {map:false} );
    }

    socket.on("loss", function(){
        io.sockets.emit("endGame");
        currentGame = {
            startsIn: 10,
            countdownStartTime:0,
            countdownStarted: false,
            lavaHeight: 0,
            startTime: 0,
            started: false
        }
        map = [];

        socket.emit("getMap", {map:false} );
    });

    socket.on("win", function(){
        io.sockets.emit("endGame");
        socket.emit("getMap", {map:false} );
        currentGame = {
            startsIn: 10,
            countdownStartTime:0,
            countdownStarted: false,
            lavaHeight: 0,
            startTime: 0,
            started: false
        }
        map = [];
        socket.emit("getMap", {map:false} );
    });

    socket.on('updatePos', function(newPos){
        playerList[myId].x = newPos.x;
        playerList[myId].y = newPos.y;

        if (currentGame.started){
            currentGame.lavaHeight = ((new Date().getTime()-currentGame.startTime)/100)-50;
            socket.emit("gameInfo", currentGame);
        } else if (currentGame.countdownStarted) {
            if (currentGame.countdownStartTime+currentGame.startsIn <= new Date().getTime() / 1000){
                currentGame.started = true;
                currentGame.startTime = new Date().getTime();
                io.sockets.emit("startGame");
            } else {
                socket.emit("countdown", currentGame.countdownStartTime+currentGame.startsIn - new Date().getTime() / 1000);
            }
        }

        for (var id in playerList){
            var player = playerList[id];
            if (id != myId){
                // console.log("We are sending data of user " + myId + " to user " + id);
                player.socket.emit('updateUserPos', {userId: myId, x:newPos.x, y:newPos.y});
            }
        }
    });

    socket.on("setMap", function(passMap){
        console.log("Player has generated map, this is now our current map.")
        map = passMap;
        console.log(map);

        currentGame.countdownStarted = true;
        currentGame.countdownStartTime = new Date().getTime() / 1000;

        io.sockets.emit("getMap", {map:true, mapData:map});
    });

    socket.on('disconnect', function () {
        console.log('A user disconnected');
        delete playerList[myId];
        io.sockets.emit('userLeft', { userId: myId });

        if (Object.keys(playerList).length == 0){
            io.sockets.emit("endGame");
            socket.emit("getMap", {map:false} );
            currentGame = {
                startsIn: 10,
                countdownStartTime:0,
                countdownStarted: false,
                lavaHeight: 0,
                startTime: 0,
                started: false
            }
            map = [];
            socket.emit("getMap", {map:false} );
        }
    });

    socket.on('message', function(data){

    });
})

http.listen(app.get('port'), function(){
    console.log("Listening on port " + app.get("port"));
});