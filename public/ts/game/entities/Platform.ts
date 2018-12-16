class Platform extends Entity {
    constructor(aabb: AABB){
        super(aabb, "Platform");
        super.addComponents([
            new BoxSpriteComponent()
        ]);
    }
}