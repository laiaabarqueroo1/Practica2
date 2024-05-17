let game;
let myCanvas;
let ctx;
let currentLevel;
let timeLeft = 600;
let timerInterval;
let playerName = "";

$(document).ready(function () {
    $('#principal, #lose-page, #win-page').hide();
    myCanvas = document.getElementById("canvas");
    ctx = myCanvas.getContext("2d");

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

function animation() {
    game.update();
    if (game.ball.out == true || game.ball.start == 0) {
        game.ball.start++;
        cancelAnimationFrame(animation);
    } else {
        requestAnimationFrame(animation);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateTimerDisplay();
});

function mostrarPantalla(text) {
    $('#canvas').hide();
    if (text === '.win-page') {
        $('#win-page').show();
    } else {
        $('#lose-page').show();
    }

    $('#buttonRestartWin').click(function () {
        $('#win-page').hide();
        $('#canvas').show();
        game.initialize();
        animation();
    });

    $('#buttonExitWin').click(function () {
        $('#win-page').hide();
        $('#initial-page').show();
    });

    $('#buttonRestartLose').click(function () {
        $('#lose-page').hide();
        $('#canvas').show();
        game.initialize();
        animation();
    });

    $('#buttonExitLose').click(function () {
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

function finishGame() {
    clearInterval(timerInterval);
    mostrarPantalla('.win-page');
}

function updateScoreDisplay() {
    document.getElementById("score").textContent = game.score;
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    document.getElementById("timer").textContent = formattedTime;
}

function startGame(currentLevel) {
    clearInterval(timerInterval);
    game = new Game(myCanvas, ctx, currentLevel);
    game.initialize();
    startTimer();
    animation();
}

function loseLife() {
    if (game.lives > 0) {
        game.lives--;
        game.usedLives.push(game.lives);  // Guardar la vida usada
        clearInterval(timerInterval);

        // Actualizar el display de las vidas en el HTML
        document.getElementById("lives").textContent = game.lives;

        // Mostrar el número actualizado de vidas restantes
        updateLivesDisplay();

        if (game.lives === 0) {
            clearInterval(timerInterval);
            mostrarPantalla('lose-page'); // Mostrar la página de derrota
        } else {
            // Reiniciar el juego y disminuir una vida
            startGame(game.currentLevel);
        }
    }
}

// Function to update the lives display
function updateLivesDisplay() {
    let maxLives = 3;
    const livesContainer = document.getElementById('lives');
    livesContainer.innerHTML = '';

    for (let i = 0; i < maxLives; i++) {
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('flaticon-heart', 'life-icon');
        if (i < game.lives) {
            // Add the full heart icon if life is active
            heartIcon.classList.add('full-heart');
        } else if (game.usedLives.includes(i)) {
            // Add the empty heart icon if life is lost
            heartIcon.classList.add('empty-heart');
        }
        livesContainer.appendChild(heartIcon);
    }
}