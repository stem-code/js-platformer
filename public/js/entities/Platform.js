class Platform extends Entity {
    constructor(x, y, width){
        super(new AABB(x, y, width, 20), ["#8BC34A", "#CDDC39", "#4CAF50"][Math.floor(Math.random()*3)], false);
        this.gravityEnabled = false;
    }
}