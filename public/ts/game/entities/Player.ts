class Player extends Entity {
    constructor(aabb: AABB, userName: string, appearance: {spriteSheet:number, rgbColor: number[]}) {
        super(aabb, userName);
        super.addComponents([new PhysicsComponent([0, 0], true),
                            new CollisionComponent(),
                            new PlayerControlComponent(),
                            new PlayerAnimationComponent(new SpriteSheet(playerSpriteSheets[appearance.spriteSheet], 16, 16), appearance.rgbColor, 10)]);
    }
}