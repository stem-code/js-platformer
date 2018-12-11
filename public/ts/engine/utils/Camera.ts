class Camera {
    public entityToFollow: Entity;
    public offsetX: number;
    public offsetY: number;

    constructor(entityToFollow: Entity) {
        this.entityToFollow = entityToFollow;
        this.update();
    }

    update() {
        var centerX = (MyScreen.windowWidth + this.entityToFollow.getAABB().width) / 2;
        var centerY = (MyScreen.windowHeight + this.entityToFollow.getAABB().height) / 2;
        this.offsetX = -this.entityToFollow.getAABB().x + centerX;
        this.offsetY = -this.entityToFollow.getAABB().y + centerY;
    }
}