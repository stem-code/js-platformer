class PlayerManager {
    constructor(){
        this.players = [];
        this.physics = new Physics();
        this.activePlayer;
        this.userIdTranslations = {}; // User ID on the server and locally are completely different, so we have to make sure we know which server IDs correspond to local player IDs
    }

    addPlayer(player){
        this.players.push(player);
        return this.players.length-1;
    }

    grantUserId(playerId, userId){ // Translate remote server ids to local player IDs
        this.userIdTranslations[userId] = playerId;
    }

    getPlayerCount(){
        return this.players.length;
    }

    updatePlayerPos(userId, newX, newY){
        this.players[this.userIdTranslations[userId]].posX = newX;
        this.players[this.userIdTranslations[userId]].posY = newY;
    }

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
        this.activePlayer.posX = 500;
        this.activePlayer.posY = 250;
    }

    update(deltaTime){
        this.players.forEach(player => {
            if (this.gameManager){
                Collisions.checkCollisions(player, Screen.getWindowDimens(), this.gameManager.getAllEntities(), deltaTime);
            }
            
            if (player.active){
                this.physics.applyPhysics(player, deltaTime);
                player.handleKeyPress(KeyboardManager.keys); // only the active player responds to keyboard events
            }
        });
    }

    draw(ctx){
        this.players.forEach(player => {
            player.draw(ctx, this.activePlayer);
        });
    }
    // If game becomes too laggy, update and draw might have to be combined (we are now looping twice)
}