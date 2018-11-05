class Camera {
    constructor(entityToFollow) {
        this.entityToFollow = entityToFollow;
        this.update();
    }

    update() {
        var centerX = (Screen.windowWidth + this.entityToFollow.aabb.width) / 2;
        var centerY = (Screen.windowHeight + this.entityToFollow.aabb.height) / 2;
        this.offsetX = -this.entityToFollow.aabb.x + centerX;
        this.offsetY = -this.entityToFollow.aabb.y + centerY;
    }
}