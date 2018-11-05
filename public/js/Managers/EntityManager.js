class EntityManager {
    constructor() {
        this.entities = [];
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    removeAllEntitiesWithTag(tag) {
        this.entityManager.entities.forEach(entity => {
            if (entity.tag = tag) {
                this.entityManager.entities.pop(entity);
            }
        });
    }

    update(delta) {
        this.entities.forEach(entity => {
            entity.update(delta);
        });
    }

    draw(ctx, camera) {
        this.entities.forEach(entity => {
            entity.draw(ctx, camera);
        });
    }
}