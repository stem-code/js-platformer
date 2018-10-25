class Player extends Entity {
    constructor(aabb, color){
        super(aabb, color || "#3F51B5");
    
        this.lastPositions = [];
        this.repurcussion = 0;
        this.repurcussionDirection = 1;
        this.jumping = false;
        this.active = true;
    }

    draw(ctx, _, windowDimens){

        /*for (var pos in this.lastPositions){
            ctx.fillStyle = "rgba(63, 81, 181, " +(0.5 / (this.lastPositions.length-pos)).toFixed(2) + ")";
            ctx.fillRect(this.lastPositions[pos][0] - this.posX+centerX, this.lastPositions[pos][1]-this.posY+centerY, this.width, this.height);
        }*/

        super.draw(renderer);

        //this.lastPositions.push([this.posX, this.posY+this.repurcussion]);
        
        /*if (this.repurcussionDirection == 1) {
            this.repurcussion -= 2;
        } else {
            this.repurcussion += 2;
        }

        if (this.repurcussion > 30 || this.repurcussion < 1) { this.repurcussionDirection *= -1; }
        if (this.lastPositions.length >= 10){ this.lastPositions.splice(0, 1); }*/
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
    constructor(aabb){
        super(aabb);
        var that = this;
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