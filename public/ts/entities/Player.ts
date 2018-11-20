class Player extends Entity {
    public userName: string;
    public appearance: any;
    public lastPositions: any[];
    public repurcussion: any;
    public repurcussionDirection: any;
    public jumping: boolean;
    public spectator: boolean;
    public currentXIndex: number;
    public time: number;
    public timePerFrame: number;
    public pressMap: { [key:number]: any; }
    public dead: boolean = false;

    constructor(aabb: AABB, name: string, appearance: any){
        super(aabb, "player", new SpriteSheet(playerSpriteSheets[appearance.playerSpriteSheetIndex], 16, 16), appearance.color, true);
        // alert(name);
        console.log(appearance.color);
        this.userName = name;
        this.appearance = appearance;

        this.updateAppearance(appearance)

        this.lastPositions = [];
        this.repurcussion = 0;
        this.repurcussionDirection = 1;
        this.jumping = false;
        this.active = false;
        this.spectator = false;

        this.currentXIndex = 0;
        this.time = 0.0;
        this.timePerFrame = 25000.0;

        var that = this;

        var jump = () => {
            if (!that.jumping){
                that.aabb.y -= 1;
                that.velocity[1] = -350;
                that.jumping = true;
            }
        }

        this.pressMap = { // Player controls
            87: jump, // w
            38: jump, // up arrow
            32: jump, // space
            83: function() { that.velocity[1] += 20 }, // s
            40: function() { that.velocity[1] += 20 }, // down arrow

            65: function() { that.velocity[0] = Math.max(that.velocity[0] - 10, -10000) }, // a
            37: function() { that.velocity[0] = Math.max(that.velocity[0] - 10, -10000) }, // left arrow
            68: function() { that.velocity[0] = Math.min(that.velocity[0] + 10, 10000) },  // d 
            39: function() { that.velocity[0] = Math.min(that.velocity[0] + 10, 10000) }, // right arrow
            70: function() { that.shoot() }, // f
            
            17: function() { if (that.userName == "Deven" || that.userName == "Dorian") { that.velocity[1] += -50 } }, // the return of super cube
        }

        this.updateAppearance(this.appearance);
    }

    draw(ctx: any, camera: Camera){
        /*if (this.active && !this.spectator){
            for (var pos in this.lastPositions){
                ctx.fillStyle = "rgba(63, 81, 181, " +(0.5 / (this.lastPositions.length-pos)).toFixed(2) + ")";
                ctx.fillRect(this.lastPositions[pos][0] - this.aabb.x+centerX, this.lastPositions[pos][1]-this.aabb.y+centerY, this.aabb.width, this.aabb.height);
            }
    
            this.lastPositions.push([this.aabb.x, this.aabb.y+this.repurcussion]);
            
            if (this.repurcussionDirection == 1) {
                this.repurcussion -= 2;
            } else {
                this.repurcussion += 2;
            }
    
            if (this.repurcussion > 30 || this.repurcussion < 1) { this.repurcussionDirection *= -1; }
            if (this.lastPositions.length >= 10){ this.lastPositions.splice(0, 1); }
        }*/
        
        if (!this.spectator){
            super.draw(ctx, camera);
            // if (this.userName == "A")
            //     console.log(this.userName, this.index.xIndex);
            ctx.font = "20px Impact";
            ctx.fillStyle = this.color;
            ctx.fillText(this.userName, this.aabb.x + camera.offsetX - this.aabb.width * this.userName.length * 0.05, this.aabb.y + camera.offsetY - this.aabb.width * 0.3);
        }
    }

    updateAppearance(appearance: any) {
        // alert("updating appearance");
        //if (this.appearance.playerSpriteSheetIndex != appearance.playerSpriteSheetIndex) {
            this.spriteSheet = new SpriteSheet(playerSpriteSheets[appearance.playerSpriteSheetIndex], 16, 16);
        //}
        //if (this.color != appearance.color) {
            this.color = appearance.color;
            this.spriteSheet.tintImage(appearance.rgbColor);
        //}
        this.appearance = appearance;
    }

    updateIndex(delta: number) {
        if (this.userName == "A" && !this.active)
            console.log("Editing username A");
        if (Math.abs(this.velocity[1]) < 150) {
            this.index.yIndex = 0;
            if (delta > 0) {
                this.time += Math.floor(delta) * Math.abs(this.velocity[0]);
            }
            if (this.time > this.timePerFrame) {
                this.time = 0.0;
                this.currentXIndex++;
                if (this.currentXIndex > this.spriteSheet.numIndices.numX - 1) {
                    this.currentXIndex = 0;
                }
            }
            if (Math.abs(this.velocity[0]) < 50) {
                this.currentXIndex = 0
            }
            this.index.xIndex = this.currentXIndex;
        } else {
            this.index.yIndex = 2;
            if (this.velocity[1] > 250) {
                this.index.xIndex = 3;
            } else if (this.velocity[1] >= 150) {
                this.index.xIndex = 2;
            } else if (this.velocity[1] < -250) {
                this.index.xIndex = 1;
            } else if (this.velocity[1] <= -150) {
                this.index.xIndex = 0;
            }
        }
        if (this.velocity[0] < 0) {
            this.index.yIndex++;
        }
    }

    setSpriteIndex(index: any){
        // console.log("Setting Index to: " + JSON.stringify(index));
        this.index.yIndex = index.yIndex;
        this.index.xIndex = index.xIndex;

        console.log(JSON.stringify(this.index));

        // console.log(this.index.xIndex);
        // console.log(this.index.yIndex);
        // console.log(this.userName);
    }

    shoot() {
        var left = false;
        if (this.velocity[0] < 0) {
            left = true;
        }
        // create projectile
    }

    onCollision(entity: Entity) {
        if (entity.tag = "platform") {
            this.jumping = false;
        } else if (entity.tag = "wall") {
            this.jumping = false;
        }
    }

    handleKeyPress(pressList: number[]){
        pressList.forEach(key => {
            if (this.pressMap[key]) this.pressMap[key]();
        });

        if (pressList.length == 0){
            this.velocity[0] *= 0.95;
        }
    }
}
