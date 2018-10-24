class Physics {
    constructor(){
        this.gravity = 9.8; 
    }

    applyPhysics(entity, time){ //Time: time since last frame (ms)
        if (!entity.movementVector){ entity.movementVector = [0, -1] };
        if (!entity.nextMovement) { entity.nextMovement = entity.movementVector };
        if (!time) { time = 0; }
        // console.log(entity.movementVector);

        // console.log(time);
        // console.log(this.gravity);

        // entity.movementVector = entity.gravityEnabled ? entity.nextMovement : entity.movementVector;

        time = time/1000;
        
        if (entity.gravityEnabled){
            var initialYVelocity = entity.movementVector[1];
            // var finalYVelocity = (initialYVelocity*time)+(0.5*(this.gravity*10000)*time*time);
            var finalYVelocity = initialYVelocity;

            finalYVelocity+=this.gravity*50*time;
            entity.movementVector[1] = finalYVelocity;
        }

        entity.posX = entity.posX + entity.movementVector[0]*time;
        entity.posY = entity.posY + entity.movementVector[1]*time;

        // console.log(entity.posY);
    }
}