var wallColor = "#4CAF50";
var wallWidth = 1000;

function drawWalls(ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number, camera: Camera){
    ctx.fillStyle = wallColor;

    ctx.fillRect(-20 + camera.offsetX, 0, 20, screenHeight);
    ctx.fillRect(wallWidth + camera.offsetX, 0, 20, screenHeight);
}