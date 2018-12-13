// Resolution
var pixelSize: number = 50.0 / 16.0;

// Bounding Boxes
var playerAABB = new AABB(-8, -8, 40, 40);

// Graphics
var slimeSpriteSheet = new Image();
slimeSpriteSheet.src = "/res/slime-spritesheet.png";
var madScientistSpriteSheet = new Image();
madScientistSpriteSheet.src = "/res/js-platformer-test-sprites.png";
var playerSpriteSheets = [slimeSpriteSheet,
                            madScientistSpriteSheet];