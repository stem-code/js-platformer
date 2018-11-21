class ServerManager {
    public platformManager: PlatformManager;
    public playerManager: PlayerManager;
    public gameManager: GameManager;
    public UI: UIManager;
    public socket: any;
    public socketEvents: any;

    constructor(platformManager: PlatformManager, playerManager: PlayerManager, UI: UIManager, gameManager: GameManager){
        this.platformManager = platformManager;
        this.playerManager = playerManager;
        this.gameManager = gameManager;
        this.UI = UI;

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
            'map': (mapInfo: any) => { // A request for the map (either the server is sending over a map, or it wants us to generate one)
                platformManager.clearPlatforms();
                platformManager.mapGenerate(mapInfo.mapData); // Make the PlatformManager generate the platforms on-screen based on server data
                that.UI.setNumUsers(that.playerManager.getPlayerCount());
            },
            'newUser': (data: any) => { // New user joins the server
                var userId = data.userId;
                var player = new Player(playerAABB.clone().move(data.initX, data.initY), data.userName, data.appearance);
                var playerId = that.playerManager.addPlayer(player);
                that.playerManager.grantUserId(playerId, userId); // playerManager uses its own ID system, so we have to make sure its associated with the server ID
        
                that.UI.setNumUsers(that.playerManager.getPlayerCount());
            },
            'updateUserName': (data: any) => {
                var userId = data.userId;
                that.playerManager.updateUserName(userId, data.userName);
            },
            'updateUserAppearance': (data:any) => {
                var userId = data.userId;
                that.playerManager.updateUserAppearance(userId, data.appearance);
            },
            'updateUserPos': (data:any) => {
                var userId = data.userId;
                that.playerManager.updatePlayerPos(userId, data.x, MyScreen.windowHeight+data.y);
                that.playerManager.updatePlayerIndex(userId, data.index);
            },
            'userLeft': (data: any) => { // When user leaves server (or dies)
                that.playerManager.removePlayer(data.userId);
            },
            'countdown': (timeRemaining:any) => { // When server counts down before game, it emits an event whenever the timer descends
                that.UI.setCountDown(timeRemaining.toFixed(0));
            },
            "gameInfo": (inf: any) => {
                lavaColor = "#FF9800";
                lavaHeight = inf.lavaHeight;
                that.gameManager.gameStarted = true;
            },        
            'startGame': () => { // The game has begun
                that.gameManager.gameStarted = true;
                that.UI.clearUI();
                lavaColor = "#FF9800";
            },
            'endGame': () => { // the game has ended
                lavaHeight = 0;
                lavaColor = "#4CAF50";

                console.log("END OF GAME");
                setTimeout(function(){
                    that.gameManager.spectatorView(false);
                    lavaColor = "#4CAF50";
                }, 400);

                that.playerManager.resetMainPlayer();
                that.playerManager.resurrectPlayers();
                that.platformManager.clearPlatforms();
                
                that.playerManager.activePlayer.velocity = [0, 0];                
                document.getElementById("log").innerHTML = "";
            },
            "timeout": () => { // The server has deleted us because we either left the tab or lost our connection 😢
                location.reload (); // Reload the page
            },
            "playerEvent":(data: any) => { // When something happens to another player
                document.getElementById("log").innerHTML = "<p class='msg-text'>💀💀💀 " + data.userName + " is now dead. 💀💀💀</p>"
                this.playerManager.playerDeath(data.userId);
            },
            "connect": () => {
                $("#disconnect-screen-container").hide();
            },
            "disconnect": () => {
                $("#disconnect-screen-container").show();
            }
        }
    }

    startCommunication(){
        //@ts-ignore
        this.socket = io(); // set up our communication socket
        this.socket.emit('sendUserName', this.playerManager.activePlayer.userName);
        this.socket.emit('sendUserAppearance', this.playerManager.activePlayer.appearance);

        for (var event in this.socketEvents){
            this.socket.on(event, this.socketEvents[event]);
        }
    }

    updateAppearance(appearance: any){
        // alert("UPDATE");
        this.playerManager.activePlayer.updateAppearance(appearance);
        this.socket.emit('sendUserAppearance', this.playerManager.activePlayer.appearance);
    }

    update(){
        var mainPos = this.playerManager.getMainPlayerPos();
        mainPos.y = mainPos.y - MyScreen.windowHeight;

        if (!this.gameManager.spectatorViewEnabled){
            this.socket.emit('updatePos', {pos: mainPos, index:this.playerManager.activePlayer.index});
        } 
        // else {
        //     this.socket.emit('updatePos', {fake:true});
        // }

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