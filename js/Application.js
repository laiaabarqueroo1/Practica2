let game;
let currentLevel;
this.lives = 3;
let timeLeft = 1600;
let timerInterval;
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



f
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

function startTimer() {
    timerInterval = setInterval(function() {
        timeLeft--; 
        updateTimerDisplay(); 
        
        if (timeLeft === 0) {
            loseLife();
            clearInterval(timerInterval);
        }
    }, 1000); 
}

function updateTimerDisplay() {
    document.getElementById("timer").textContent = timeLeft;
}

function loseLife() {
    this.lives--; // Decrease the number of lives
    console.log(lives)
    
    // Update the lives display in the HTML
    document.getElementById("lives").textContent = this.lives;
    // Check if no lives left
    if (this.lives === 0) {
        mostrarPantalla('.lose-page'); // Mostrar página de derrota
    } else {
        restartGame();
    }
        
    
       
    
}


function restartGame() {
    // Reiniciar la posición de la pelota
    // Suponiendo que 'game' es una instancia de la clase Game y tiene un método 'resetBallPosition()' para esto
    game.initialize();

    // Reiniciar la posición de los ladrillos
    // Suponiendo que 'game' es una instancia de la clase Game y tiene un método 'resetBricksPosition()' para esto
    game.clearCanvas();

    score === 0;

    // Continuar con la lógica del juego después de reiniciar
    // Por ejemplo, puedes llamar a game.update() para que el juego continúe desde donde se detuvo después de reiniciar
    game.update();
}
