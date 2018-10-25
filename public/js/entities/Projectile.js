class Projectile extends Entity {
    constructor(x, y, color, gravity, velocityX, velocityY) {
        super(x, y, 100, 100, 1, color, gravity);
        this.forces = [velocityX, velocityY];
    }

    onCollision() {
        // destroy this
        
    }
}