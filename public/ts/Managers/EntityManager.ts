class EntityManager {
    private entities;

    constructor() {
        this.entities = [];
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    removeAllEntitiesWithTag(tag) {
        this.entities.forEach(entity => {
            if (entity.tag = tag) {
                this.entities.pop(entity);
            }
        });
    }

    update(delta) {
        this.entities.forEach(entity => {
            entity.update(delta);
        });
        for (var i = 0; i < this.entities.length; i++) {
            if (this.entities[i].posY == -99999) {
                this.entities.remove(i);
                i--;
            }
        }
    }

    draw(ctx, camera) {
        this.entities.forEach(entity => {
            entity.draw(ctx, camera);
        });
    }
}
