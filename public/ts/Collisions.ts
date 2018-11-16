class Collisions { // Basically a static class (this has not yet been optimized)
    public static checkCollisions = function(entity: Entity, screenDimens:any, entitiesToCheck: Entity[], time: number){
        var collisionList: any[] = [];
        time = time / 1000;

        if (entity.active) entitiesToCheck.forEach(checkEntity => {
            if (entity == checkEntity) { return []; } // Prevent entity from colliding with itself.
            // AABB collision check.
            if (entity.aabb.x < checkEntity.aabb.x + checkEntity.aabb.width && entity.aabb.x + entity.aabb.width > checkEntity.aabb.x
                && entity.aabb.y < checkEntity.aabb.y + checkEntity.aabb.height && entity.aabb.y + entity.aabb.height > checkEntity.aabb.y) {
                var winningSide;
                var winningDelta;
                var winningActions = function(){};
                entity.onCollision(checkEntity);

                if (entity.active && (entity.aabb.x+entity.aabb.width)-checkEntity.aabb.x <= (checkEntity.aabb.x+checkEntity.aabb.width)-(entity.aabb.x)){
                    winningSide = 2; // right side
                    winningDelta = (entity.aabb.x+entity.aabb.width)-checkEntity.aabb.x; 
                    
                    winningActions = function(){  
                        entity.aabb.x = checkEntity.aabb.x-entity.aabb.width;
                        entity.velocity[0] *= -1; 
                    }
                } else if (entity.active) {
                    winningSide = 4; // left side
                    winningDelta = (checkEntity.aabb.x+checkEntity.aabb.width)-(entity.aabb.x);
                    
                    winningActions = function(){
                        entity.velocity[0] *= -1;
                        entity.aabb.x = checkEntity.aabb.x+checkEntity.aabb.width;
                    }
                }

                if (entity.active && (entity.aabb.y+entity.aabb.height)-checkEntity.aabb.y <= (checkEntity.aabb.y+checkEntity.aabb.height)-(entity.aabb.y) && (entity.aabb.y+entity.aabb.width)-checkEntity.aabb.y <= Math.abs(winningDelta)){
                    winningSide = 1;
                    winningDelta = (entity.aabb.y+entity.aabb.height)-checkEntity.aabb.y;
                    winningActions = function(){
                        entity.aabb.y = checkEntity.aabb.y-entity.aabb.height-1;
                        if (Math.abs(entity.velocity[1]) < 12){
                            entity.velocity[1] = -9.8*50*time;
                        } else {
                            entity.velocity[1] *= -0.7;
                        }
                    }
                    // top side
                } else if (entity.active && (checkEntity.aabb.y+checkEntity.aabb.height)-(entity.aabb.y) <= Math.abs(winningDelta)){
                    winningSide = 3;
                    winningDelta = (checkEntity.aabb.y+checkEntity.aabb.height)-(entity.aabb.y);
                    entity.jumping = true;
                    
                    winningActions = function(){
                        entity.aabb.y = checkEntity.aabb.y+checkEntity.aabb.height+1;
                        entity.velocity[1] *= -0.7;
                    }
                }

                winningActions();
                
                // if (entity.active) console.log(["top", "right", "bottom", "left"][winningSide-1], winningDelta);
            }
        });

        if (entity.active && entity.aabb.y+entity.aabb.height >= screenDimens[1]){
            entity.jumping = false;
            try {
                // console.log(entity.aabb.y+entity.aabb.height);
                if (entity.velocity[1] < 50 ){
                    entity.velocity[1] = -9.8*50*time;
                } else {
                    entity.aabb.y = screenDimens[1]-entity.aabb.height;
                    entity.velocity[1] = entity.velocity[1]*-0.4;
                }
            } catch {
                console.log("ERROR");
            }
        }

        if (entity.active && entity.aabb.x < 0 || entity.aabb.x + entity.aabb.width > wallWidth){
            try {
                entity.aabb.x = entity.aabb.x > 0 ? wallWidth-entity.aabb.width : 1;
                entity.velocity[0] *= -1;
                // entity.onCollision({tag:"wall"});
            } catch {
            }
        }
        return collisionList;
    }
}