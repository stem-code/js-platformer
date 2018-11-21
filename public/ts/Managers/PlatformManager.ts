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

    update(){ } // Update function (not really any updating yet)

    draw(ctx: any, camera: Camera){
        this.platforms.forEach(platform => {
            platform.draw(ctx, camera);
        });
    }
}