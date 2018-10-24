var lavaHeight = 0;

function drawLava(ctx, screenWidth, screenHeight){
    ctx.fillStyle = "#FF9800";
    ctx.fillRect(0, screenHeight-lavaHeight, screenWidth, screenHeight*2);
}