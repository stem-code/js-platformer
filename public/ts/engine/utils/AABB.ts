class AABB {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    
    constructor (x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    move(x: number, y: number) {
        this.x += x;
        this.y += y;
        return this;
    }

    clone() {
        return new AABB(this.x, this.y, this.width, this.height);
    }
}