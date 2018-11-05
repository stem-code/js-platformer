var lavaHeight = 0;
var lavaColor = "#4CAF50";

function drawLava(ctx, screenWidth, screenHeight, player) {
    ctx.fillStyle = lavaColor; //"#FF9800";
    var centerY = (screenHeight+player.aabb.height)/2;
    ctx.fillRect(0, screenHeight-lavaHeight-player.aabb.y+centerY, screenWidth, screenHeight*2);
}