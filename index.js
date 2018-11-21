var path = require("path");
var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV == "production") {
        return res.redirect('https://' + req.get('host') + req.url); // Force HTTPS Protocol (Secure)
    }
    next();
  }

app.use(requireHTTPS);
app.set('port', process.env.PORT || 8080);
app.use("/", express.static(path.join(__dirname, 'public')));

var playerList = {};

var map = [];

var idCount = 0;
var lavaRate = 9;
var wallWidth = 1000;

var currentGame = {
    startsIn: 10,
    countdownStartTime:0,
    countdownStarted: false,
    lavaHeight: 0,
    startTime: 0,
    started: false
}

function generateMap(numPlatforms){
    numPlatforms = numPlatforms || 55; // If not provided, replace with default value
    var generatedMap = []; // The generatedMap will contain the x position of each platform (since the y values are always the same)

    for (var x=0; x<numPlatforms; x++){
        var platformX = Math.floor(Math.random()*(wallWidth-300))
        generatedMap.push(platformX);
    }

    return generatedMap;
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

        if (map.length > 0 ){
            socket.emit("map", {map:true, mapData:map});
        } else {
            console.log("We don't have a map. Generating one...");
            map = generateMap();
            currentGame.countdownStarted = true;
            currentGame.countdownStartTime = new Date().getTime() / 1000;

            setTimeout(function(){ // start the game in 10 secs
                currentGame.started = true;
                io.sockets.emit("startGame");
            }, 10*1000); 

            socket.emit("map", {map:true, mapData:map});
        }
    }

    function reset(){
        io.sockets.emit("endGame");
        currentGame = {
            startsIn: 10,
            countdownStartTime:0,
            countdownStarted: false,
            lavaHeight: 0,
            startTime: 0,
            started: false
        }

        map = generateMap();
        loopCounter = 0;
        currentGame.countdownStarted = true;
        currentGame.countdownStartTime = new Date().getTime() / 1000;
        io.sockets.emit("map", {map:true, mapData:map});
        setTimeout(function(){ // start the game in 10 secs
            currentGame.started = true;
            io.sockets.emit("startGame");
        }, 10*1000); 
    }

    join();

    socket.on("sendUserName", function(userName) { // When the client sends his username to the server for processing
        socket.broadcast.emit('updateUserName', {userId: myId, userName:userName});
    });

    socket.on("sendUserAppearance", function(appearance) {
        playerList[myId].appearance = appearance;
        socket.broadcast.emit('updateUserAppearance', {userId: myId, appearance:appearance});
    });

    socket.on("lost", function(){
        io.sockets.emit("playerEvent", {userName:playerList[myId].userName, userId: myId});
        playerList[myId].lost = true;

        var allLost = true;
        for (var id in playerList){
            var player = playerList[id];
            if (!player.lost){ allLost = false; }
        } // check if everyone has lost

        if (allLost){
            reset();
        }
    });

    socket.on("win", reset);

    socket.on('updatePos', function(playerData){
        var newPos = playerData.pos;
        var playerSpriteIndex = playerData.index;

        // if (playerData.fake){
        //     socket.emit("gameInfo", currentGame);
        //     return 0;
        // }

        // if (!playerList[myId]) return false;   
        playerList[myId].x = newPos.x;
        playerList[myId].y = newPos.y;
        playerList[myId].index = playerSpriteIndex;

        // if (currentGame.started){
        //     currentGame.lavaHeight = (((new Date().getTime()-currentGame.startTime)/100) * lavaRate);
        //     socket.emit("gameInfo", currentGame);
        // } else if (currentGame.countdownStarted && currentGame.countdownStartTime+currentGame.startsIn <= new Date().getTime() / 1000){
        //     currentGame.started = true;
        //     currentGame.startTime = new Date().getTime();
        //     io.sockets.emit("startGame");
        // } else 

        socket.broadcast.emit('updateUserPos', {userId: myId, x:newPos.x, y:newPos.y, index: playerSpriteIndex}); // Send to everyone except sender
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
})

http.listen(app.get('port'), function(){
    console.log("Listening on port " + app.get("port"));
});

var loopCounter = 0;
function gameLoop(){
    if (currentGame.started){
        currentGame.lavaHeight = (loopCounter/10) * lavaRate;
        io.sockets.emit("gameInfo", currentGame);
        loopCounter++;
    }
    
    if (!currentGame.started && currentGame.countdownStarted) {
        io.sockets.emit("countdown", currentGame.countdownStartTime+currentGame.startsIn - new Date().getTime() / 1000);
    }

    setTimeout(gameLoop, 16);
}
gameLoop();