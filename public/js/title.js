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
            var randomRed = Math.floor(Math.random()*200);

            var randomAlpha = (Math.floor(Math.random()*50)+50)/100;
            var distanceFromCenter = Math.max(Math.abs(x-Math.ceil(canvasWidth/100))/Math.ceil(canvasWidth/100), Math.abs(y-Math.ceil(canvasHeight/100))/Math.ceil(canvasHeight/100)); // bigger numbers mean closer to the edge
            randomAlpha = Math.max(randomAlpha - (distanceFromCenter)/2, 0.1);
            grid[x].push([randomRed, randomAlpha]);
        }
    }

    var frame = 0;
    function render(){
        for (var x=0; x<Math.ceil(canvasWidth/50); x++){
            for (var y=0; y<Math.ceil(canvasHeight/50); y++) {
                var randomRed = grid[x][y][0];
                var randomAlpha = grid[x][y][1];
                var randomOther = Math.max(randomRed-0.2*frame, 0);
                if (frame >= 375){
                    return 0;
                }

                var fillColor = "rgba("+randomRed+", "+randomOther+", "+randomOther+", " + randomAlpha + ")";
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