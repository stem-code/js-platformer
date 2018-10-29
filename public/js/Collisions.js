var Collisions = function() { // Basically a static class (this has not yet been optimized)
    this.checkCollisions = function(entity, screenDimens, entitiesToCheck, time){
        var collisionList = [];
        time = time / 1000;

        if (entity.active) entitiesToCheck.forEach(checkEntity => {
            if (entity == checkEntity) { return []; } // Prevent entity from colliding with itself.
            // AABB collision check.
            if (entity.posX < checkEntity.posX + checkEntity.width && entity.posX + entity.width > checkEntity.posX
                && entity.posY < checkEntity.posY + checkEntity.height && entity.posY + entity.height > checkEntity.posY) {
                var winningSide;
                var winningDelta;
                var winningActions = function(){};
                entity.onCollision();

                if (entity.active && (entity.posX+entity.width)-checkEntity.posX <= (checkEntity.posX+checkEntity.width)-(entity.posX)){
                    winningSide = 2; // right side
                    winningDelta = (entity.posX+entity.width)-checkEntity.posX; 
                    
                    winningActions = function(){  
                        entity.posX = checkEntity.posX-entity.width;
                        entity.movementVector[0] *= -1; 
                    }
                } else if (entity.active) {
                    winningSide = 4; // left side
                    winningDelta = (checkEntity.posX+checkEntity.width)-(entity.posX);
                    
                    winningActions = function(){
                        entity.movementVector[0] *= -1;
                        entity.posX = checkEntity.posX+checkEntity.width;
                    }
                }

                if (entity.active && (entity.posY+entity.height)-checkEntity.posY <= (checkEntity.posY+checkEntity.height)-(entity.posY) && (entity.posY+entity.width)-checkEntity.posY <= Math.abs(winningDelta)){
                    winningSide = 1;
                    winningDelta = (entity.posY+entity.height)-checkEntity.posY;
                    winningActions = function(){
                        entity.posY = checkEntity.posY-entity.height-1;
                        if (Math.abs(entity.movementVector[1] < 12)){
                            entity.movementVector[1] = -9.8*50*time;
                        } else {
                            entity.movementVector[1] *= -0.7;
                        }
                    }
                    // top side
                } else if (entity.active && (checkEntity.posY+checkEntity.height)-(entity.posY) <= Math.abs(winningDelta)){
                    winningSide = 3;
                    winningDelta = (checkEntity.posY+checkEntity.height)-(entity.posY);
                    entity.jumping = true;
                    
                    winningActions = function(){
                        entity.posY = checkEntity.posY+checkEntity.height+1;
                        entity.movementVector[1] *= -0.7;
                    }
                }

                winningActions();
                
                // if (entity.active) console.log(["top", "right", "bottom", "left"][winningSide-1], winningDelta);
            }
        });

        if (entity.active && entity.posY+entity.height >= screenDimens[1]){
            try {
                entity.jumping = false;
                // console.log(entity.posY+entity.height);
                if (entity.movementVector[1] < 50 ){
                    entity.movementVector[1] = -9.8*50*time;
                } else {
                    entity.posY = screenDimens[1]-entity.height;
                    entity.movementVector[1] = entity.movementVector[1]*-0.4;
                }
            } catch {
                console.log("ERROR");
            }
        }

        if (entity.active && entity.posX < 0 || entity.posX + entity.width > screenDimens[0]){
            try {
                entity.posX = entity.posX > 0 ? screenDimens[0]-entity.width : 1;
            entity.movementVector[0] *= -1;
            } catch {
            }
        }
        return collisionList;
    }
}

Collisions = new Collisions(); // static workaround (var was explicitly not put in)