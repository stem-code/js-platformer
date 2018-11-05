class AABB {
    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    move(x, y) {
        this.x += x;
        this.y += y;
        return this;
    }

    clone() {
        return new AABB(this.x, this.y, this.width, this.height);
    }
}