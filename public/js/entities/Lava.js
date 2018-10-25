var lavaHeight = 0;

function drawLava(ctx, screenWidth, screenHeight, player){
    ctx.fillStyle = "#FF9800";
    var centerX = (screenWidth+player.width)/2;
    var centerY = (screenHeight+player.height)/2;
    ctx.fillRect(0, screenHeight-lavaHeight-player.posY+centerY, screenWidth, screenHeight*2);
}