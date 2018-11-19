class Flag extends Entity {
    constructor(x: number, y: number){
        super(new AABB(x, y, 50, 50), "flag", new SpriteSheet(flagSprites, 50, 50), undefined, false);
    }

    update(){

    }

    draw(){
        
    }
}