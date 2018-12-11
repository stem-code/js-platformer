class AnimationComponent extends Component {
    public spriteSheet: SpriteSheet;
    private color: any;
    public spriteIndex: [number, number];

    constructor(spriteSheet: SpriteSheet, color: any, spriteIndex: [number, number]) {
        super();
        this.spriteSheet = spriteSheet;
        this.spriteSheet.tintImage(color);
        this.spriteIndex = spriteIndex;
    }

    public update(delta: number) {
    }

    public draw(ctx: any, camera: Camera) {
        this.spriteSheet.drawSprite(ctx, this.spriteIndex[0], this.spriteIndex[1], this.getEntity().getAABB().x + camera.offsetX, this.getEntity().getAABB().y + camera.offsetY, this.getEntity().getAABB().width, this.getEntity().getAABB().height);
    }

    public setTint(color: any) {
        this.spriteSheet.tintImage(color);
    }
}