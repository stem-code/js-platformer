class Collisions {

    checkCollisions(entity, screenDimens, entitiesToCheck, time){
        var collisionList = [];
        time = time / 1000;

        for (var i = 0;i < entitiesToCheck.length;i++) {
            if (entity == entitiesToCheck[i]) { return []; } // Prevent entity from colliding with itself.
            // AABB collision check.
            if (entity.aabb.x < entitiesToCheck[i].aabb.x + entitiesToCheck[i].aabb.width && entity.aabb.x + entity.aabb.width > entitiesToCheck[i].aabb.x
                && entity.aabb.y < entitiesToCheck[i].aabb.y + entitiesToCheck[i].aabb.height && entity.aabb.y + entity.aabb.height > entitiesToCheck[i].aabb.y) {
                var winningSide;
                var winningDelta;
                var winningActions = function(){};
                entity.onCollision();

                if ((entity.aabb.x+entity.aabb.width)-entitiesToCheck[i].aabb.x <= (entitiesToCheck[i].aabb.x+entitiesToCheck[i].aabb.width)-(entity.aabb.x)){
                    winningSide = 2; // right side
                    winningDelta = (entity.aabb.x+entity.aabb.width)-entitiesToCheck[i].aabb.x; 
                    
                    winningActions = function(){  
                        entity.aabb.x = entitiesToCheck[i].aabb.x-entity.aabb.width;
                        entity.movementVector[0] *= -1; 
                    }
                } else {
                    winningSide = 4; // left side
                    winningDelta = (entitiesToCheck[i].aabb.x+entitiesToCheck[i].aabb.width)-(entity.aabb.x);
                    
                    winningActions = function(){
                        entity.movementVector[0] *= -1;
                        entity.aabb.x = entitiesToCheck[i].aabb.x+entitiesToCheck[i].aabb.width;
                    }
                }

                if ((entity.aabb.y+entity.aabb.height)-entitiesToCheck[i].aabb.y <= (entitiesToCheck[i].aabb.y+entitiesToCheck[i].aabb.height)-(entity.aabb.y) && (entity.aabb.y+entity.aabb.width)-entitiesToCheck[i].aabb.y <= Math.abs(winningDelta)){
                    winningSide = 1;
                    winningDelta = (entity.aabb.y+entity.aabb.height)-entitiesToCheck[i].aabb.y;
                    winningActions = function(){
                        entity.aabb.y = entitiesToCheck[i].aabb.y-entity.aabb.height-1;
                        if (Math.abs(entity.movementVector[1] < 12)){
                            entity.movementVector[1] = -9.8*50*time;
                        } else {
                            entity.movementVector[1] *= -0.7;
                        }
                    }
                    // top side
                } else if ((entitiesToCheck[i].aabb.y+entitiesToCheck[i].aabb.height)-(entity.aabb.y) <= Math.abs(winningDelta)){
                    winningSide = 3;
                    winningDelta = (entitiesToCheck[i].aabb.y+entitiesToCheck[i].aabb.height)-(entity.aabb.y);
                    entity.jumping = true;
                    
                    winningActions = function(){
                        entity.aabb.y = entitiesToCheck[i].aabb.y+entitiesToCheck[i].aabb.height+1;
                        entity.movementVector[1] *= -0.7;
                    }
                }

                winningActions();
                
                console.log(["top", "right", "bottom", "left"][winningSide-1], winningDelta);
            }
        };

        if (entity.aabb.y+entity.aabb.height >= screenDimens[1]){
            try {
                entity.jumping = false;
                // console.log(entity.aabb.y+entity.aabb.height);
                if (entity.movementVector[1] < 50 ){
                    entity.movementVector[1] = -9.8*50*time;
                } else {
                    entity.aabb.y = screenDimens[1]-entity.aabb.height;
                    entity.movementVector[1] = entity.movementVector[1]*-0.4;
                }
            } catch {
                console.log("EERRORR");
            }
        }

        if (entity.aabb.x < 0 || entity.aabb.x + entity.aabb.width > screenDimens[0]){
            try {
                entity.aabb.x = entity.aabb.x > 0 ? screenDimens[0]-entity.aabb.width : 1;
            entity.movementVector[0] *= -1;
            } catch {
            }
        }
        return collisionList;
    }
}