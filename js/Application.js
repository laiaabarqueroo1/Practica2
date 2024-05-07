/* APPLICATION */

let game;
// When the document is ready, initialize the game
$(document).ready(function () {
    $('#canvas').hide();
    $('#lose-page').hide();
    $('#win-page').hide();

    // Get the canvas element and its 2D rendering context
    let myCanvas = document.getElementById("canvas");
    let ctx = myCanvas.getContext("2d");

    $('#button1').click(function() {
        $('#initial-page').hide();
        $('#canvas').show();
    });

    $('#button2').click(function() {
        $('#initial-page').hide();
        $('#canvas').show();
    });

    $('#button3').click(function() {
        $('#initial-page').hide();
        $('#canvas').show(); 
    });

    game = new Game(myCanvas, ctx);
    game.initialize();
    animation();
});

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
    if (text === '.win-page'){;
        $('#win-page').show();
    }
    else{
        $('#lose-page').show();
    }
    
    // $(text).addClass("show");

    // $(text + " .buttonRestart").click(function () {
    $('#buttonRestartWin').click(function () {
        //$(text).removeClass("show");
        $('#win-page').hide();
        $('#canvas').show();
        game.initialize();
        animation();
    });

    // $(text + " .buttonExitWin").click(function () {
    $('#buttonExitWin').click(function () {
        //$(text).removeClass("show");
        $('#win-page').hide();
        $('#initial-page').show();
    });

    $('#buttonRestartLose').click(function () {
        //$(text).removeClass("show");
        $('#lose-page').hide();
        $('#canvas').show();
        game.initialize();
        animation();
    });

    $('#buttonExitLose').click(function () {
        //$(text).removeClass("show");
        $('#lose-page').hide();
        $('#initial-page').show();
    });
}

// Finish
function finishGame(estat) {
    setTimeout(function () {
        if(estat === "Win"){
            mostrarPantalla('.win-page');
            // var punts = calcularPunts(clicks);
            // var punts = 100;
            // $(".win-page .points").text(punts);
        }
        else{
            mostrarPantalla('.lose-page');
        }
    }, 600);
}