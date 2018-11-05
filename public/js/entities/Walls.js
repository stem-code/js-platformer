var wallColor = "#4CAF50";
var wallWidth = 1000;

function drawWalls(ctx, screenWidth, screenHeight, camera){
    ctx.fillStyle = wallColor;

    ctx.fillRect(0 + camera.offsetX, 0, 20, screenHeight);
    ctx.fillRect(wallWidth + camera.offsetX, 0, 20, screenHeight);
}