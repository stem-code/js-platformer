var wallColor = "#4CAF50";
var wallWidth = 1000;

function drawWalls(ctx, screenWidth, screenHeight, player){
    ctx.fillStyle = wallColor;
    var centerY = (screenWidth+player.aabb.width)/2;

    ctx.fillRect(0-player.aabb.x-20+centerY, 0, 20, screenHeight);
    ctx.fillRect(wallWidth-player.aabb.x+centerY, 0, 20, screenHeight);
}