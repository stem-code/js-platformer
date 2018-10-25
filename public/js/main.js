window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60);}; // simulate calling code 60 

var renderer = new Renderer("main-canvas");
var physics = new Physics();
var collisions = new Collisions();
var entities = [];

function start(){
    document.getElementById("message-box").style = "display: none;"

    this.fpsMeter = document.getElementById("fps");
    this.diffCounter = 0;

    var player = new ActivePlayer(new AABB(1000, 100, 50, 50), "#F44336");
    player.movementVector = [-200, 0];
    entities.push(player);

    var platformList = [];
    
    initServer(renderer, function(generateMap, map, cb){
        platformList.forEach(plat => {
            plat.flag = true;
            plat.posY = -1000000000000000000;
        });

        platformList = [];

        if (generateMap){
            var generatedMap = [];
    
            var lastPlatformPosition = Math.floor(Math.random()*(renderer.windowDimens[0]-400));
            for (var x=0; x<20; x++){
                var difference = (Math.floor(Math.random()*2)-1)*(Math.random()*400)+75;
                var currPlat = new Platform(Math.min(Math.max(lastPlatformPosition + difference, 0), renderer.windowDimens[1]), renderer.windowDimens[1]-90-(x*100), 300, 100);
                platformList.push(currPlat);
                entities.push(currPlat);
                lastPlatformPosition = Math.min(Math.max(lastPlatformPosition + difference, 0), renderer.windowDimens[1]);
                // setTimeout(createEntities, 1000);
                generatedMap.push(Math.min(Math.max(lastPlatformPosition + difference, 0), renderer.windowDimens[1]));
            }
    
            cb(generatedMap);
        } else {
            console.log("Generating map from server data...");
            for (var x=0; x<20; x++){
                console.log("Got " + map[x], renderer.windowDimens[1]-90-(x*100));
                var currPlat = new Platform(map[x], renderer.windowDimens[1]-90-(x*100), 300, 100);
                platformList.push(currPlat);
                entities.push(currPlat);
                // setTimeout(createEntities, 1000);
            }
        }
    });
    
    function update(currentTime) {
        if (!this.startTime) this.startTime = currentTime;
        if (!this.lastTime) this.lastTime = currentTime;
        var deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.startTime += currentTime;

        if (this.diffCounter % 10 == 0){
            this.fpsMeter.innerHTML = (1000/deltaTime).toFixed(0);
        }

        renderer.updateCamera(player);

        entities.forEach(entity => {
            entity.update(deltaTime);
            entity.draw(renderer);
        });
        updatePlayerPos({ x: player.aabb.x, y: player.aabb.y-renderer.windowDimens[1] });
        this.entitiesToCheck = entities;
        var collisionStatus = collisions.checkCollisions(player, renderer.windowDimens, entitiesToCheck, deltaTime);
        //console.log("x: " + player.aabb.x + " y: " + player.aabb.y);
        if (player != null) {
            player.handleKeyPress(renderer.keys);
        }
        if (player.posY < -3000000){
            onWin();
        } else if (player.aabb.y+(player.aabb.height/2) > renderer.windowDimens[1]-lavaHeight){
            onLose();
        }
        physics.applyPhysics(player, deltaTime);
        renderer.drawAABB(new AABB(0, 0, 1000, 1000), "#8BC34A");

        drawLava(renderer.ctx, renderer.windowDimens[0], renderer.windowDimens[1], player);

        this.diffCounter++;
        renderer.updateDisplay();
        window.requestAnimationFrame(update);
    }
    
    update();
}
