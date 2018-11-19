// JS-Platformer Main
// import * as $ from "../lib/jquery.min"; // Jquery
// import { io } from "../lib/socket.io";

//@ts-ignore
var $ = jQuery;

window.requestAnimationFrame = window.requestAnimationFrame // Browser Compatibility (different browsers have different functions for rendering)
    // @ts-ignore
    || window.mozRequestAnimationFrame // Firefox (Mozilla-Based)
    || window.webkitRequestAnimationFrame // Safari, Opera, older versions of Chrome
    // @ts-ignore
    || window.msRequestAnimationFrame // Edge, IE
    || function(f){return setTimeout(f, 1000/60);}; // Dinosaur Browsers that are surpassed by rocks

// var playerRgbColor = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
var playerAppearance = {color:"#f00", playerSpriteSheetIndex:Math.floor(Math.random() * 1), rgbColor:[Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)]};
playerAppearance.color = "rgb("+playerAppearance.rgbColor[0]+", " + playerAppearance.rgbColor[1]+", "+playerAppearance.rgbColor[2]+")";

var changeColorFunc = function(playerAppearance: any){
    playerAppearance.color = playerAppearance.color;
}

$("#player-color").spectrum({
    color: "rgb("+playerAppearance.rgbColor[0]+", " + playerAppearance.rgbColor[1]+", "+playerAppearance.rgbColor[2]+")",
    change: function(color: any) {
        var colorH = color.toHexString(); // #ff0000
        var rgbColor = color.toRgb();

        color = "rgb(" + rgbColor["r"]+", " + rgbColor["g"]+ ", " + rgbColor["b"] + ")";
        rgbColor = [rgbColor["r"], rgbColor["g"], rgbColor["b"]];

        playerAppearance.color = color;
        playerAppearance.rgbColor = rgbColor; // Rgb color array
        changeColorFunc(playerAppearance);
    }
});

function start() { // when the player presses the start button
    $("#message-box").css("display", "none");

    KeyboardManager.init();

    var player = new Player(playerAABB.clone().move(500, 250), $("#player-name").val(), playerAppearance);
    var entityManager = new EntityManager();
    var camera = new Camera(player);
    var platformManager = new PlatformManager();

    var playerManager = new PlayerManager(camera);
    var playerId = playerManager.addPlayer(player);
    playerManager.setMainPlayer(playerId); // this is the only playable player (other players are controlled through multiplayer)

    var UI = new UIManager();
    var gameManager = new GameManager(playerManager, platformManager, UI);

    var serverManager = new ServerManager(platformManager, playerManager, UI, gameManager); // Handle all socket server communications (creation of remote platforms, players, etc.)
    serverManager.startCommunication();
    var renderer = new Renderer("main-canvas", platformManager, playerManager, camera);

    serverManager.updateAppearance(playerAppearance);
    changeColorFunc = function(playerAppearance){
        serverManager.updateAppearance(playerAppearance);
    }
    
    var lastTime: number;
    var deltaTime;

    var currTimeout: any;

    var update = function(currentTime: number) { // renderer loop
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
