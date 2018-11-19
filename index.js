var path = require("path");
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV == "production") {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
  }

app.use(requireHTTPS);
app.set('port', process.env.PORT || 8080);
app.use("/", express.static(path.join(__dirname, 'public')));

// if (process.env.NODE_ENV === 'production' || true) {
// }

var playerList = {};

var map = [];

var idCount = 0;
var lavaRate = 6;

var currentGame = {
    startsIn: 10,
    countdownStartTime:0,
    countdownStarted: false,
    lavaHeight: 0,
    startTime: 0,
    started: false
}

io.on("connection", function(socket){
    var myId;

    function join(){
        myId = idCount;
        idCount++;
        playerList[myId] = {socket: socket, x: 0, y: 0, userName: "", appearance:{color:"#ff0", playerSpriteSheetIndex:0, rgbColor:[255, 0, 0]}, index:{xIndex:0, yIndex:0}, lost:false};
        for (var id in playerList){
            player = playerList[id];
            if (id != myId){
                socket.emit("newUser", {userId:id, initX:player.x, initY: player.y, userName:player.userName, appearance:player.appearance}); 
                player.socket.emit("newUser", {userId:myId, initX:playerList[myId].x, initY:playerList[myId].y, userName:playerList[myId].userName, appearance:player.appearance}); // Tell each user about this guy who just joined
            }
        }
        if (map.length > 0 ){//&& playerList.length != 0){
            socket.emit("getMap", {map:true, mapData:map});
        } else {
            console.log("We don't have a map. Asking the player to generate one...");
            socket.emit("getMap", {map:false} );
        }
    }

    join();

    socket.on("sendUserName", function(userName) {
            playerList[myId].userName = userName;
    
            for (var id in playerList){
                var player = playerList[id];
                if (id != myId){
                    console.log("We are sending userName: " + userName + " of user " + myId + " to user " + id);
                    player.socket.emit('updateUserName', {userId: myId, userName:userName});
                }
            }
    });

    socket.on("sendUserAppearance", function(appearance) {
        playerList[myId].appearance = appearance;
        console.log("User Has Updated Appearance");

        for (var id in playerList){
            var player = playerList[id];
            if (id != myId){
                console.log("update user ", player.userName);
                player.socket.emit('updateUserAppearance', {userId: myId, appearance:appearance});
            }
        }
});

    socket.on("lost", function(){
        io.sockets.emit("playerEvent", {userName:playerList[myId].userName, userId: myId});
        playerList[myId].lost = true;

        var allLost = true;
        for (var id in playerList){
            var player = playerList[id];
            if (!player.lost){ allLost = false; }
        }

        if (allLost){
            console.log("Everyone has lost");
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
            for (var id in playerList){
                var player = playerList[id];
                player.lost = false;
            }

            socket.emit("getMap", {map:false} );
        }
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
        for (var i = 0;i < playerList.length;i++) {
            // Set player positions to bottom of the map.
        }
        map = [];
        socket.emit("getMap", {map:false} );
        
    });
    socket.on('updatePos', function(playerData){
        var newPos = playerData.pos;
        var playerSpriteIndex = playerData.index;    

        if (playerData.fake){
            socket.emit("gameInfo", currentGame);
            return 0;
        }

        if (!playerList[myId]) return false;   
        playerList[myId].x = newPos.x;
        playerList[myId].y = newPos.y;

        playerList[myId].index = playerSpriteIndex;

        // playerList[myId].lastCommunication = new Date().getTime();

        if (currentGame.started){
            currentGame.lavaHeight = (((new Date().getTime()-currentGame.startTime)/100) * lavaRate);
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
                player.socket.emit('updateUserPos', {userId: myId, x:newPos.x, y:newPos.y, index: playerSpriteIndex});
            }
        }
    });

    socket.on("setMap", function(passMap){
        console.log("Player has generated map, this is now our current map.")
        map = passMap;
        // console.log(map);

        currentGame.countdownStarted = true;
        currentGame.countdownStartTime = new Date().getTime() / 1000;

        io.sockets.emit("getMap", {map:true, mapData:map});
    });
    
    socket.on('leave', function(){
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

    socket.on('rejoin', function(){
        join();
    })

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
