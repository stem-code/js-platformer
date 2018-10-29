class ServerManager {
    constructor(platformManager, playerManager, UI, gameManager){
        this.platformManager = platformManager;
        this.playerManager = playerManager;
        this.gameManager = gameManager;
        this.UI = UI;

        this.socket = io(); // set up our communication socket

        var that = this; // Event flow control workaround
        this.socketEvents = {
            'getMap': function(mapInfo){ // A request for the map (either the server is sending over a map, or it wants us to generate one)
                if (!mapInfo.map){ // server does not have map, but needs one
                    var map = platformManager.autoGenerate(); // make Platformer manager generate the platforms
                    that.socket.emit("setMap", map); // send the newly-created map to the server
                    that.UI.setNumUsers(that.playerManager.getPlayerCount()); // update the user count
                } else {
                    platformManager.mapGenerate(mapInfo.mapData); // Make the PlatformManager generate the platforms on-screen based on server data
                    that.UI.setNumUsers(that.playerManager.getPlayerCount());
                }
            },
            'newUser': function(data){ // New user joins the server
                var userId = data.userId;
                var player = new Player(data.initX, data.initY, 50, 50);
                var playerId = this.playerManager.addPlayer(player);
                this.playerManager.grantUserId(playerId, userId); // playerManager uses its own ID system, so we have to make sure its associated with the server ID
        
                this.UI.setUsers(this.playerManager.playerCount());
            },
            'updateUserPos': function(data){
                var userId = data.userId;
                this.playerManager.updatePlayerPos(userId, data.x, Screen.windowHeight-data.y);
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
                
                lavaColor = "#4CAF50";
                lavaHeight = 0;
            }
        }
        
        for (var event in this.socketEvents){
            this.socket.on(event, this.socketEvents[event]);
        }
    }

    update(){
        this.socket.emit('updatePos', this.playerManager.getMainPlayerPos());
        if (this.gameManager.win){
            this.socket.emit("win");
            this.gameManager.win = false;
            this.gameManager.lost = false;
        } else if (this.gameManager.lose){
            this.socket.emit("lost");
            this.gameManager.win = false;
            this.gameManager.lost = false;
        }  
    }
}