class Entity {
    constructor(x, y, width, height, mass, color, gravityEnabled){
        this.posX = x;
        this.posY = y;
        this.width = width;
        this.height = height;

        this.mass = mass;
        this.color = color || "#3F51B5";
        this.gravityEnabled = gravityEnabled || true;

        this.forces = [0, 0];
        this.active = false;
    }

    draw(ctx, player, screenDimens){
        console.log(player);
        player = player || {posX: 0, posY: 0};

        var centerX = (screenDimens[0]+player.width)/2;
        var centerY = (screenDimens[1]+player.height)/2;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX-player.posX+centerX, this.posY-player.posY+centerY, this.width, this.height);
    }

    onCollision() { // parameters could be various collision information

    }
}