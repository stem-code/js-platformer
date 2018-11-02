class Player extends Entity {
    constructor(x, y, width, height, name, appearance){ 
        super(x, y, width, height, playerSpriteSheets[appearance.spriteSheetIndex], appearance.color, true);
        this.userName = name;
        this.appearance = appearance;

        this.lastPositions = [];
        this.repurcussion = 0;
        this.repurcussionDirection = 1;
        this.jumping = false;
        this.active = false;
        this.movementVector = [0, 0];
        this.spectator = false;

        this.currentXIndex = 0;
        this.time = 0.0;
        this.timePerFrame = 500.0;

        var that = this;

        function jump(){
            if (!that.jumping){
                that.posY -= 1;
                that.movementVector[1] = -350;
                that.jumping = true;
            }
        }

        this.pressMap = { // Player controls
            87: jump, // w
            32: jump, // space
            83: function() { that.movementVector[1] += 10 }, // s
            83: function() { that.movementVector[1] += 10 }, // down arrow

            65: function() { that.movementVector[0] = Math.max(that.movementVector[0] - 20, -200); console.log(that.movementVector); }, // a
            37: function() { that.movementVector[0] = Math.max(that.movementVector[0] - 20, -200); }, // left arrow
            68: function() { that.movementVector[0] = Math.min(that.movementVector[0] + 20, 200) },  // d 
            39: function() { that.movementVector[0] = Math.min(that.movementVector[0] + 20, 200) }, // right arrow
            70: function() { shoot() }, // f
            
            17: function() { that.movementVector[1] = -500 }, // the return of super cube
        }
    }

    draw(ctx, activePlayer){
        var centerX = (Screen.windowWidth + activePlayer.width) / 2;
        var centerY = (Screen.windowHeight + activePlayer.height) / 2;

        if (this.active && !this.spectator){
            for (var pos in this.lastPositions){
                ctx.fillStyle = "rgba(63, 81, 181, " +(0.5 / (this.lastPositions.length-pos)).toFixed(2) + ")";
                ctx.fillRect(this.lastPositions[pos][0] - this.posX+centerX, this.lastPositions[pos][1]-this.posY+centerY, this.width, this.height);
            }
    
            this.lastPositions.push([this.posX, this.posY+this.repurcussion]);
            
            if (this.repurcussionDirection == 1) {
                this.repurcussion -= 2;
            } else {
                this.repurcussion += 2;
            }
    
            if (this.repurcussion > 30 || this.repurcussion < 1) { this.repurcussionDirection *= -1; }
            if (this.lastPositions.length >= 10){ this.lastPositions.splice(0, 1); }
        }
        
        super.draw(ctx, player);
        
        //console.log("x: " + this.posX + " y: " + this.poxY);
        if (!this.spectator){
            ctx.font = "20px Impact";
            ctx.fillText(this.userName, this.posX - activePlayer.posX + centerX, this.posY - activePlayer.posY - this.width * 0.3 + centerY);
            
            //super.draw(ctx, activePlayer);
            ctx.font = "20px Impact";
            ctx.fillText(this.userName, this.posX - activePlayer.posX + centerX, this.posY - activePlayer.posY - this.width * 0.3 + centerY);
            //console.log("x: " + this.posX + " y: " + this.poxY);
        }
    }

    updateAppearance(color) {
        if (this.active) {
            this.appearance.color = color;
        }
        this.color = this.appearance.color;
    }

    updateIndex(delta) {
        if (Math.abs(this.movementVector[1]) < 150) {
            this.index.yIndex = 0;
            this.time += Math.floor(delta);
            console.log(delta + " " + this.time);
            if (this.time > this.timePerFrame) {
                this.time = 0.0;
                this.currentXIndex++;
            }
            this.index.xIndex = this.currentXIndex;
        } else {
            this.index.yIndex = 1;
            if (this.movementVector[1] > 250) {
                this.index.xIndex = 3;
            } else if (this.movementVector[1] >= 150) {
                this.index.xIndex = 2;
            } else if (this.movementVector[1] < -250) {
                this.index.xIndex = 1;
            } else if (this.movementVector[1] <= -150) {
                this.index.xIndex = 0;
            }
        }
    }

    onCollision() {
        this.jumping = false;
    }

    handleKeyPress(pressList){
        pressList.forEach(key => {
            if (this.pressMap[key]) this.pressMap[key]();
        });

        if (pressList.length == 0){
            this.movementVector[0] *= 0.95;
        }
    }
}