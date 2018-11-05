// JS-Platformer Main

window.requestAnimationFrame = window.requestAnimationFrame // Browser Compatibility (different browsers have different functions for rendering)
    || window.mozRequestAnimationFrame // Firefox (Mozilla-Based)
    || window.webkitRequestAnimationFrame // Safari, Opera, older versions of Chrome
    || window.msRequestAnimationFrame // Edge, IE
    || function(f){return setTimeout(f, 1000/60);}; // Dinosaur Browsers that are surpassed by rocks

var playerAppearance = {color:"#f00", playerSpriteSheetIndex:0};
var changeColorFunc = function(color){
    playerAppearance.color = color;
}

$("#player-color").spectrum({
    color: "#f00",
    change: function(color) {
        color = color.toHexString(); // #ff0000
        changeColorFunc(color);
    }
});

function start() { // when the player presses the start button
    document.getElementById("message-box").style = "display: none;";

    var entityManager = new EntityManager();

    var platformManager = new PlatformManager();
    var playerManager = new PlayerManager();
    var UI = new UIManager();
    var gameManager = new GameManager(playerManager, platformManager, UI);

    player = new Player(playerAABB.clone().move(500, 250), document.getElementById("player-name").value, playerAppearance);
    var playerId = playerManager.addPlayer(player);
    playerManager.setMainPlayer(playerId); // this is the only playable player (other players are controlled through multiplayer)

    var serverManager = new ServerManager(platformManager, playerManager, UI, gameManager); // Handle all socket server communications (creation of remote platforms, players, etc.)
    var renderer = new Renderer("main-canvas", platformManager, playerManager, new Camera(player));

    serverManager.updateAppearance(playerAppearance);
    changeColorFunc = function(playerAppearance){
        console.log("UPDATE");
        serverManager.updateAppearance(playerAppearance);
    }
    
    var lastTime;
    var deltaTime;
    var update = function(currentTime) { // renderer loop
        if (!lastTime) lastTime = currentTime;
        deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        entityManager.update(deltaTime);
        serverManager.update(); // ServerManager also updates (to send current status)

        // TODO: GET RID OF
        UI.updateFPS(deltaTime);
        platformManager.update(deltaTime);
        playerManager.update(deltaTime);
        gameManager.update();
        // END GET RID OF

        renderer.render(entityManager);
        window.requestAnimationFrame(update);
    }
    update();
}