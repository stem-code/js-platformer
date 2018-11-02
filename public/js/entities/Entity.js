class Entity {
    constructor(x, y, width, height, spriteSheet, color, gravityEnabled){
        this.posX = x;
        this.posY = y;
        this.width = width;
        this.height = height;

        this.spriteSheet = spriteSheet;
        this.index = {xIndex:0, yIndex:0};
        this.color = color || "#3F51B5";

        this.gravityEnabled = gravityEnabled || true;

        this.forces = [0, 0];
        this.active = false;
    }

    draw(ctx, player){
        player = player || {posX: 0, posY: 0};

        var centerX = (Screen.windowWidth+player.width)/2;
        var centerY = (Screen.windowHeight+player.height)/2;

        if (this.spriteSheet != null) {
            this.spriteSheet.drawSprite(ctx, this.index.xIndex, this.index.yIndex, this.posX-player.posX+centerX, this.posY-player.posY+centerY, this.width, this.height);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.posX-player.posX+centerX, this.posY-player.posY+centerY, this.width, this.height);
        }
    }

    updateIndex(delta) {
    }

    onCollision() { // parameters could be various collision information
    }
}