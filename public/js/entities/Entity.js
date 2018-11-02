class Entity {
    constructor(x, y, width, height, color, gravityEnabled){
        this.posX = x;
        this.posY = y;
        this.width = width;
        this.height = height;

        this.color = color || "#3F51B5";
        this.gravityEnabled = gravityEnabled || true;

        this.forces = [0, 0];
        this.active = false;
    }

    draw(ctx, player){
        player = player || {posX: 0, posY: 0};

        var centerX = (Screen.windowWidth+player.width)/2;
        var centerY = (Screen.windowHeight+player.height)/2;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX-player.posX+centerX, this.posY-player.posY+centerY, this.width, this.height);
    }

    onCollision() { // parameters could be various collision information

    }
}