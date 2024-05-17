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
    document.getElementById("points-count").textContent = `Puntos: ${game.score}`;
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

function togglePopup() {
    const popup = document.getElementById('legend-container');
    popup.classList.toggle('active');
}

function startLevel(level) {
    // Aquí puedes agregar la lógica para inicializar el nivel seleccionado
    console.log('Starting level:', level);
    // Mostrar el popup después de iniciar el nivel
    togglePopup();
}

  // Función para abrir el popup de registro
  function openRegisterPopup() {
    closeLoginPopup();
    document.getElementById("registerPopup").classList.add("active");
}

// Función para cerrar el popup de registro
function closeRegisterPopup() {
    document.getElementById("registerPopup").classList.remove("active");
}

// Función para cerrar el popup de inicio de sesión
function closeLoginPopup() {
    document.getElementById("loginPopup").classList.remove("active");
}

// Event listener para el envío del formulario de inicio de sesión
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario

    // Obtener los valores del formulario
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Verificar si el usuario y la contraseña son correctos (aquí iría la lógica de autenticación con cookies)
    if (userExists(username) && getPassword(username) === password) {
        alert("Inicio de sesión exitoso. ¡Bienvenido, " + username + "!");
        closeLoginPopup();
    } else {
        alert("Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    }
});

// Event listener para el envío del formulario de registro
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que se envíe el formulario

    // Obtener los valores del formulario
    var newUsername = document.getElementById("newUsername").value;
    var newPassword = document.getElementById("newPassword").value;

    // Verificar si el usuario ya existe
    if (userExists(newUsername)) {
        alert("El nombre de usuario ya está en uso. Por favor, elige otro.");
        return;
    }

    // Guardar el nuevo usuario y contraseña (aquí iría la lógica para almacenar los datos en cookies)
    setCookie(newUsername, newPassword, 30);
    alert("¡Usuario registrado correctamente! Ahora puedes iniciar sesión.");
    closeRegisterPopup();
});

// Función para obtener la contraseña de un usuario desde la cookie
function getPassword(username) {
    // Lógica para obtener la contraseña de la cookie
    return "contraseña"; // Por ahora simplemente devolvemos una cadena fija para simularlo
}

// Función para verificar si un usuario ya existe en las cookies
function userExists(username) {
    // Lógica para verificar si el usuario existe en las cookies
    return false; // Por ahora simplemente devolvemos falso para simularlo
}

// Función para establecer una cookie con un nombre, valor y duración específicos
function setCookie(name, value, days) {
    // Lógica para establecer la cookie
    // Aquí deberías implementar el código para establecer una cookie con el nombre, valor y duración especificados
}

