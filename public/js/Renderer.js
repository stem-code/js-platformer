var screenFuncs = {
    clear: function(ctx, windowDimens){
        ctx.fillStyle = "#222222";
        ctx.fillRect(0, 0, windowDimens[0], windowDimens[1]);
    }
}

class Renderer {
    constructor(canvasId){
        var windowWidth = Math.max(
            document.documentElement["clientWidth"],
            document.body["scrollWidth"],
            document.documentElement["scrollWidth"],
            document.body["offsetWidth"],
            document.documentElement["offsetWidth"]
        );

        var windowHeight = Math.max(
            document.documentElement["clientHeight"],
            document.body["scrollHeight"],
            document.documentElement["scrollHeight"],
            document.body["offsetHeight"],
            document.documentElement["offsetHeight"]
        )

        this.fpsMeter = document.getElementById("fps");
        
        this.windowDimens = [windowWidth, windowHeight];
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = windowWidth;
        this.canvas.height = windowHeight;

        this.ctx = this.canvas.getContext("2d");
        this.physics = new Physics();
        this.collisions = new Collisions();

        this.entities = [];

        this.keys = [];
        this.cameraOffset = {x:0, y:0};

        this.diffCounter = 0;

        var that = this;
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (that.keys.indexOf(evt.keyCode) == -1) that.keys.push(evt.keyCode);
        };
        
        document.onkeyup = function(evt) {
            evt = evt || window.event;
            if (that.keys.indexOf(evt.keyCode) > -1){
                that.keys.splice(that.keys.indexOf(evt.keyCode), 1);
            }
        };
    }

    entityUpdate(entity, deltaTime){
        var collisionStatus = this.collisions.checkCollisions(entity, this.windowDimens, this.entitiesToCheck, deltaTime);
        // this.physics.applyCollisions(entity, collisionStatus);
        entity.handleKeyPress(this.keys);

        if (entity.active){
            updatePlayerPos({ x: entity.posX, y: entity.posY-renderer.windowDimens[1] });
        }

        if (entity.active && entity.posY < 0){
            onWin();
        }

        if (entity.active && entity.posY+(entity.height/2) > this.windowDimens[1]-lavaHeight){
            console.log(this.windowDimens[1]-lavaHeight)
            onLose();
        }

        this.physics.applyPhysics(entity, deltaTime);
        entity.posY -= this.cameraOffset.y;

        entity.draw(this.ctx);
        
        // console.log(entity.posY);
        // Collisions.checkCollision(entity.boundingBox);
    }
    
    createEntity(entity){
        this.entities.push(entity);
    }

    update(currentTime){
        if (!this.startTime) this.startTime = currentTime;
        if (!this.lastTime) this.lastTime = currentTime;
        var deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.startTime += currentTime;

        this.entitiesToCheck = this.entities;

        if (this.diffCounter % 10 == 0){
            this.fpsMeter.innerHTML = (1000/deltaTime).toFixed(0);
        }

        // console.log(deltaTime);
        screenFuncs.clear(this.ctx, this.windowDimens);
        // console.log(this.windowDimens);
        this.entities.forEach(entity => {
            this.entityUpdate(entity, deltaTime);
        });

        drawLava(this.ctx, this.windowDimens[0], this.windowDimens[1]);

        this.diffCounter++;
    }
}