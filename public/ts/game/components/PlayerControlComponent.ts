class PlayerControlComponent extends Component {
    private pressMap: any;
    private physicsComponent: PhysicsComponent;
    private jumping: boolean;

    constructor() {
        super();
        var that = this;
        function jump(){
            if (!that.jumping){
                that.physicsComponent.velocity[1] = -350;
                that.jumping = true;
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
        if (this.physicsComponent == null) {
            this.physicsComponent = this.getEntity().getComponent<PhysicsComponent>("PhysicsComponent");
            console.log(this.physicsComponent);
        }
        KeyboardManager.keys.forEach(key => {
            console.log(key);
            if (this.pressMap[key]) this.pressMap[key]();
        });

        if (this.pressMap.length == 0){
            this.physicsComponent.velocity[0] *= 0.95;
        }
    }

    public onCollision(collidingEntity: Entity) {
        if (collidingEntity.getTag() == "Platform") {
            this.jumping = false;
        }
    }
}