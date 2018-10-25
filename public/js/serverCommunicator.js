
var currentSock;
var hasLost = false;

function initServer(renderer, cb){
    var socket = io();
    currentSock = socket;
    var users = {};

    socket.on('newUser', function(data){
        var userId = data.userId;
        users[userId] = new Entity(data.initX, data.initY, 50, 50, 20, false, "#F44336", false);
        users[userId].gravityEnabled = false;

        renderer.createEntity(users[userId]);
        document.getElementById("num-users").innerHTML = Object.keys(users).length;
    });

    socket.on("countdown", function(timeRemaining){
        document.getElementById("countDown").innerHTML = timeRemaining.toFixed(0);
    });

    socket.on("startGame", function(){
        document.getElementById("countDown").innerHTML = "";
    });

    socket.on("gameInfo", function(inf){
        lavaHeight = inf.lavaHeight;
    });

    socket.on('updateUserPos', function(data){
        var userId = data.userId;
        users[userId].posX = data.x;
        users[userId].posY = data.y+renderer.windowDimens[1];
    });

    socket.on('getMap', function(mapInfo){
        console.log(JSON.stringify(mapInfo));
        if (!mapInfo.map){
            cb(true, null, function(map){
                console.log("Sending over map...")
                console.log(map);
                console.log(map.length);
                socket.emit("setMap", map);
                document.getElementById("num-users").innerHTML = Object.keys(users).length;
            });
        } else {
            cb(false, mapInfo.mapData);
            document.getElementById("num-users").innerHTML = Object.keys(users).length;
        }
    });

    socket.on('userLeft', function(data){
        console.log(data.userId + " left the game");
        users[data.userId].posY = -200000;
        delete users[data.userId];
    });

    socket.on("endGame", function(){
        renderer.activePlayer.posY = 100;
        lavaHeight = 0;
        setTimeout(function() { hasLost = false; }, 500); 
    })
}

var updatePlayerPos = function(newPos){
    currentSock.emit('updatePos', newPos);
}

var onWin = function(){
    if (!hasLost){
        currentSock.emit("win");
        document.getElementById("winStatus").innerHTML = "You Won!";
        hasLost = true;
    }
    setTimeout(function(){ document.getElementById("winStatus").innerHTML = "" }, 2000);
}

var onLose = function(){
    if (!hasLost){
        currentSock.emit("lost");
        document.getElementById("winStatus").innerHTML = "You Lost!"
    
        setTimeout(function(){ document.getElementById("winStatus").innerHTML = "" }, 2000);
        hasLost = true;
    }
    
}
