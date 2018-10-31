// JS-Platformer Main

window.requestAnimationFrame = window.requestAnimationFrame // Browser Compatibility (different browsers have different functions for rendering)
    || window.mozRequestAnimationFrame // Firefox (Mozilla-Based)
    || window.webkitRequestAnimationFrame // Safari, Opera, older versions of Chrome
    || window.msRequestAnimationFrame // Edge, IE
    || function(f){return setTimeout(f, 1000/60);}; // Dinosaur Browsers that are surpassed by rocks


function start() { // when the player presses the start button
    document.getElementById("message-box").style = "display: none;"

    var platformManager = new PlatformManager();
    var playerManager = new PlayerManager();
    var UI = new UIManager();
    var gameManager = new GameManager(playerManager, platformManager, UI);

    player = new Player(500, 250, 50, 50, document.getElementById("player-name").value, {color: document.getElementById("player-color").value});
    var playerId = playerManager.addPlayer(player);
    playerManager.setMainPlayer(playerId); // this is the only playable player (other players are controlled through multiplayer)

    var serverManager = new ServerManager(platformManager, playerManager, UI, gameManager); // Handle all socket server communications (creation of remote platforms, players, etc.)
    var renderer = new Renderer("main-canvas", platformManager, playerManager);
    
    var lastTime;
    var deltaTime;
    var update = function(currentTime) { // renderer loop
        if (!lastTime) lastTime = currentTime;
        deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        UI.updateFPS(deltaTime);
        platformManager.update(deltaTime);
        playerManager.update(deltaTime);
        gameManager.update();
        serverManager.update(); // ServerManager also updates (to send current status)

        renderer.update(deltaTime);
        window.requestAnimationFrame(update);
    }
    update();
}