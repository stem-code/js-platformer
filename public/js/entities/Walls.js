var wallColor = "#4CAF50";
var wallWidth = 1000;

function drawWalls(ctx, screenWidth, screenHeight, camera){
    ctx.fillStyle = wallColor;

    ctx.fillRect(0-player.aabb.x + camera.centerX, 0, 20, screenHeight);
    ctx.fillRect(wallWidth-player.aabb.x + camera.centerX, 0, 20, screenHeight);
}