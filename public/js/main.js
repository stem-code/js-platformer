window.requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60);}; // simulate calling code 60 

var renderer = new Renderer("main-canvas");

testEntity = new Player(1000, 100, 50, 50, 50, true, "#F44336");
testEntity.movementVector = [-200, 0];
renderer.createEntity(testEntity);
var level = 1;

initServer(renderer, function(generateMap, map, cb){
    if (generateMap){
        var generatedMap = [];

        var lastPlatformPosition = Math.floor(Math.random()*(renderer.windowDimens[0]-400));
        for (var x=0; x<20; x++){
            var difference = (Math.floor(Math.random()*2)-1)*(Math.random()*400)+75;
            renderer.createEntity(new Platform(Math.min(Math.max(lastPlatformPosition + difference, 0), renderer.windowDimens[1]), renderer.windowDimens[1]-90-(x*100), 300, 100));
            lastPlatformPosition = Math.min(Math.max(lastPlatformPosition + difference, 0), renderer.windowDimens[1]);
            // setTimeout(createEntities, 1000);
            generatedMap.push(Math.min(Math.max(lastPlatformPosition + difference, 0), renderer.windowDimens[1]));
        }

        cb(generatedMap);
    } else {
        console.log("Generating map from server data...");
        for (var x=0; x<20; x++){
            console.log("Got " + map[x], renderer.windowDimens[1]-90-(x*100));
            renderer.createEntity(new Platform(map[x], renderer.windowDimens[1]-90-(x*100), 300, 100));
            // setTimeout(createEntities, 1000);
        }
    }
});

function update(currTime) {
    renderer.update(currTime);
    window.requestAnimationFrame(update);
}

update();