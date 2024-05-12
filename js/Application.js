let game;
let currentLevel;
// When the document is ready, initialize the game
$(document).ready(function () {
    $('#canvas, #lose-page, #win-page, #space-bar').hide();

    // Get the canvas element and its 2D rendering context
    let myCanvas = document.getElementById("canvas");
    let ctx = myCanvas.getContext("2d");

    $('#button1').click(function() {
        $('#initial-page').hide();
        $('#canvas').show();
        currentLevel=0; 
        startGame(currentLevel);
    });

    $('#button2').click(function() {
        $('#initial-page').hide();
        $('#canvas').show();
        currentLevel=1; 
        startGame(currentLevel);
    });

    $('#button3').click(function() {
        $('#initial-page').hide();
        $('#canvas').show();
        currentLevel=2; 
        startGame(currentLevel);
    });

    document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            game = new Game(myCanvas, ctx, currentLevel);
            game.initialize(currentLevel);
            animation();
            $('#space-bar').hide();
        }
    });
});

// Function to start the game with the selected level
function startGame(currentLevel) {
    game = new Game(myCanvas, ctx, currentLevel);
    console.log(currentLevel);
    game.initialize(currentLevel);
    animation();
}

// Function to handle animation
function animation() {
    // Update the game state
    game.update();

    // Request the next animation frame
    requestAnimationFrame(animation);
}

function mostrarPantalla(text) {
    $('#canvas').hide(); 
    if (text === '.win-page') {
        $('#win-page').show();
    } else {
        $('#lose-page').show();
    }
}

// Finish the game
function finishGame(estat) {
    setTimeout(function () {
        if (estat === "Win") {
            mostrarPantalla('.win-page');
            // var punts = calcularPunts(clicks);
            // var punts = 100;
            // $(".win-page .points").text(punts);
        } else {
            mostrarPantalla('.lose-page');
        }
    }, 600);
}
