class GameManager {
    public playerManager;
    public platformManager;
    public UI;
    public gameStarted;
    public win;
    public lose;
    public allEntities;
    public spectatorViewEnabled;
    public winStats;

    constructor(playerManager, platformManager, UI){
        this.playerManager = playerManager;
        this.platformManager = platformManager;

        this.playerManager.gameManager = this;

        this.UI = UI;
        this.gameStarted = false;

        this.win = false;
        this.lose = false;

        this.allEntities = [];

        this.spectatorViewEnabled = false;

        this.winStats = {
            "lose":"You Lost!",
            "win":"You Won!"
        }
    }

    reset(){
        this.win = false;
        this.lose = false;
    }
    
    update(){
        var player = this.playerManager.activePlayer;

        if (player.getAABB().y < -5000){
            this.win = true;
            this.lose = false;

            this.UI.setWinStatus(this.winStats["win"], 2);
        }

        if (player.getAABB().y+(player.getAABB().height/2) > MyScreen.windowHeight-lavaHeight && !this.spectatorViewEnabled){
            //alert(player.aabb.y+(player.height/2))
            //alert(Screen.windowHeight-lavaHeight)
            this.win = false;
            this.lose = true;

            this.UI.setWinStatus(this.winStats["lose"], 2);
        }
    }

    getAllEntities(){ // Get all of the Entities in the Game
        return this.playerManager.players.concat(this.platformManager.platforms);
    }

    spectatorView(toggle){
        if (toggle){
            this.spectatorViewEnabled = true;
            this.playerManager.setSpectatorStatus(true);
        } else {
            this.spectatorViewEnabled = false;
            this.playerManager.setSpectatorStatus(false);
        }
    }
}