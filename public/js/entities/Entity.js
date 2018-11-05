class Entity {
    constructor(aabb, tag, spriteSheet, color, gravityEnabled){
        this.aabb = aabb
        this.tag = tag;

        this.spriteSheet = spriteSheet;
        this.index = {xIndex:0, yIndex:0};
        this.color = color || "#3F51B5";

        this.gravityEnabled = gravityEnabled || true;

        this.velocity = [0, 0];
        this.active = false;
    }

    draw(ctx, camera){
        player = player || {posX: 0, posY: 0};

        if (this.spriteSheet != null) {
            this.spriteSheet.changeColor(this.color);
            this.spriteSheet.drawSprite(ctx, this.index.xIndex, this.index.yIndex, this.aabb.x + camera.offsetX, this.aabb.y + camera.offsetY, this.aabb.width, this.aabb.height);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.aabb.x + camera.offsetX, this.aabb.y + camera.offsetY, this.aabb.width, this.aabb.height);
        }
    }

    updateIndex(delta) {
    }

    onCollision(entity) {
    }
}