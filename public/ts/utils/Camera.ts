class Camera {
    public entityToFollow;
    public offsetX;
    public offsetY;

    constructor(entityToFollow) {
        this.entityToFollow = entityToFollow;
        this.update();
    }

    update() {
        var centerX = (MyScreen.windowWidth + this.entityToFollow.aabb.width) / 2;
        var centerY = (MyScreen.windowHeight + this.entityToFollow.aabb.height) / 2;
        this.offsetX = -this.entityToFollow.aabb.x + centerX;
        this.offsetY = -this.entityToFollow.aabb.y + centerY;
    }
}