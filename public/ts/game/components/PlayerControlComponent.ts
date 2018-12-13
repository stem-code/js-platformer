class PlayerControlComponent extends Component {
    private pressMap: any;
    private physicsComponent: PhysicsComponent;
    private jumping: boolean;

    constructor() {
        super();
        var that = this;

        function jump(){
            if (!that.jumping){ // check if already has jumped
                that.physicsComponent.velocity[1] = -350;
                that.physicsComponent.gravityEnabled = true;
                that.jumping = true; // we are now jumping
            }
        }

        this.pressMap = { // Player controls
            87: jump, // w
            38: jump, // up arrow
            32: jump, // space
            83: function() { that.physicsComponent.velocity[1] += 20 }, // s
            40: function() { that.physicsComponent.velocity[1] += 20 }, // down arrow

            65: function() { that.physicsComponent.velocity[0] = Math.max(that.physicsComponent.velocity[0] - 10, -1000) }, // a
            37: function() { that.physicsComponent.velocity[0] = Math.max(that.physicsComponent.velocity[0] - 10, -1000) }, // left arrow
            68: function() { that.physicsComponent.velocity[0] = Math.min(that.physicsComponent.velocity[0] + 10, 1000) },  // d 
            39: function() { that.physicsComponent.velocity[0] = Math.min(that.physicsComponent.velocity[0] + 10, 1000) }, // right arrow
            //70: function() { that.shoot() }, // f
            
            17: function() { if (that.getEntity().getTag() == "Deven" || that.getEntity().getTag() == "Dorian") { that.physicsComponent.velocity[1] += -50 } }, // the return of super cube
        }
    }

    public update(delta: number) {

        if (this.physicsComponent == null) { // get the Physics Component if it is not yet present.
            this.physicsComponent = this.getEntity().getComponent<PhysicsComponent>("PhysicsComponent");
        }

        KeyboardManager.keys.forEach(key => {
            if (this.pressMap[key]) this.pressMap[key]();
        });

        if (this.pressMap.length == 0){ // If nothing is pressed
            this.physicsComponent.velocity[0] *= 0.95; // slowly slow down the player
        }
    }

    public onCollision(collidingEntity: Entity) {
        if (collidingEntity.getTag() == "Platform") {
            this.jumping = false;
            this.physicsComponent.gravityEnabled = false;
            this.physicsComponent.velocity[1] = 0;
        }
    }
}