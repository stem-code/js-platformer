class Player extends Entity {
    constructor(x, y, width, height){
        super(x, y, width, height, 0, true, "#3F51B5", true);
    
        this.lastPositions = [];

        this.repurcussion = 0;
        this.repurcussionDirection = 1;
    }

    draw(ctx, _, windowDimens){
        var centerX = (windowDimens[0]+this.width)/2;
        var centerY = (windowDimens[1]+this.height)/2;

        for (var pos in this.lastPositions){
            ctx.fillStyle = "rgba(63, 81, 181, " +(0.5/(this.lastPositions.length-pos)).toFixed(2) + ")";
            // ctx.fillStyle = "red";
            ctx.fillRect(this.lastPositions[pos][0]-this.posX+centerX, this.lastPositions[pos][1]-this.posY+centerY, this.width, this.height);
        }

        super.draw(ctx, this, windowDimens);
        // console.log(this.frameCount);

        this.lastPositions.push([this.posX, this.posY+this.repurcussion]);
        
        if (this.repurcussionDirection == 1){
            this.repurcussion -= 2;
        } else {
            this.repurcussion += 2;
        }

        if (this.repurcussion > 30 || this.repurcussion < 1) this.repurcussionDirection *= -1;

        if (this.lastPositions.length >= 10){
            this.lastPositions.splice(0, 1);
        }
    }
}