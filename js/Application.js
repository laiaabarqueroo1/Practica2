let game;
let myCanvas;
let ctx;
let currentLevel;
let timeLeft = 600;
let timerInterval;
let playerName = "";
// When the document is ready, initialize the game
$(document).ready(function () {
    $('#principal, #lose-page, #win-page').hide();

    // Get the canvas element and its 2D rendering context
    let myCanvas = document.getElementById("canvas");
    let ctx = myCanvas.getContext("2d");

    /*const playerName = prompt("Enter your name:");
    document.getElementById("space-bar").innerHTML = `Welcome, ${playerName}! Press the space bar to start`;

   
    document.getElementById("initial-page").style.display = "none";
    document.getElementById("principal").style.display = "flex";

    */
    $('#button1').click(function () {
        $('#initial-page').hide();
        $('#principal').show();
        currentLevel = 0;
        game = new Game(myCanvas, ctx, currentLevel);
        game.initialize(currentLevel);
        startTimer();
        animation();
    });

    $('#button2').click(function () {
        $('#initial-page').hide();
        $('#principal').show();
        currentLevel = 1;
        game = new Game(myCanvas, ctx, currentLevel);
        game.initialize(currentLevel);
        startTimer();
        animation();
    });

    $('#button3').click(function () {
        $('#initial-page').hide();
        $('#principal').show();
        currentLevel = 2;
        game = new Game(myCanvas, ctx, currentLevel);
        game.initialize(currentLevel);
        startTimer();
        animation();
    });
});

// Function to handle animation
function animation() {
    game.update();
    if (game.ball.out == true || game.ball.start == 0) {
        game.ball.start++;
        // Cancel the next animation frame
        cancelAnimationFrame(animation);
    } else {
        // Request the next animation frame
        requestAnimationFrame(animation);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateTimerDisplay();
});

// Mostrar pantalla
function mostrarPantalla(text) {
    $('#canvas').hide();
    if (text === '.win-page') {
        $('#win-page').show();
    } else {
        $('#lose-page').show();
    }

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
    timerInterval = setInterval(function () {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft === 0) {
            loseLife();
            clearInterval(timerInterval);
        }
    }, 1000);
}

// Finish
function finishGame() {
    clearInterval(timerInterval);
    mostrarPantalla('.win-page');
};

function updateScoreDisplay() {
    document.getElementById("score").textContent = game.score;
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
        } else {
            // Reiniciar el juego y disminuir una vida
            startGame(currentLevel);
        }
    }
}

function updateLivesDisplay() {
    let maxLives = 3;
    const livesContainer = document.getElementById('lives');
    livesContainer.innerHTML = '';

    for (let i = 0; i < maxLives; i++) {
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('flaticon-heart', 'life-icon');
        if (i < this.lives) {
            // Add the full heart icon if life is active
            heartIcon.classList.add('full-heart');
        } else {
            // Add the empty heart icon if life is lost
            heartIcon.classList.add('empty-heart');
        }
        livesContainer.appendChild(heartIcon);
    }
}