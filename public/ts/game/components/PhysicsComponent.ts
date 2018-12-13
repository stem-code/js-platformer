class PhysicsComponent extends Component {
    public static gravityVector: [number, number];
    public velocity: [number, number];
    public gravityEnabled: boolean;

    constructor(velocity: [number, number], gravityEnabled:boolean) {
        super();
        this.velocity = velocity
        this.gravityEnabled = gravityEnabled;
    }

    public update(delta: number) {
        if (!delta) { delta = 0; }

        if (this.gravityEnabled) {
            this.velocity[0] += PhysicsComponent.gravityVector[0] * delta;
            this.velocity[1] += PhysicsComponent.gravityVector[1] * delta;
        }
        
        this.getEntity().getAABB().move(this.velocity[0] * delta, this.velocity[1] * delta)
    }
}