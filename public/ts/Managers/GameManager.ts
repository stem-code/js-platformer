class GameManager {
    public playerManager: PlayerManager;
    public platformManager: PlatformManager;
    public UI: UIManager;
    public gameStarted: boolean;
    public win: boolean;
    public lose: boolean;
    public allEntities: Entity[];
    public spectatorViewEnabled: boolean;
    public winStats: {[key: string]: string};

    constructor(playerManager: PlayerManager, platformManager: PlatformManager, UI: UIManager){
        this.playerManager = playerManager;
        this.platformManager = platformManager;

        this.playerManager.setGameManager(this);

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

        try {
            // console.log(player.aabb.y, this.platformManager.platforms[this.platformManager.platforms.length-1].aabb.y);

        
            if (player.aabb.y < this.platformManager.platforms[this.platformManager.platforms.length-1].aabb.y){
                this.win = true;
                this.lose = false;

                this.UI.setWinStatus(this.winStats["win"], 2);
            }
        } catch(e){ }

        if (player.aabb.y+(player.aabb.height/2) > MyScreen.windowHeight-lavaHeight && !this.spectatorViewEnabled){
            //alert(player.aabb.y+(player.height/2))
            //alert(Screen.windowHeight-lavaHeight)
            this.win = false;
            this.lose = true; 

            this.UI.setWinStatus(this.winStats["lose"], 2);
        }
    }

    getAllEntities(): Entity[]{ // Get all of the Entities in the Game
        return this.platformManager.platforms.concat(this.playerManager.players);
    }

    spectatorView(toggle: boolean){
        if (toggle){
            this.spectatorViewEnabled = true;
            this.playerManager.setSpectatorStatus(true);
        } else {
            this.spectatorViewEnabled = false;
            this.playerManager.setSpectatorStatus(false);
        }
    }
}