class Player extends Entity {
    constructor(x, y, width, height, name, appearance){ 
        super(x, y, width, height, 0, appearance.color, true);
        this.userName = name;
        this.appearance = appearance;

        this.lastPositions = [];
        this.repurcussion = 0;
        this.repurcussionDirection = 1;
        this.jumping = false;
        this.active = false;
        this.movementVector = [0, 0];
        var that = this;

        this.pressMap = { // Player controls
            87: function() { if (!that.jumping) that.movementVector[1] = -350; that.jumping = true; }, // w
            32: function()  { if (!that.jumping) that.movementVector[1] = -350; that.jumping = true; }, // space
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

        if (this.active){
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
        
        super.draw(ctx, activePlayer);
        /*ctx.fillStyle = "#451904";
        ctx.fillRect(this.posX - activePlayer.posX + centerX + this.width * 0.1, this.posY - activePlayer.posY + centerY, this.width * 0.01, this.height);
        ctx.fillRect(this.posX - activePlayer.posX + centerX + this.width * 0.3, this.posY - activePlayer.posY + centerY, this.width * 0.01, this.height);
        ctx.fillRect(this.posX - activePlayer.posX + centerX + this.width * 0.45, this.posY - activePlayer.posY + centerY, this.width * 0.01, this.height);
        ctx.fillRect(this.posX - activePlayer.posX + centerX + this.width * 0.6, this.posY - activePlayer.posY + centerY, this.width * 0.01, this.height);
        ctx.fillRect(this.posX - activePlayer.posX + centerX + this.width * 0.75, this.posY - activePlayer.posY + centerY, this.width * 0.01, this.height);
        ctx.fillRect(this.posX - activePlayer.posX + centerX + this.width * 0.9, this.posY - activePlayer.posY + centerY, this.width * 0.01, this.height);
        ctx.fillStyle = "#F2FF00";
        ctx.beginPath();
        ctx.moveTo(this.posX - activePlayer.posX + centerX + this.width * 0.25, this.posY - activePlayer.posY + centerY + this.height * 0.15);
        ctx.lineTo(this.posX - activePlayer.posX + centerX + this.width * 0.1, this.posY - activePlayer.posY + centerY + this.height * 0.45);
        ctx.lineTo(this.posX - activePlayer.posX + centerX + this.width * 0.4, this.posY - activePlayer.posY + centerY + this.height * 0.45);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(this.posX - activePlayer.posX + centerX + this.width * 0.75, this.posY - activePlayer.posY + centerY + this.height * 0.15);
        ctx.lineTo(this.posX - activePlayer.posX + centerX + this.width * 0.9, this.posY - activePlayer.posY + centerY + this.height * 0.45);
        ctx.lineTo(this.posX - activePlayer.posX + centerX + this.width * 0.6, this.posY - activePlayer.posY + centerY + this.height * 0.45);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(this.posX - activePlayer.posX + centerX + this.width * 0.5, this.posY - activePlayer.posY + centerY + this.height * 0.45);
        ctx.lineTo(this.posX - activePlayer.posX + centerX + this.width * 0.4, this.posY - activePlayer.posY + centerY + this.height * 0.6);
        ctx.lineTo(this.posX - activePlayer.posX + centerX + this.width * 0.6, this.posY - activePlayer.posY + centerY + this.height * 0.6);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.posX - activePlayer.posX + centerX + this.width * 0.5, this.posY - activePlayer.posY + centerY + this.height * 0.8, this.height * 0.15, 0, 180, false);
        ctx.fill();
        ctx.fillStyle = "#FF9800";
        ctx.beginPath();
        ctx.arc(this.posX - activePlayer.posX + centerX + this.width * 0.25, this.posY - activePlayer.posY + centerY + this.height * 0.4, this.height * 0.075, 0, 180, false);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.posX - activePlayer.posX + centerX + this.width * 0.75, this.posY - activePlayer.posY + centerY + this.height * 0.4, this.height * 0.075, 0, 180, false);
        ctx.fill();
        ctx.fillStyle = "#267913";
        ctx.fillRect(this.posX - activePlayer.posX + centerX + this.width * 0.4, this.posY - activePlayer.posY + centerY - this.height * 0.15, this.width * 0.2, this.height * 0.15);*/
        ctx.font = "20px Impact";
        ctx.fillText(this.userName, this.posX - activePlayer.posX + centerX, this.posY - activePlayer.posY - this.width * 0.3 + centerY);
        //console.log("x: " + this.posX + " y: " + this.poxY);
    }

    updateAppearance() {
        this.color = this.appearance.color;
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

/*class ActivePlayer extends Player {
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
        pressList.forEach(key => {
            if (this.pressMap[key]) this.pressMap[key]();
        });

        if (pressList.length == 0){
            this.movementVector[0] *= 0.95;
        }
    }
}*/
