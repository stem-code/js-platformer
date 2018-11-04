class SpriteSheet {
    constructor(path, widthPerSprite, heightPerSprite) {
        this.image = new Image();
        this.image.src = path;
        this.widthPerSprite = widthPerSprite;
        this.heightPerSprite = heightPerSprite;
        this.numIndices = {numX:this.image.width/widthPerSprite, numY:this.image.height/heightPerSprite};
    }

    changeColor(color) {
        // Tint color here.
    }

    drawSprite(ctx, xIndex, yIndex, x, y, width, height) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.image, xIndex * this.widthPerSprite, yIndex * this.heightPerSprite, this.widthPerSprite, this.heightPerSprite, x, y, width, height);
    }
}