var lavaHeight = 0;
var lavaColor = "#4CAF50";

function drawLava(ctx, screenWidth, screenHeight, camera) {
    ctx.fillStyle = lavaColor; //"#FF9800";
    ctx.fillRect(0, screenHeight-lavaHeight-player.aabb.y + camera.centerY, screenWidth, screenHeight*2);
}