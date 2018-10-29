class GameManager {
    constructor(playerManager, platformManager, UI){
        this.playerManager = playerManager;
        this.platformManager = platformManager;

        this.playerManager.gameManager = this;

        this.UI = UI;

        this.win = false;
        this.lose = false;

        this.allEntities = [];

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

        if (player.posY < -5000){
            this.win = true;
            this.lose = false;

            this.UI.setWinStatus(this.winStats["win"], 2);
        }

        if (player.posY+(player.height/2) > Screen.windowHeight-lavaHeight){
            this.win = false;
            this.lose = true;

            this.UI.setWinStatus(this.winStats["lose"], 2);
        }
    }

    getAllEntities(){ // Get all of the Entities in the Game
        return this.playerManager.players.concat(this.platformManager.platforms);
    }
}