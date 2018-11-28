/*class Entity {
    private aabb: AABB;
    private tag: string;
    private components: Component[];

    public spriteSheet: SpriteSheet;
    public index: any;
    public color: any;
    public gravityEnabled: boolean;
    public velocity: [number, number];
    public active: boolean;

    constructor(aabb: AABB, tag: string, components: Component[], spriteSheet: SpriteSheet, color: any, gravityEnabled: boolean){
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

    draw(ctx: any, camera: Camera){
        if (this.spriteSheet != null) {
            this.spriteSheet.drawSprite(ctx, this.index.xIndex, this.index.yIndex, this.aabb.x + camera.offsetX, this.aabb.y + camera.offsetY, this.aabb.width, this.aabb.height);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.aabb.x + camera.offsetX, this.aabb.y + camera.offsetY, this.aabb.width, this.aabb.height);
        }
    }

    updateIndex(delta: number) {
    }

    onCollision(entity: Entity) {
    }


}*/