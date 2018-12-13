class CollisionComponent extends Component { // Move this to web worker thread in future.
    private parentEntity: Entity;
    private futureCalc: boolean = true; // Detect collisions for next frame, or current frame

    constructor() {
        super();
    }
    
    public update(delta: number) { // Simple AABB Collision
        if (!this.parentEntity){
            if (!this.getEntity()) return 0;
            this.parentEntity = this.getEntity();
        }
        var parentAABB = this.parentEntity.getAABB();

        EntityManager.getAllEntities().forEach(entity => {
            var entityAABB = entity.getAABB();
            if (entity === this.parentEntity){
                return 0;
            }

            if (parentAABB.x < entityAABB.x+entityAABB.width &&
                parentAABB.x + parentAABB.width > entityAABB.x && 
                parentAABB.y < entityAABB.y+entityAABB.height && 
                parentAABB.y + parentAABB.height > entityAABB.y) {
                    console.log("Collision detected with " + entity.getTag());
                    this.getEntity().onCollision(entity);
                }
        });
    }
}