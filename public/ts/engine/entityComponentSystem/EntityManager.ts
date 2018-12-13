class EntityManager {
    private static entities: Entity[] = [];
    private static onScreenEntities: Entity[] = [];

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

    public static getAllEntitiesWithTag(tag: string = "") {
        var matchingEntities = [];
        for (var i = 0;i < EntityManager.entities.length;i++) {
            if (EntityManager.entities[i].getTag() == tag) {
                matchingEntities.push(EntityManager.entities[i]);
            }
        }

        return matchingEntities;
    }

    public static getAllEntities(){
        return EntityManager.entities;
    }

    public static update(delta: number) { // ideally, this should run in less than 8 ms
        EntityManager.entities.forEach(entity => {
            entity.update(delta);
            // if (this.onScreenEntities.indexOf(entity) > -1 && entity.getAABB().y > )
        });
    }

    public static draw(ctx: any, camera: Camera) {
        EntityManager.entities.forEach(entity => {
            entity.draw(ctx, camera);
        });
    }
}
