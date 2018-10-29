    initServer(renderer, function(generateMap, map, cb){
        platformList.forEach(plat => {
            plat.flag = true;
            plat.posY = -10000;
        });

        platformList = [];

        if (generateMap){
            var generatedMap = [];
    
            var lastPlatformPosition = Math.floor(Math.random()*(renderer.windowDimens[0]-400));
            for (var x=0; x<numPlatforms; x++){
                var difference = (Math.floor(Math.random()*2)-1)*(Math.random()*400)+75;
                var currPlat = new Platform(Math.min(Math.max(lastPlatformPosition + difference, 0), renderer.windowDimens[1]), renderer.windowDimens[1]-90-(x*100), 300, 100);
                platformList.push(currPlat);
                renderer.createEntity(currPlat);
                lastPlatformPosition = Math.min(Math.max(lastPlatformPosition + difference, 0), renderer.windowDimens[1]);
                // setTimeout(createEntities, 1000);
                generatedMap.push(Math.min(Math.max(lastPlatformPosition + difference, 0), renderer.windowDimens[1]));
            }
    
            cb(generatedMap);
        } else {
            console.log("Generating map from server data...");
            for (var x=0; x<numPlatforms; x++){
                console.log("Got " + map[x], renderer.windowDimens[1]-90-(x*100));
                var currPlat = new Platform(map[x], renderer.windowDimens[1]-90-(x*100), 300, 100);
                platformList.push(currPlat);
                renderer.createEntity(currPlat);
                // setTimeout(createEntities, 1000);
            }
        }
    });