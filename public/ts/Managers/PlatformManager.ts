class PlatformManager { // Manages Platform Object (creation, deletion, etc.)
    public platforms: Platform[];
    public entityManager: EntityManager;
    public platformCount: number = 55;

    constructor(){
        this.platforms = [];
    }

    clearPlatforms(){ // delete all platforms
        this.platforms = [];
    }

    addPlatform(platform: Platform){ // Add a single Platform
        this.entityManager.addEntity(platform);
    }

    mapGenerate(map: any) { // generate all necessary Platforms FROM a map (server)
        map.forEach((platformX: number, idx: number) => {
            var currPlat = new Platform(platformX, MyScreen.windowHeight-90-(idx*100), 300);
            this.platforms.push(currPlat);
            // renderer.createEntity(currPlat);
        });
    }

    autoGenerate(numPlatforms: number = 55, platformWidth: number = 300){ // Generate platforms (a map) without a server-provided map
        this.platformCount = numPlatforms;
        var generatedMap = []; // The generatedMap will contain the x position of each platform (since the y values are always the same)
        var lastPlatformPosition = Math.floor(Math.random()*(wallWidth/2));

        for (var x=0; x<numPlatforms; x++){
            // var difference = Math.random()*(wallWidth)-(wallWidth/2); // The difference between each platform's x value (to make sure they are not too far apart)
            
            // var platformX = Screen.ensureScreenBounds(lastPlatformPosition + difference, platformWidth); // make sure that platform is generated inside screen bounds

            // lastPlatformPosition += difference;
            // if (lastPlatformPosition <= 0 || lastPlatformPosition+300 > wallWidth){
            //     var platformX = (-1*difference);
            // } else {
            //     var platformX = lastPlatformPosition;
            // }

            var platformX = Math.floor(Math.random()*(wallWidth-300))

            var platformY = MyScreen.windowHeight-90-(x*100);

            var platform = new Platform(platformX, platformY, 300); // Add the difference in x value to the last platform's position
            this.platforms.push(platform);
            generatedMap.push(platformX);
            lastPlatformPosition = platformX;
        }

        return generatedMap;
    }

    update(){ } // Update function (not really any updating yet)

    draw(ctx: any, camera: Camera){
        this.platforms.forEach(platform => {
            platform.draw(ctx, camera);
        });
    }
}