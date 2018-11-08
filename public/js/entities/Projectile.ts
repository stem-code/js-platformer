class Projectile extends Entity {

    constructor(x, y, color, gravity, velocityX, velocityY) {
        super(new AABB(x, y, 100, 100), null, "projectile", color, gravity);
        this.velocity = [velocityX, velocityY];
    }

    onCollision() {
        this.aabb.y = -99999 // destroy this
    }
}