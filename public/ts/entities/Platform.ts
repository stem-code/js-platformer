class Platform extends Entity {
    public gravityEnabled: boolean;
    // public color: string = [[244, 67, 3], [198, 40, 40], [193, 28, 28]][Math.floor(Math.random()*3)]

    constructor(x: number, y: number, width: number){
        super(new AABB(x, y, width, 20), "platform", new SpriteSheet(platformSprites[Math.floor(Math.random()*platformSprites.length)], 60, 4), [[244, 67, 3], [198, 40, 40], [193, 28, 28], [213, 0, 0], [255, 87, 34]][Math.floor(Math.random()*6)], false);

        // this.spriteSheet = ;
        // this.spriteSheet.tintImage(this.color);

        this.gravityEnabled = false;
    }
}