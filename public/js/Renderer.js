var playerSpriteSheets = [new SpriteSheet("/res/js-platformer-slime-sprites.png", 16, 16),
                            new SpriteSheet("/res/js-platformer-test-sprites.png", 16, 16)];

class Renderer {
    constructor(canvasId, platformManager, playerManager, camera){        
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = Screen.windowWidth;
        this.canvas.height = Screen.windowHeight;
        this.ctx = this.canvas.getContext("2d");

        this.camera = camera;

        this.platformManager = platformManager;
        this.playerManager = playerManager;
    }

    clear(){
        this.ctx.fillStyle = "#222222";
        this.ctx.fillRect(0, 0, Screen.windowWidth, Screen.windowHeight);
    }

    render(entityManager){
        this.clear();

        this.camera.update();
        
        entityManager.draw(this.ctx, this.camera);

        this.playerManager.draw(this.ctx, this.camera);
        this.platformManager.draw(this.ctx, this.camera);
        

        drawWalls(this.ctx, Screen.windowWidth, Screen.windowHeight, this.playerManager.activePlayer);

        drawLava(this.ctx, Screen.windowWidth, Screen.windowHeight, this.playerManager.activePlayer);

        this.diffCounter++;
    }
}
