var screenFuncs = {
    clear: function(ctx, windowDimens){
        ctx.fillStyle = "#222222";
        ctx.fillRect(0, 0, windowDimens[0], windowDimens[1]);
    }
}

class Renderer {
    constructor(canvasId){
        var windowWidth = Math.max(
            document.documentElement["clientWidth"],
            document.body["scrollWidth"],
            document.documentElement["scrollWidth"],
            document.body["offsetWidth"],
            document.documentElement["offsetWidth"]
        );

        var windowHeight = Math.max(
            document.documentElement["clientHeight"],
            document.body["scrollHeight"],
            document.documentElement["scrollHeight"],
            document.body["offsetHeight"],
            document.documentElement["offsetHeight"]
        )
        
        this.windowDimens = [windowWidth, windowHeight];
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = windowWidth;
        this.canvas.height = windowHeight;

        this.ctx = this.canvas.getContext("2d");

        this.keys = [];
        this.cameraOffset = {x:0, y:0};

        var that = this;
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (that.keys.indexOf(evt.keyCode) == -1) that.keys.push(evt.keyCode);
        };
        
        document.onkeyup = function(evt) {
            evt = evt || window.event;
            if (that.keys.indexOf(evt.keyCode) > -1){
                that.keys.splice(that.keys.indexOf(evt.keyCode), 1);
            }
        };
    }

    drawAABB(aabb, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(aabb.x + this.cameraOffset[0], aabb.y + this.cameraOffset[1], aabb.width, aabb.height);
    }

    updateCamera(entity) {
        this.cameraOffset[0] = (this.windowDimens[0] + entity.aabb.width) / 2;
        this.cameraOffset[1] = (this.windowDimens[1] + entity.aabb.height) / 2;
    }

    updateDisplay() {
        screenFuncs.clear(this.ctx, this.windowDimens);
    }
}