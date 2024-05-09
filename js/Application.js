/* APPLICATION */

let game;
// When the document is ready, initialize the game
$(document).ready(function() {
    $('#canvas, #lose-page, #win-page, #space-bar').hide();

    // Get the canvas element and its 2D rendering context
    let myCanvas = document.getElementById("canvas");
    let ctx = myCanvas.getContext("2d");
    // Flag to track if space bar is pressed
    let spaceBarPressed = false;

    startPage();
    document.addEventListener("keydown", function(event) {
        if (event.code === "Space" && !spaceBarPressed) {
            spaceBarPressed = true;
            $('#space-bar').hide();
            game = new Game(myCanvas, ctx);
            game.initialize();
            animation();
        }
    });
});

function startPage() {
    $('#button1, #button2, #button3').click(function() {
        $('#initial-page').hide();
        $('#space-bar, #canvas').show();
    });
}

// Function to handle animation
function animation() {
    // Update the game state
    game.update();
    // Request the next animation frame
    requestAnimationFrame(animation);
}

// Mostrar pantalla
function mostrarPantalla(text) {
    $('#canvas').hide();
    if (text === '.win-page') {;
        $('#win-page').show();
    } else {
        $('#lose-page').show();
    }
    $('#buttonRestart').click(function() {
        $('#win-page, #lose-page').hide();
        game = new Game(myCanvas, ctx);
        game.initialize();
        animation();
        $('#canvas').show();
    });
    $('#buttonExit').click(function() {
        $('#win-page, #lose-page').hide();
        $('#initial-page').show();
    });
}

// Finish the game
function finishGame(estat) {
    setTimeout(function() {
        if (estat === "Win") {
            mostrarPantalla('.win-page');
            // var punts = calcularPunts(clicks);
            // var punts = 100;
            // $(".win-page .points").text(punts);
        } else {
            mostrarPantalla('.lose-page');
        }
    }, 300);
}