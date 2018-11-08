class Physics {
    public gravity;

    constructor(){
        this.gravity = 9.8; 
    }

    applyPhysics(entity, time){ //Time: time since last frame (ms)
        if (!entity.velocity){ entity.velocity = [0, -1] };
        if (!entity.nextMovement) { entity.nextMovement = entity.velocity };
        if (!time) { time = 0; }

        // console.log(entity.velocity);

        // console.log(time);
        // console.log(this.gravity);

        // entity.velocity = entity.gravityEnabled ? entity.nextMovement : entity.velocity;

        time = time/1000;
        
        if (entity.gravityEnabled){
            var initialYVelocity = entity.velocity[1];
            // var finalYVelocity = (initialYVelocity*time)+(0.5*(this.gravity*10000)*time*time);
            var finalYVelocity = initialYVelocity;

            finalYVelocity+=this.gravity*50*time;
            entity.velocity[1] = finalYVelocity;
        }

        // console.log(entity.aabb.x);
        entity.aabb.x = entity.aabb.x + entity.velocity[0]*time;
        entity.aabb.y = entity.aabb.y + entity.velocity[1]*time;

        // console.log(entity.aabb.y);
    }
}