var lavaHeight = 100;
var lavaColor = "#4CAF50";

function drawLava(ctx, screenWidth, screenHeight, player) {
    ctx.fillStyle = lavaColor; //"#FF9800";
    var centerY = (screenHeight+player.height)/2;
    ctx.fillRect(0, screenHeight-lavaHeight-player.posY+centerY, screenWidth, screenHeight*2);
}