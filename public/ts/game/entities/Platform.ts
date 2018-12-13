class Platform extends Entity {
    constructor(aabb: AABB){
        super(aabb, "Platform");
        super.addComponents([
            new AnimationComponent(new SpriteSheet(playerSpriteSheets[1], 16, 16), [255, 0, 0], [0, 0])
        ]);
    }
}