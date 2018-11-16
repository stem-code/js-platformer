class EntityManager {
    private entities: Entity[];

    constructor() {
        this.entities = [];
    }

    addEntity(entity: Entity) {
        this.entities.push(entity);
    }

    removeAllEntitiesWithTag(tag: string) {
        this.entities.forEach(entity => {
            if (entity.tag = tag) {
                this.entities.splice(this.entities.indexOf(entity), 1);
            }
        });
    }

    update(delta: number) {
        // this.entities.forEach(entity => {
        //     entity.update(delta);
        // });

        // for (var i = 0; i < this.entities.length; i++) {
        //     if (this.entities[i].posY == -99999) {
        //         this.entities.remove(i);
        //         i--;
        //     }
        // }
    }

    draw(ctx: any, camera: Camera) {
        this.entities.forEach(entity => {
            entity.draw(ctx, camera);
        });
    }
}
