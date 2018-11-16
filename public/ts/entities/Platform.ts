class Platform extends Entity {
    public gravityEnabled: boolean;

    constructor(x: number, y: number, width: number){
        super(new AABB(x, y, width, 20), "platform", null, ["#8BC34A", "#CDDC39", "#4CAF50"][Math.floor(Math.random()*3)], false);
        this.gravityEnabled = false;
    }
}