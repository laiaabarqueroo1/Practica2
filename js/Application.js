let game;
// When the document is ready, initialize the game
$(document).ready(function () {
    $('#canvas, #lose-page, #win-page, #space-bar').hide();

    // Get the canvas element and its 2D rendering context
    let myCanvas = document.getElementById("canvas");
    let ctx = myCanvas.getContext("2d");

    $('#button1').click(function() {
        $('#initial-page').hide();
        $('#canvas').show();
        startGame(0);
    });

    $('#button2').click(function() {
        $('#initial-page').hide();
        $('#canvas').show();
        startGame(1);
    });

    $('#button3').click(function() {
        $('#initial-page').hide();
        $('#canvas').show();
        startGame(2);
    });

    document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            game = new Game(myCanvas, ctx);
            game.initialize(level);
            animation();
            $('#space-bar').hide();
        }
    });
});

// Function to start the game with the selected level
function startGame(level) {
    game = new Game(myCanvas, ctx);
    game.initialize();
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
