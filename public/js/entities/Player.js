class Player extends Entity {
    constructor(x, y, width, height){
        super(x, y, width, height, 0, "#3F51B5", true);
    
        this.lastPositions = [];
        this.repurcussion = 0;
        this.repurcussionDirection = 1;
        this.jumping = false;
        this.activePlayer = true;
        var that = this;

        this.pressMap = { // Player controls
            87: function() { if (!that.jumping) that.movementVector[1] = -350; that.jumping = true; }, // w
            32: function()  {if (!that.jumping) that.movementVector[1] = -350; that.jumping = true; }, // space
            83: function() { that.movementVector[1] += 10 }, // s
            83: function() { that.movementVector[1] += 10 }, // down arrow

            65: function() { that.movementVector[0] = Math.max(that.movementVector[0] - 20, -200) }, // a
            37: function() { that.movementVector[0] = Math.max(that.movementVector[0] - 20, -200) }, // left arrow
            68: function() { that.movementVector[0] = Math.min(that.movementVector[0] + 20, 200) },  // d 
            39: function() { that.movementVector[0] = Math.min(that.movementVector[0] + 20, 200) }, // right arrow
            70: function() { shoot() }, // f
        }
    }

    draw(ctx, _, windowDimens){
        var centerX = (windowDimens[0] + this.width) / 2;
        var centerY = (windowDimens[1] + this.height) / 2;

        for (var pos in this.lastPositions){
            ctx.fillStyle = "rgba(63, 81, 181, " +(0.5 / (this.lastPositions.length-pos)).toFixed(2) + ")";
            ctx.fillRect(this.lastPositions[pos][0] - this.posX+centerX, this.lastPositions[pos][1]-this.posY+centerY, this.width, this.height);
        }

        super.draw(ctx, this, windowDimens);

        this.lastPositions.push([this.posX, this.posY+this.repurcussion]);
        
        if (this.repurcussionDirection == 1) {
            this.repurcussion -= 2;
        } else {
            this.repurcussion += 2;
        }

        if (this.repurcussion > 30 || this.repurcussion < 1) { this.repurcussionDirection *= -1; }
        if (this.lastPositions.length >= 10){ this.lastPositions.splice(0, 1); }
    }

    onCollision() {
        this.jumping = false;
    }

    handleKeyPress(pressList){
        if (this.active){
            pressList.forEach(key => {
                if (this.pressMap[key]) this.pressMap[key]();
            });
        }

        if (pressList.length == 0){
            try {
                this.movementVector[0] *= 0.95;
            } catch {
            }
        }
    }
}

class ActivePlayer extends Player {
    constructor(x, y, width, height){
        super(x, y, width, height);
        this.pressMap = {
            87: function() { if (!that.jumping) that.movementVector[1] = -350; that.jumping = true; }, // w
            32: function()  {if (!that.jumping) that.movementVector[1] = -350; that.jumping = true; }, // space
            83: function() { that.movementVector[1] += 10 }, // s
            83: function() { that.movementVector[1] += 10 }, // down arrow

            65: function() { that.movementVector[0] = -200 }, // a
            37: function() { that.movementVector[0] = -200 }, // left arrow
            68: function() { that.movementVector[0] = 200 },  // d 
            39: function() { that.movementVector[0] = 200 }, // right arrow
            70: function() { shoot() }, // f
        }
    }

    shoot(direction) {
        
    }

    handleKeyPress(pressList){
        if (this.active){
            pressList.forEach(key => {
                if (this.pressMap[key]) this.pressMap[key]();
            });
        }

        if (pressList.length == 0){
            try {
                this.movementVector[0] *= 0.95;
            } catch {
            }
        }
    }
}
