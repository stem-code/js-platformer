var playerSpriteSheets = [new SpriteSheet("/res/js-platformer-test-sprites.png", 16, 16)];

class Renderer {
    constructor(canvasId, platformManager, playerManager){        
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = Screen.windowWidth;
        this.canvas.height = Screen.windowHeight;

        this.platformManager = platformManager;
        this.playerManager = playerManager;

        this.ctx = this.canvas.getContext("2d");
    }

    clear(){
        this.ctx.fillStyle = "#222222";
        this.ctx.fillRect(0, 0, Screen.windowWidth, Screen.windowHeight);
    }

    update(deltaTime){
        this.clear();

        this.playerManager.draw(this.ctx);
        this.platformManager.draw(this.ctx, this.playerManager.activePlayer);

        drawWalls(this.ctx, Screen.windowWidth, Screen.windowHeight, this.playerManager.activePlayer);

        drawLava(this.ctx, Screen.windowWidth, Screen.windowHeight, this.playerManager.activePlayer);

        this.diffCounter++;
    }
}
