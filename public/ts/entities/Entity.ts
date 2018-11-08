class Entity {
    public aabb: AABB;
    public tag: string;
    public components: Component[];

    public spriteSheet: SpriteSheet;
    public index: any;
    public color: string;
    public gravityEnabled: boolean;
    public velocity: [number, number];
    public active: boolean;

    constructor(aabb, tag, spriteSheet, color, gravityEnabled){
        this.aabb = aabb
        this.tag = tag;
        this.components = [];

        this.spriteSheet = spriteSheet;
        this.index = {xIndex:0, yIndex:0};
        this.color = color || [255, 0, 0];
        if (this.spriteSheet != null) {
            this.spriteSheet.tintImage(this.color);
        }

        this.gravityEnabled = gravityEnabled || true;

        this.velocity = [0, 0];
        this.active = false;
    }

    draw(ctx, camera){
        var player = player || {posX: 0, posY: 0};

        if (this.spriteSheet != null) {
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