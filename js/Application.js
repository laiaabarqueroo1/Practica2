let game;
let myCanvas;
let ctx;
let currentLevel;
this.lives = 3;
let timeLeft = 600;
let timerInterval;
let playerName = "";
// When the document is ready, initialize the game
$(document).ready(function () {
    $('#header, #canvas, #lose-page, #win-page, #space-bar').hide();

    // Get the canvas element and its 2D rendering context
    let myCanvas = document.getElementById("canvas");
    let ctx = myCanvas.getContext("2d");

    const playerName = prompt("Enter your name:");
    document.getElementById("space-bar").innerHTML = `Welcome, ${playerName}! Press the space bar to start`;

   
    document.getElementById("initial-page").style.display = "none";
    document.getElementById("principal").style.display = "flex";

    
    $('#button1').click(function() {
        $('#initial-page').hide();
        $('#canvas, #header').show();
        currentLevel=0; 
        startGame(currentLevel);
    });

    $('#button2').click(function() {
        $('#initial-page').hide();
        $('#canvas, #header').show();
        currentLevel=1; 
        startGame(currentLevel);
    });

    $('#button3').click(function() {
        $('#initial-page').hide();
        $('#canvas, #header').show();
        currentLevel=2; 
        startGame(currentLevel);
    });

    document.addEventListener("keydown", function (event) {
        if (event.code === "Space") {
            startTimer();
            game = new Game(myCanvas, ctx, currentLevel);
            game.initialize(currentLevel);
            animation();
            $('#space-bar').hide();
        }
    });
});

// Function to start the game with the selected level
function startGame(currentLevel) {
    
    

    
    document.getElementById("score").textContent = "0";

    
    game = new Game(myCanvas, ctx, currentLevel);
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


document.addEventListener("DOMContentLoaded", function() {
    updateTimerDisplay();
});



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
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

    document.getElementById("timer").textContent = formattedTime;
}

function loseLife() {
    if (this.lives > 0) {
        this.lives--;
        console.log("Lives left:", lives);
        clearInterval(timerInterval);
       
        // Actualizar el display de las vidas en el HTML
        document.getElementById("lives").textContent = this.lives;
        
        // Mostrar el número actualizado de vidas restantes
        updateLivesDisplay();

        if (this.lives === 0) {
            clearInterval(timerInterval);
            mostrarPantalla('lose-page'); // Mostrar la página de derrota
        } else{
            // Reiniciar el juego y disminuir una vida
            startGame(currentLevel);
        }

    }
}



function updateLivesDisplay() {
    let livesDisplay = document.getElementById("lives");
    if (livesDisplay) {
        livesDisplay.textContent = this.lives;
    }
}






