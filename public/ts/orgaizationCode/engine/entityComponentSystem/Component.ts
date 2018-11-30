abstract class Component {
    private entity: NewEntity;

    public abstract update(delta: number): void;
    public draw(ctx: any, camera: Camera) {}
    public onCollision(collidingEntity: NewEntity) {}

    setEntity(entity: NewEntity) {this.entity = entity;}
    public getEntity() {return this.entity;}
}