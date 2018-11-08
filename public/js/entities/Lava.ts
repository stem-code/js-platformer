var lavaHeight = 0;
var lavaColor = "#4CAF50";

function drawLava(ctx, screenWidth, screenHeight, camera) {
    ctx.fillStyle = lavaColor; //"#4CAF50";
    ctx.fillRect(0, screenHeight - lavaHeight + camera.offsetY, screenWidth, lavaHeight + screenHeight);
}
