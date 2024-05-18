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

    // Obtener la contraseña almacenada en la cookie
    var storedPassword = getCookie(username);

    // Verificar si el usuario y la contraseña son correctos
    if (storedPassword === password) {
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
// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }
    return "";
}

// Función para establecer una cookie con un nombre, valor y duración específicos
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function userExists(username) {
    // Obtener todas las cookies
    const cookies = document.cookie.split(';');
    
    // Iterar sobre cada cookie para buscar el nombre de usuario
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        
        // Verificar si la cookie contiene el nombre de usuario
        if (cookie.startsWith(username + '=')) {
            // Obtener el valor de la cookie (el password)
            const value = cookie.substring(username.length + 1);
            return value; // Devolver el valor (password) asociado al usuario
        }
    }
    
    // Si el usuario no existe en las cookies, devolver false
    return false;
}


function updateScoreDisplay() {
   
    // Actualizar el puntaje en el elemento "score" y "points-count"
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
            console.log(username);
            document.getElementById("points-count").textContent = `Player: ${username}, Points: ${game.score}`;
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


