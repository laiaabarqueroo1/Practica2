/* APPLICATION */

let game; 
// When the document is ready, initialize the game
$(document).ready(function () {
    // Get the canvas element and its 2D rendering context
    let myCanvas = document.getElementById("canvas");
    let ctx = myCanvas.getContext("2d");

    // Create a new instance of the game and initialize it
    game = new Game(myCanvas, ctx);
    game.initialize();

    // Start the animation loop
    animation();
});

// Function to handle animation
function animation() {
    // Update the game state
    game.update();

    // Request the next animation frame
    requestAnimationFrame(animation);
}