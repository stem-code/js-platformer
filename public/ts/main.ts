// JS-Platformer Main

window.requestAnimationFrame = window.requestAnimationFrame // Browser Compatibility (different browsers have different functions for rendering)
    || window.mozRequestAnimationFrame // Firefox (Mozilla-Based)
    || window.webkitRequestAnimationFrame // Safari, Opera, older versions of Chrome
    || window.msRequestAnimationFrame // Edge, IE
    || function(f){return setTimeout(f, 1000/60);}; // Dinosaur Browsers that are surpassed by rocks

var playerAppearance = {color:"#f00", playerSpriteSheetIndex:Math.floor(Math.random() * 2), rgbColor:[Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]};
var changeColorFunc = function(color){
    playerAppearance.color = color;
}

$("#player-color").spectrum({
    color: "#f00",
    change: function(color) {
        colorH = color.toHexString(); // #ff0000
        var rgbColor = color.toRgb();
        color = colorH;
        rgbColor = [rgbColor["r"], rgbColor["g"], rgbColor["b"]];

        playerAppearance.color = color;
        playerAppearance.rgbColor = rgbColor;
        changeColorFunc(playerAppearance);
    }
});

function start() { // when the player presses the start button
    var messageBox: any = document.getElementById("message-box").style = "display: none;";

    var entityManager = new EntityManager();

    var platformManager = new PlatformManager();
    var playerManager = new PlayerManager();
    var UI = new UIManager();
    var gameManager = new GameManager(playerManager, platformManager, UI);

    var player = new Player(playerAABB.clone().move(500, 250), document.getElementById("player-name").value, playerAppearance);
    var playerId = playerManager.addPlayer(player);
    playerManager.setMainPlayer(playerId); // this is the only playable player (other players are controlled through multiplayer)

    var serverManager = new ServerManager(platformManager, playerManager, UI, gameManager); // Handle all socket server communications (creation of remote platforms, players, etc.)
    var renderer = new Renderer("main-canvas", platformManager, playerManager, new Camera(player));

    serverManager.updateAppearance(playerAppearance);
    changeColorFunc = function(playerAppearance){
        serverManager.updateAppearance(playerAppearance);
    }
    
    var lastTime: Number;
    var deltaTime;

    var currTimeout: any;

    var update = function(currentTime: Number) { // renderer loop
        if (!lastTime) lastTime = currentTime;
        deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        entityManager.update(deltaTime);
        serverManager.update(); // ServerManager also updates (to send current status)

        // TODO: GET RID OF
        UI.updateFPS(deltaTime);
        platformManager.update();
        playerManager.update(deltaTime);
        gameManager.update();
        // END GET RID OF

        renderer.render(entityManager);
        window.requestAnimationFrame(update);
        clearTimeout(currTimeout);
        currTimeout = setTimeout(function(){ 
            location.reload(); // if inactive, reload
        }, 400); // check if user is inactive
    }
    update(0);
}
