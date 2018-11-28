class PlayerAnimationComponent extends AnimationComponent {
    private physicsComponent: PhysicsComponent = null;
    private time: number = 0;
    private timePerFrame: number;
    private currentXIndex: number = 0;

    constructor(spriteSheet: SpriteSheet, color: any, timePerFrame: number) {
        super(spriteSheet, color, [0, 0]);
        this.timePerFrame = timePerFrame;
    }

    public update(delta: number) {
        if (this.physicsComponent == null) {
            this.physicsComponent = this.getEntity().getComponent<PhysicsComponent>("PhysicsComponent");
        }
        if (Math.abs(this.physicsComponent.velocity[1]) < 150) {
            this.spriteIndex[1] = 0;
            if (delta > 0) {
                this.time += Math.floor(delta) * Math.abs(this.physicsComponent.velocity[0]);
            }
            if (this.time > this.timePerFrame) {
                this.time = 0.0;
                this.currentXIndex++;
                if (this.currentXIndex > this.spriteSheet.numIndices.numX - 1) {
                    this.currentXIndex = 0;
                }
            }
            if (Math.abs(this.physicsComponent.velocity[0]) < 50) {
                this.currentXIndex = 0
            }
            this.spriteIndex[0] = this.currentXIndex;
        } else {
            this.spriteIndex[1] = 2;
            if (this.physicsComponent.velocity[1] > 250) {
                this.spriteIndex[0] = 3;
            } else if (this.physicsComponent.velocity[1] >= 150) {
                this.spriteIndex[0] = 2;
            } else if (this.physicsComponent.velocity[1] < -250) {
                this.spriteIndex[0] = 1;
            } else if (this.physicsComponent.velocity[1] <= -150) {
                this.spriteIndex[0] = 0;
            }
        }
        if (this.physicsComponent.velocity[0] < 0) {
            this.spriteIndex[1]++;
        }
    }
}