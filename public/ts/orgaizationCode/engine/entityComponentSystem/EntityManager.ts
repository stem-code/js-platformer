class EntityManager {
    private static entities: Entity[] = [];

    static addEntity(entity: Entity) {
        EntityManager.entities.push(entity);
    }

    public static removeAllEntitiesWithTag(tag: string) {
        for (var i = 0;i < EntityManager.entities.length;i++) {
            if (EntityManager.entities[i].getTag() == tag) {
                EntityManager.entities.splice(i, 1);
            }
        }
    }

    public static update(delta: number) {
        EntityManager.entities.forEach(entity => {
            entity.update(delta);
        });
    }

    public static draw(ctx: any, camera: Camera) {
        EntityManager.entities.forEach(entity => {
            entity.draw(ctx, camera);
        });
    }
}
