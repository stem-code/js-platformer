class SpriteSheet {
    constructor(path, widthPerSprite, heightPerSprite) {
        this.image = new Image();
        this.image.src = path;

        this.originalImage = new Image();
        this.originalImage.src = path;

        this.tinted = false;
      
        this.widthPerSprite = widthPerSprite;
        this.heightPerSprite = heightPerSprite;
        this.numIndices = {numX:this.image.width/widthPerSprite, numY:this.image.height/heightPerSprite};
        
        var that = this;
        this.image.onload = function() {
            if (!that.tinted){
                that.tintImage([200,0,0]);
            }
        }
    }

    tintImage(color){

        console.log("TINT-----------------------------------------------", color);
        var tintCanvas = document.getElementById("tint-canvas");
        var tintCtx = tintCanvas.getContext("2d");

        tintCanvas.width = this.image.width;
        tintCanvas.height = this.image.height;

        tintCtx.imageSmoothingEnabled = false;
        tintCtx.drawImage(this.originalImage, 0, 0);

        // console.log(this.image.width, this.image.height);
        var imageData = tintCtx.getImageData(0, 0, tintCanvas.width, tintCanvas.height);
        var data = imageData.data;

        for (var i=0; i<data.length; i+=4){
            // console.log(data[i], data[i+1], data[i+2], data[i+3])

            var avg = (data[i] + data[i+1] + data[i+2])/3;
            var tint = color;

            data[i] = (avg/255)*tint[0];
            data[i+1] = (avg/255)*tint[1];
            data[i+2] = (avg/255)*tint[2];
        }

        tintCtx.putImageData(imageData, 0, 0);
        this.image.src = tintCanvas.toDataURL('image/png');
        console.log("done.")
        this.tinted = true;
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