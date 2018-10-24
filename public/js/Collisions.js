class Collisions {
    checkCollisions(entity, screenDimens, entitiesToCheck, time){
        // var hitmap = [[], [], [], []];
        var collisionList = [];
        time = time/1000;

        // console.log(entitiesToCheck);
        if (entity.active) entitiesToCheck.forEach(checkEntity => {
            // console.log(entity.posX, entity.posY, checkEntity.posX, checkEntity.posY)
            if (entity.posX == checkEntity.posX && entity.posY == checkEntity.posY) return [];
            if (
                entity.posX < checkEntity.posX + checkEntity.width && 
                entity.posX + entity.width > checkEntity.posX &&
                entity.posY < checkEntity.posY + checkEntity.height && 
                entity.posY + entity.height > checkEntity.posY
            ){ // a collision has occured (Basic AABB Equation)
                var winningSide;
                var winningDelta;
                var winningActions = function(){};
                entity.jumping = false;

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
                // collisionList.push({entity: checkEntity, });

                winningActions();
                
                if (entity.active) console.log(["top", "right", "bottom", "left"][winningSide-1], winningDelta);
            }
            

            // console.log(hitmap);
            // alert("9");
        });

        // alert("boo");

        // console.log(entity.posY+entity.height, screenDimens[1]);
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
                // hitmap[2].push(1);
                // hitmap[3].push(1);
            } catch {
                console.log("EERRORR");
            }
        }

        if (entity.active && entity.posX < 0 || entity.posX + entity.width > screenDimens[0]){
            try {
                entity.posX = entity.posX > 0 ? screenDimens[0]-entity.width : 1;
            entity.movementVector[0] *= -1;
            } catch {
            }
        }

        // return hitmap;
        return collisionList;
    }
}