class Entity {
    constructor(aabb, color, gravityEnabled){
        this.aabb = aabb
        this.color = color || "#3F51B5";
        this.gravityEnabled = gravityEnabled || true;
        this.movementVector = [0, 0];
    }

    update(deltaTime){
        //this.posY -= this.cameraOffset.y;
    }

    draw(renderer){
        renderer.drawAABB(this.aabb, this.color);
    }

    onCollision() { // parameters could be various collision information

    }
}