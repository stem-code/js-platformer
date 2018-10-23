
var currentSock;

function initServer(renderer, cb){
    var socket = io();
    currentSock = socket;
    var users = {};

    socket.on('newUser', function(data){
        var userId = data.userId;
        users[userId] = new Entity(data.initX, data.initY, 30, 30, 20, false, undefined, false);
        renderer.createEntity(users[userId]);
    });

    socket.on('updateUserPos', function(data){
        console.log(data.userId);
        var userId = data.userId;
        users[userId].posX = data.x;
        users[userId].posY = data.y;
    });

    socket.on('removeUser', function(data){

    });

    socket.on('getMap', function(mapInfo){
        console.log(JSON.stringify(mapInfo));
        if (!mapInfo.map){
            cb(true, null, function(map){
                console.log("Sending over map...")
                console.log(map);
                console.log(map.length);
                socket.emit("setMap", map);
            });
        } else {
            cb(false, mapInfo.mapData);
        }
    });
}

var updatePlayerPos = function(newPos){
    currentSock.emit('updatePos', newPos);
}