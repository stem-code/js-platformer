class Renderer {
    constructor(canvasId, platformManager, playerManager){        
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = Screen.windowWidth;
        this.canvas.height = Screen.windowHeight;

        this.platformManager = platformManager;
        this.playerManager = playerManager;

        this.ctx = this.canvas.getContext("2d");

        this.entities = [];

        this.diffCounter = 0;
        this.activePlayer;

        var that = this;
    }

    entityUpdate(entity, deltaTime){
        var collisionStatus = this.collisions.checkCollisions(entity, this.windowDimens, this.entitiesToCheck, deltaTime);
        // this.physics.applyCollisions(entity, collisionStatus);
        //console.log(this.activePlayer);
        if (entity.active){
            updatePlayerPos({ x: entity.posX, y: entity.posY-renderer.windowDimens[1] });
            this.activePlayer = entity;

            if (this.activePlayer != null) {
                this.activePlayer.handleKeyPress(this.keys);
            }
        } else if (entity.active){
            this.entities.splice(this.entities.indexOf(entity), 1);
            console.log("Entity was flagged, deleting it.")
        }

        if (entity.active && entity.posY < -5000){
            onWin();
        }

        if (entity.active && entity.posY+(entity.height/2) > this.windowDimens[1]-lavaHeight){
            console.log(this.windowDimens[1]-lavaHeight)
            onLose();
        }

        this.physics.applyPhysics(entity, deltaTime);
        entity.posY -= this.cameraOffset.y;

        entity.draw(this.ctx, this.activePlayer, this.windowDimens);
        // console.log(entity.posY);
        // Collisions.checkCollision(entity.boundingBox);
    }
    
    createEntity(entity){
        this.entities.push(entity);
    }

    clear(){
        this.ctx.fillStyle = "#222222";
        this.ctx.fillRect(0, 0, Screen.windowWidth, Screen.windowHeight);
    }

    update(deltaTime){
        // this.entitiesToCheck = this.entities;

        if (this.diffCounter % 10 == 0){
            
        }

        // console.log(deltaTime);
        this.clear();
        // console.log(this.windowDimens);
        // this.entities.forEach(entity => {
        //     this.entityUpdate(entity, deltaTime);
        // });

        this.playerManager.draw(this.ctx);
        this.platformManager.draw(this.ctx, this.playerManager.activePlayer);

        drawWalls(this.ctx, Screen.windowWidth, Screen.windowHeight, this.playerManager.activePlayer);

        drawLava(this.ctx, Screen.windowWidth, Screen.windowHeight, this.playerManager.activePlayer);

        this.diffCounter++;
    }
}
