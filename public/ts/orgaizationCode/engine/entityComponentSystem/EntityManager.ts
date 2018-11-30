class NewEntityManager {
    private static entities: NewEntity[] = [];

    static addEntity(entity: NewEntity) {
        NewEntityManager.entities.push(entity);
    }

    public static removeAllEntitiesWithTag(tag: string) {
        for (var i = 0;i < NewEntityManager.entities.length;i++) {
            if (NewEntityManager.entities[i].getTag() == tag) {
                NewEntityManager.entities.splice(i, 1);
            }
        }
    }

    public static update(delta: number) {
        NewEntityManager.entities.forEach(entity => {
            entity.update(delta);
        });
    }

    public static draw(ctx: any, camera: Camera) {
        NewEntityManager.entities.forEach(entity => {
            entity.draw(ctx, camera);
        });
    }
}
