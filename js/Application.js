/* APPLICATION */

let game;
// When the document is ready, initialize the game
$(document).ready(function () {
    $('#canvas').hide();

    // Get the canvas element and its 2D rendering context
    let myCanvas = document.getElementById("canvas");
    let ctx = myCanvas.getContext("2d");
    

    $('#button1').click(function() {
        $('#buttons-container').hide();
        $('#canvas').show();
    });

    $('#button2').click(function() {
        $('#buttons-container').hide();
        $('#canvas').show();
    });

    $('#button3').click(function() {
        $('#buttons-container').hide();
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