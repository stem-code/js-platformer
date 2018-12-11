class Entity {
    private aabb: AABB;
    private tag: string;
    private componentsDict: any;

    constructor(aabb: AABB, tag: string){
        this.aabb = aabb
        this.tag = tag;
        this.componentsDict = {}
        EntityManager.addEntity(this);
    }

    update(delta: number) {
        for (let key in this.componentsDict) {
            this.componentsDict[key].update(delta);
        }
    }

    draw(ctx: any, camera: Camera) {
        for (let key in this.componentsDict) {
            this.componentsDict[key].draw(ctx, camera);
        }
    }

    onCollision(entity: Entity) {
        for (let key in this.componentsDict) {
            this.componentsDict[key].onCollision(entity);
        }
    }

    public addComponents(components: Component[]) {
        components.forEach(component => {
            component.setEntity(this);
            let c:any = component.constructor;
            this.componentsDict[c.name] = component;
        });
        return this;
    }

    public addComponent(component: Component) {
        return this.addComponents([component]);
    }

    public removeComponents(names: string[]) {
        names.forEach(name => {
            delete this.componentsDict[name];
        });
        return this;
    }

    public removeComponent(name: string) {
        return this.removeComponents([name]);
    }

    public getComponent<T>(name: string): T {
        return this.componentsDict[name];
    }

    public getAABB() {
        return this.aabb;
    }

    public getTag() {
        return this.tag;
    }
}