var globalSocket;
var globalPlayerManager;

class ServerManager {
    constructor(platformManager, playerManager, UI, gameManager){
        this.platformManager = platformManager;
        this.playerManager = playerManager;
        globalPlayerManager = this.playerManager;
        this.gameManager = gameManager;
        this.UI = UI;

        this.socket = io(); // set up our communication socket
        globalSocket = this.socket;
        this.socket.emit('sendUserName', playerManager.activePlayer.userName);
        this.socket.emit('sendUserAppearance', playerManager.activePlayer.appearance);

        var that = this; // Event flow control workaround

        // window.onblur = function () { // If we leave the tab
        //     this.socket.emit('leave'); 
        // }; 

        // window.onfocus = function(){
        //     this.socket.emit("rejoin");
        //     that.playerManager.resetMainPlayer();
        //     that.platformManager.clearPlatforms();
        //     that.playerManager.activePlayer.movementVector = [0, 0];
        // }

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
                var player = new Player(data.initX, data.initY, 50, 50, data.userName, data.appearance);
                var playerId = that.playerManager.addPlayer(player);
                that.playerManager.grantUserId(playerId, userId); // playerManager uses its own ID system, so we have to make sure its associated with the server ID
        
                that.UI.setNumUsers(that.playerManager.getPlayerCount());
            },
            'updateUserName': function(data){
                var userId = data.userId;
                that.playerManager.updateUserName(userId, data.userName);
            },
            'updateUserAppearance': function(data){
                var userId = data.userId;
                that.playerManager.updateUserAppearance(userId, data.appearance);
            },
            'updateUserPos': function(data){
                var userId = data.userId;
                that.playerManager.updatePlayerPos(userId, data.x, Screen.windowHeight+data.y);
            },
            'userLeft': function(data){ // When user leaves server (or dies)
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
                that.gameManager.gameStarted = true;
                that.UI.clearUI();
                lavaColor = "#FF9800";
            },
            'endGame': function(){ // the game has ended
                console.log("END OF GAME")
                setTimeout(function(){
                    that.gameManager.spectatorView(false);
                }, 400);
                that.playerManager.resetMainPlayer();
                that.platformManager.clearPlatforms();
                that.playerManager.activePlayer.movementVector = [0, 0];
                
                lavaColor = "#4CAF50";
                lavaHeight = 0;
                document.getElementById("log").innerHTML = "";
            },
            "timeout": function(){ // The server has deleted us because we either left the tab or lost our connection 😢
                location.reload (); // Reload the page
            },
            "playerEvent":function(data){ // When something happens to another player
                document.getElementById("log").innerHTML = "<p class='msg-text'>💀💀💀 " + data.userName + " is now dead. 💀💀💀</p>"
            }
        }
        
        for (var event in this.socketEvents){
            this.socket.on(event, this.socketEvents[event]);
        }
    }

    update(){
        var mainPos = this.playerManager.getMainPlayerPos();
        mainPos.y = mainPos.y - Screen.windowHeight;

        if (!this.gameManager.spectatorViewEnabled){
            this.socket.emit('updatePos', mainPos);
        } else {
            this.socket.emit('updatePos', {fake:true});
        }

        if (this.gameManager.win){
            this.socket.emit("win");
            this.platformManager.clearPlatforms();
            this.gameManager.reset();
        } else if (this.gameManager.lose){
            var that = this;
            setTimeout(function(){
                that.socket.emit("lost");
            }, 300);
            // this.platformManager.clearPlatforms();
            this.gameManager.reset();
            this.gameManager.spectatorView(true);
        }
    }
}

function onClickFuncAppearance() {
    this.socket.emit('sendUserAppearance', globalPlayerManager.activePlayer.appearance);
}