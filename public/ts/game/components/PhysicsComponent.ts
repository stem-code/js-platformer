class PhysicsComponent extends Component {
    public static gravityVector: [number, number];
    public normalVector: [number, number] = [0, 0]; // By default there is only gravity acting on the object (no normal)
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
            this.velocity[0] += (PhysicsComponent.gravityVector[0] + this.normalVector[0]) * delta;
            this.velocity[1] += (PhysicsComponent.gravityVector[1] + this.normalVector[1]) * delta;
        }
        
        this.getEntity().getAABB().move(this.velocity[0] * delta, this.velocity[1] * delta);
        this.normalVector = [0, 0];
    }

    public gravityNormalize(){ // Set the normal force to the opposite of gravity
        this.normalVector[1] = PhysicsComponent.gravityVector[1] * -1;
    }

    public deNormalize(){ // Remove all normal forces
        this.normalVector = [0, 0];
    }
}