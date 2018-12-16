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
            if (entity.getTag() == this.parentEntity.getTag()){ // Must change this
                return 0;
            }

            if (parentAABB.x < entityAABB.x+entityAABB.width &&
                parentAABB.x + parentAABB.width > entityAABB.x && 
                parentAABB.y < entityAABB.y+entityAABB.height && 
                parentAABB.y + parentAABB.height > entityAABB.y) { // detect collision
                    let collisionAxis;
                    let smallestSide = 0;
                    let smallestDelta = Math.abs(parentAABB.x - (entityAABB.x + entityAABB.width));

                    // detect collision side
                    if (Math.abs(entityAABB.x - (parentAABB.x + parentAABB.width)) < smallestDelta) { // right side
                        smallestSide = 1;
                        smallestDelta = Math.abs(entityAABB.x - (parentAABB.x + parentAABB.width));
                    }
                    
                    if (Math.abs(parentAABB.y - (entityAABB.y + entityAABB.height)) < smallestDelta){ // top side
                        smallestSide = 2
                        smallestDelta = Math.abs(parentAABB.y - (entityAABB.y + entityAABB.height));
                    }

                    if (Math.abs(entityAABB.y - (parentAABB.y + parentAABB.height)) < smallestDelta){ // bottom side
                        smallestSide = 3;
                        smallestDelta = Math.abs(entityAABB.y - (parentAABB.y + parentAABB.height));
                    }

                    console.log("SMALLEST SIDE IS: " + smallestSide, this.parentEntity.getTag(), entity.getTag());

                    if (smallestSide == 0 || smallestSide == 1){
                        collisionAxis = 'x';
                    } else {
                        // console.log("Y COLL")
                        collisionAxis = 'y';
                    }

                    this.getEntity().onCollision(entity, collisionAxis, smallestSide);
                }
        });
    }
}