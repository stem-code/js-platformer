class Entity {
    constructor(x, y, width, height, mass, active, color, gravityEnabled){
        this.posX = x;
        this.posY = y;
        this.width = width;
        this.height = height;

        this.mass = mass;
        this.color = color || "#3F51B5";
        this.gravityEnabled = gravityEnabled || true;

        this.forces = [0, 0];
        this.active = active || false;

        this.jumping = false;

        if (active){
            var that = this;
            this.pressMap = {
                87: function() { if (!that.jumping) that.movementVector[1] = -350; that.jumping = true; }, // w
                32: function()  {if (!that.jumping) that.movementVector[1] = -350; that.jumping = true; }, // space

                65: function() { that.movementVector[0] = -200 }, // a
                37: function() { that.movementVector[0] = -200 },
                83: function() { that.movementVector[1] = -800 }, // s
                68: function() { that.movementVector[0] = 200 },  // d 
                39: function() { that.movementVector[0] = 200 }
            }
        }
    }

    draw(ctx, player, screenDimens){
        console.log(player);
        player = player || {posX: 0, posY: 0};

        var centerX = (screenDimens[0]+player.width)/2;
        var centerY = (screenDimens[1]+player.height)/2;

        // console.log(this.posY);
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX-player.posX+centerX, this.posY-player.posY+centerY, this.width, this.height);

        // console.log(Math.floor(this.posX), Math.floor(this.posY), this.width, this.height)
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