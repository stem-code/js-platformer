class PlayerManager {
    public players: Player[];
    public physics: Physics;
    public activePlayer: Player;
    public userIdTranslations: { [key:number]:number; };
    public spectatorView: boolean;
    private gameManager: GameManager;
    private camera: Camera;

    constructor(camera: Camera){
        this.players = [];
        this.physics = new Physics();
        this.activePlayer;
        this.userIdTranslations = {}; // User ID on the server and locally are completely different, so we have to make sure we know which server IDs correspond to local player IDs
        this.spectatorView = false;
        this.camera = camera;
    }

    addPlayer(player: Player){
        this.players.push(player);
        return this.players.length-1;
    }

    playerDeath(userId: number){ // another player has died
        this.players[this.userIdTranslations[userId]].dead = true;
        if (this.spectatorView && this.camera.entityToFollow == this.players[this.userIdTranslations[userId]]){ // check if we are spectating the dead player
            
            this.players.forEach((player) => {
                if (!player.dead) this.camera.entityToFollow = player;
            });
        }
    }

    resurrectPlayers(){ // called at the end of game
        this.players.forEach(player => {
            if (player != this.activePlayer) player.dead = false;
        });
    }

    grantUserId(playerId: number, userId:number ){ // Translate remote server ids to local player IDs
        this.userIdTranslations[userId] = playerId;
    }

    getPlayerCount(){ return this.players.length; }

    updatePlayerPos(userId: number, newX: number, newY: number){
        if (!this.players[this.userIdTranslations[userId]]){
            return 0;
        }

        this.players[this.userIdTranslations[userId]].aabb.x = newX;
        this.players[this.userIdTranslations[userId]].aabb.y = newY;
    }

    updateUserName(userId: number, userName: string) { this.players[this.userIdTranslations[userId]].userName = userName; }
    updateUserAppearance(userId: number, appearance: any) { this.players[this.userIdTranslations[userId]].updateAppearance(appearance); }

    removePlayer(userId: number){
        var playerId = this.userIdTranslations[userId];
        this.players[playerId] =  undefined; // We can't remove it, otherwise it will mess up our userIdTranslations for other users
    }

    setMainPlayer(playerId: number){
        this.players[playerId].active = true; // only active players can be controlled with the keyboard
        this.activePlayer = this.players[playerId];
        this.activePlayer.dead = true;
        this.resetMainPlayer(); // make sure player is in correct position
    }

    getMainPlayerPos(){ // called by serverManager to get player position every frame
        return {x:this.activePlayer.aabb.x, y:this.activePlayer.aabb.y};
    }

    resetMainPlayer(){
        this.activePlayer.aabb.x = MyScreen.windowWidth / 2;
        this.activePlayer.aabb.y = lavaHeight - 100;
    }

    setGameManager(gameManager: GameManager){
        this.gameManager = gameManager;
    }

    update(deltaTime: number){
        this.players.forEach ((player: Player) => {
            if (!player) { console.log("There is no player"); return 0; }
            Collisions.checkCollisions(player, MyScreen.getWindowDimens(), this.gameManager.getAllEntities(), deltaTime);
            
            if (player.active && !player.spectator) {
                this.physics.applyPhysics(player, deltaTime);
                player.handleKeyPress(KeyboardManager.keys); // only the active player responds to keyboard events
            }

            player.updateIndex(deltaTime);
        });
    }

    draw(ctx: any, camera: Camera){
        this.players.forEach((player: Player) => {
            if (!player) { return 0; }
            player.draw(ctx, camera);

            if (player.spectator && this.players.length > 0){
                // camera.entityToFollow = this.players[this.players.length-1];
                this.players.forEach((player) => {
                    if (!player.dead) this.camera.entityToFollow = player;
                });
            } else if (player.active) {
                camera.entityToFollow = player;
            }
        });
    }

    // If game becomes too laggy, update and draw might have to be combined (we are now looping twice)
    
    setSpectatorStatus(toggle: boolean){
        if (toggle){ // spectator mode needs to be enabled
            this.activePlayer.spectator = true;
        } else {
            this.activePlayer.spectator = false;
        }
    }
}