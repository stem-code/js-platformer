class SpriteSheet {
    constructor(sourceImage, widthPerSprite, heightPerSprite) {
        this.sourceImage = sourceImage;
        this.image = new Image();
        this.widthPerSprite = widthPerSprite;
        this.heightPerSprite = heightPerSprite;
        this.numIndices = {numX:this.image.width/widthPerSprite, numY:this.image.height/heightPerSprite};
    }

    changeColor(color) {
        // Tint color here.
        // applyFilters("filter-tint", {tintOpacity:50}, this.image, this); // look at this function on http://mezzoblue.github.io/PaintbrushJS/demo/script/paintbrush.js
    }

    drawSprite(ctx, xIndex, yIndex, x, y, width, height) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.image, xIndex * this.widthPerSprite, yIndex * this.heightPerSprite, this.widthPerSprite, this.heightPerSprite, x, y, width, height);
    }
}