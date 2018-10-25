var wallColor = "#4CAF50";

function drawWalls(ctx, screenWidth, screenHeight, player){
    ctx.fillStyle = wallColor;
    var centerY = (screenWidth+player.width)/2;

    ctx.fillRect(0-player.posX-20+centerY, 0, 20, screenHeight);
    ctx.fillRect(screenWidth-player.posX+centerY, 0, 20, screenHeight);
}