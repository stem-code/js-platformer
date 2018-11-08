class Renderer {
    public canvas;
    public ctx;
    public camera;
    public platformManager;
    public playerManager;
    public diffCounter;

    constructor(canvasId, platformManager, playerManager, camera){        
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = MyScreen.windowWidth;
        this.canvas.height = MyScreen.windowHeight;
        this.ctx = this.canvas.getContext("2d");

        this.camera = camera;

        this.platformManager = platformManager;
        this.playerManager = playerManager;
    }

    clear(){
        this.ctx.fillStyle = "#222222";
        this.ctx.fillRect(0, 0, MyScreen.windowWidth, MyScreen.windowHeight);
    }

    render(entityManager){
        this.clear();

        this.camera.update();
        
        entityManager.draw(this.ctx, this.camera);

        this.platformManager.draw(this.ctx, this.camera);
        this.playerManager.draw(this.ctx, this.camera);

        drawWalls(this.ctx, MyScreen.windowWidth, MyScreen.windowHeight, this.camera);

        drawLava(this.ctx, MyScreen.windowWidth, MyScreen.windowHeight, this.camera);

        this.diffCounter++;
    }
}
