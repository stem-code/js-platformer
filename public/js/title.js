function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('Welcome ' + profile.getName());
    var id_token = googleUser.getAuthResponse().id_token;

    $.post("/authenticate",
    {
        token: id_token
    },
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}

function generateBackgroundMosaic(){
    var ctx = $("#background-generate")[0].getContext("2d");
    var canvasWidth = $(window).width();
    var canvasHeight =  $(window).height();

    $("#background-generate").attr("width", $(window).width());
    $("#background-generate").attr("height", $(window).height());

    grid = [];

    for (var x=0; x<Math.ceil(canvasWidth/50); x++){
        grid.push([]);
        for (var y=0; y<Math.ceil(canvasHeight/50); y++) {
            var randomGreen = Math.floor(Math.random()*200);

            var randomAlpha = (Math.floor(Math.random()*50)+50)/100;
            var distanceFromCenter = Math.max(Math.abs(x-Math.ceil(canvasWidth/100))/Math.ceil(canvasWidth/100), Math.abs(y-Math.ceil(canvasHeight/100))/Math.ceil(canvasHeight/100)); // bigger numbers mean closer to the edge
            randomAlpha = Math.max(randomAlpha - (distanceFromCenter)/2, 0.1);
            grid[x].push([randomGreen, randomAlpha]);
        }
    }

    var frame = 0;
    var randomColor = 0;
    var direction = 1;

    var normalCycle = 600; // Reflects how deep colors should be (higher values = more color)
    var totalFrames = 300;

    function render(){
        if (frame == Math.floor(totalFrames/2)){
            direction *= -1;
        }

        if (frame >= totalFrames){
            if (randomColor < 2){
                randomColor++;
            } else {
                randomColor = 0;
            }
            direction = 1;
            frame = 0;
        }

        for (var x=0; x<Math.ceil(canvasWidth/50); x++){
            for (var y=0; y<Math.ceil(canvasHeight/50); y++) {
                var randomGreen = grid[x][y][0];
                var randomAlpha = grid[x][y][1];
                if (direction > 0){
                    var randomOther = Math.max(randomGreen-0.3*(normalCycle/totalFrames)*frame, 0);
                } else {
                    var randomOther = Math.max(randomGreen-0.3*(normalCycle/totalFrames)*(totalFrames - frame), 0);
                }

                randomOther = Math.min(randomOther, 255); // Maximum value of 255 for colors

                if (randomColor == 0){
                    var fillColor = "rgba("+randomGreen+", "+randomOther+", "+randomOther+", " + randomAlpha + ")";
                } else if (randomColor == 1){
                    var fillColor = "rgba("+randomOther+", "+randomGreen+", "+randomOther+", " + randomAlpha + ")";
                } else {
                    var fillColor = "rgba("+randomOther+", "+randomOther+", "+randomGreen+", " + randomAlpha + ")";
                }

                ctx.fillStyle = fillColor;
                ctx.fillRect(x*50, y*50, 50, 50);
            }
        }
        frame++;
        requestAnimationFrame(render);
    }
    render();
}

generateBackgroundMosaic();