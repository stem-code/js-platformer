class Projectile extends Entity {
    constructor(x, y, color, gravity, velocityX, velocityY) {
        super(x, y, 100, 100, "projectile", color, gravity);
        this.forces = [velocityX, velocityY];
    }

    onCollision() {
        this.posY = -99999 // destroy this
        
    }
}