abstract class Component {
    private entity: Entity;

    public abstract update(delta: number): void;
    public draw(ctx: any, camera: Camera) {}
    public onCollision(collidingEntity: Entity) {}

    setEntity(entity: Entity) {this.entity = entity;}
    public getEntity() {return this.entity;}
}