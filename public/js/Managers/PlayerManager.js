class PlayerManager {
    constructor(){
        this.players = [];
        this.physics = new Physics();
        this.activePlayer;
        this.userIdTranslations = {}; // User ID on the server and locally are completely different, so we have to make sure we know which server IDs correspond to local player IDs
        this.spectatorView = false;
    }

    addPlayer(player){
        this.players.push(player);
        return this.players.length-1;
    }

    grantUserId(playerId, userId){ // Translate remote server ids to local player IDs
        this.userIdTranslations[userId] = playerId;
    }

    getPlayerCount(){ return this.players.length; }

    updatePlayerPos(userId, newX, newY){
        this.players[this.userIdTranslations[userId]].posX = newX;
        this.players[this.userIdTranslations[userId]].posY = newY;
    }

    updateUserName(userId, userName){ this.players[this.userIdTranslations[userId]].userName = userName; }
    updateUserAppearance(userId, appearance){ this.players[this.userIdTranslations[userId]].appearance = appearance; }

    removePlayer(userId){
        var playerId = this.userIdTranslations[userId];
        this.players.splice(playerId, 1);
    }

    setMainPlayer(playerId){
        this.players[playerId].active = true; // only active players can be controlled with the keyboard
        this.activePlayer = this.players[playerId];
        this.resetMainPlayer(); // make sure player is in correct position
    }

    getMainPlayerPos(){ // called by serverManager to get player position every frame
        return {x:this.activePlayer.posX, y:this.activePlayer.posY};
    }

    resetMainPlayer(){
        this.activePlayer.posX = Screen.windowWidth / 2;
        this.activePlayer.posY = lavaHeight - 100;
    }

    update(deltaTime){
        this.players.forEach(player => {
            if (this.gameManager){
                Collisions.checkCollisions(player, Screen.getWindowDimens(), this.gameManager.getAllEntities(), deltaTime);
            }
            
            if (player.active && !player.spectator){
                this.physics.applyPhysics(player, deltaTime);
                player.handleKeyPress(KeyboardManager.keys); // only the active player responds to keyboard events
            }

            if (player.active && player.spectator && this.players.length > 0){
                player.posX = this.players[this.players.length-1].posX;
                player.posY = this.players[this.players.length-1].posY;
            }
        });
    }

    draw(ctx){
        this.players.forEach(player => {
            player.draw(ctx, this.activePlayer);
        });
    }

    updateAppearance() {
        this.players.forEach(player => {
            player.updateAppearance();
        });
    }

    // If game becomes too laggy, update and draw might have to be combined (we are now looping twice)
    
    setSpectatorStatus(toggle){
        if (toggle){ // spectator mode needs to be enabled
            this.activePlayer.spectator = true;
        } else {
            this.activePlayer.spectator = false;
        }
    }
}