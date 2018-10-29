class ServerManager {
    constructor(platformManager, playerManager, UI, gameManager){
        this.platformManager = platformManager;
        this.playerManager = playerManager;
        this.gameManager = gameManager;
        this.UI = UI;

        this.socket = io(); // set up our communication socket
        this.socket.emit('sendUserName', playerManager.activePlayer.userName);

        var that = this; // Event flow control workaround
        this.socketEvents = {
            'getMap': function(mapInfo){ // A request for the map (either the server is sending over a map, or it wants us to generate one)
                if (!mapInfo.map){ // server does not have map, but needs one
                    platformManager.clearPlatforms();
                    var map = platformManager.autoGenerate(); // make Platformer manager generate the platforms
                    that.socket.emit("setMap", map); // send the newly-created map to the server
                    that.UI.setNumUsers(that.playerManager.getPlayerCount()); // update the user count
                } else {
                    platformManager.clearPlatforms();
                    platformManager.mapGenerate(mapInfo.mapData); // Make the PlatformManager generate the platforms on-screen based on server data
                    that.UI.setNumUsers(that.playerManager.getPlayerCount());
                }
            },
            'newUser': function(data){ // New user joins the server
                var userId = data.userId;
                var player = new Player(data.initX, data.initY, 50, 50, data.userName);
                var playerId = that.playerManager.addPlayer(player);
                that.playerManager.grantUserId(playerId, userId); // playerManager uses its own ID system, so we have to make sure its associated with the server ID
        
                that.UI.setNumUsers(that.playerManager.getPlayerCount());
            },
            'updateUserName': function(data){
                var userId = data.userId;
                that.playerManager.updateUserName(userId, data.userName);
            },
            'updateUserPos': function(data){
                var userId = data.userId;
                that.playerManager.updatePlayerPos(userId, data.x, Screen.windowHeight-data.y);
            },
            'userLeft': function(data){ // When user leaves server
                that.playerManager.removePlayer(data.userId);
            },
            'countdown': function(timeRemaining){ // When server counts down before game, it emits an event whenever the timer descends
                that.UI.setCountDown(timeRemaining.toFixed(0));
            },
            "gameInfo": function(inf){
                lavaColor = "#FF9800";
                lavaHeight = inf.lavaHeight;
            },        
            'startGame': function(){ // The game has begun
                that.UI.clearUI();
                lavaColor = "#FF9800";
            },
            'endGame': function(){ // the game has ended
                that.playerManager.resetMainPlayer();
                that.platformManager.clearPlatforms();
                that.playerManager.activePlayer.movementVector = [0, 0];
                
                lavaColor = "#4CAF50";
                lavaHeight = 0;
            }
        }
        
        for (var event in this.socketEvents){
            this.socket.on(event, this.socketEvents[event]);
        }
    }

    update(){
        var mainPos = this.playerManager.getMainPlayerPos();
        mainPos[0] = mainPos[0] + Screen.windowHeight;
        this.socket.emit('updatePos', mainPos);
        if (this.gameManager.win){
            this.socket.emit("win");
            this.platformManager.clearPlatforms();
            this.gameManager.reset();
        } else if (this.gameManager.lose){
            this.socket.emit("lost");
            this.platformManager.clearPlatforms();
            this.gameManager.reset();
        }
    }
}