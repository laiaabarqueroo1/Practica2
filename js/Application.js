let game;
let myCanvas;
let ctx;
let currentLevel;
let timeLeft = 600;
let timerInterval;
let playerName = "";
let username = "";
let userLives = 3; 

$(document).ready(function () {
    $('#principal, #lose-page, #win-page').hide();
    myCanvas = document.getElementById("canvas");
    ctx = myCanvas.getContext("2d");
    startGame();
    loadTopScores();
    function startGame() {        
        $('#button1').click(function () {
            $('#initial-page').hide();
            $('#principal').show();
            currentLevel = 0;
            game = new Game(myCanvas, ctx, currentLevel);
            game.initialize(currentLevel);
            startTimer();
            updateLevelDisplay(currentLevel);
            animation();
        });
    
        $('#button2').click(function () {
            $('#initial-page').hide();
            $('#principal').show();
            currentLevel = 1;
            game = new Game(myCanvas, ctx, currentLevel);
            game.initialize(currentLevel);
            startTimer();
            updateLevelDisplay(currentLevel);
            animation();
        });
    
        $('#button3').click(function () {
            $('#initial-page').hide();
            $('#principal').show();
            currentLevel = 2;
            game = new Game(myCanvas, ctx, currentLevel);
            game.initialize(currentLevel);
            startTimer();
            updateLevelDisplay(currentLevel);
            animation();
        });
    }    
});
function animation() {
    game.update();
    if (game.ball.out === true) {  
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

    $('.buttonRestart').click(function () {
        $('.end-page').hide();
        $('#canvas').show();
        game = new Game(myCanvas, ctx, currentLevel);
        startTimer();
        animation();
    });

    $('.buttonExit').click(function () {
        $('.end-page').hide();
        $('#principal').hide();
        $('#initial-page').show();
        startGame();
    });
}
function updateLevelDisplay(currentLevel) {
    document.getElementById("level").textContent = currentLevel + 1;
}
function updateScoreDisplay() {
    document.getElementById("score").textContent = game.score;
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
function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    document.getElementById("timer").textContent = formattedTime;
}
function loseLife() {
    if (userLives > 0) {
        userLives--;
        game.usedLives.push(userLives); 
        updateLivesDisplay();
        if (userLives > 0) {
            // LoseBall sound
            const audioLoseBall = new Audio('./sounds/LoseBall.wav');
            audioLoseBall.play();     
        } else {
            // LoseGame sound
            const audioLoseGame = new Audio('./sounds/LoseGame.wav');
            audioLoseGame.play();     
            game.reset();
            animation();
            clearInterval(timerInterval);
            mostrarPantalla('.lose-page');
        }
    }
}
function updateLivesDisplay() {
    const livesContainer = document.getElementById('lives');
    livesContainer.innerHTML = '';
    for (let i = 0; i < userLives; i++) {
        const heartIcon = document.createElement('i');
        heartIcon.classList.add('flaticon-heart', 'life-icon');
        if (i < game.usedLives.length || i < userLives) {
            heartIcon.classList.add('full-heart');
        } 
        //heartIcon.classList.add('empty-heart');
        livesContainer.appendChild(heartIcon);
    }
}
function WinGame() {
    // LoseGame sound
    const audioWinGame = new Audio('./sounds/WinGame.wav');
    audioWinGame.play();     

    clearInterval(timerInterval);
    document.getElementById("finalScore").textContent = game.score;
    saveScore(username, game.score); 
    mostrarPantalla('.win-page');
}

// Function to save the score
function saveScore(name, score) {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ name: name, score: score });
    scores.sort((a, b) => b.score - a.score); 
    scores = scores.slice(0, 5); 
    localStorage.setItem('scores', JSON.stringify(scores));
    loadTopScores();
}

// Function to load and display the top scores
function loadTopScores() {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    for (let i = 0; i < 5; i++) {
        if (scores[i]) {
            document.getElementById(`topname${i + 1}`).textContent = scores[i].name;
            document.getElementById(`topscore${i + 1}`).textContent = scores[i].score;
        } else {
            document.getElementById(`topname${i + 1}`).textContent = 'xxx';
            document.getElementById(`topscore${i + 1}`).textContent = 'xxx';
        }
    }
}

// Function to open the register popup
function openRegisterPopup() {
    closeLoginPopup();
    document.getElementById("registerPopup").classList.add("active");
}

// Function to close the register popup
function closeRegisterPopup() {
    document.getElementById("registerPopup").classList.remove("active");
}

// Function to close the login popup
function closeLoginPopup() {
    document.getElementById("loginPopup").classList.remove("active");
}

// Event listener for the login form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from being submitted

    // Get the values from the login form
    username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Get the stored password from the cookie
    const storedPassword = getCookie(username);

    // Verify if the user and password are correct
    if (storedPassword === password) {
        alert("Login successful. Welcome, " + username + "!");
        closeLoginPopup();
        document.getElementById("points-count").textContent = `Player: ${username}, Points: ${game.score}`;
        userLives = 3;
        updateLivesDisplay();
    } else {
        alert("Username or password incorrect. Please try again.");
    }
});

// Event listener for the register form submission
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from being submitted

    // Get the values from the register form
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;

    // Verify if the user already exists
    if (userExists(newUsername)) {
        alert("The username is already in use. Please choose another one.");
        return;
    }

    // Store the new user and password (this will go in the logic to store the data in cookies)
    setCookie(newUsername, newPassword, 30);
    alert("User registered successfully! Now you can log in.");
    closeRegisterPopup();
});

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

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function togglePopup() {
    const popup = document.getElementById('legend-container');
    popup.classList.toggle('active');
}

function startLevel(level) {
    // Here you can add the logic to start the selected level
    console.log('Starting level:', level);
    // Show the popup after starting the level
    togglePopup();
}

function userExists(username) {
    // Get all the cookies
    const cookies = document.cookie.split(';');

    // Iterate through each cookie to search for the username
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();

        // Verify if the cookie contains the username
        if (cookie.startsWith(username + '=')) {
            // Get the value of the cookie (the password)
            const value = cookie.substring(username.length + 1);
            return value; // Return the value (password) associated with the username
        }
    }

    // If the user does not exist in the cookies, return false
    return false;
}

function toggleMenu() {
    var sidebarMenu = document.getElementById("sidebar-menu");
    sidebarMenu.classList.toggle("active");
    var pointsLink = document.querySelector('#sidebar-menu ul li:nth-child(2) a');
    var changepoints = document.querySelector('#sidebar-menu ul li:nth-child(3) a');
    if (event.target === pointsLink) {
        showPoints(); 
    }
    if (event.target === changepoints) {
        redeemLives(); 
        redeemTime();
    }
}

function redeem() {
    var newWindow = window.open("", "RedeemPoints", "width=400,height=300");
    newWindow.document.write(`
        <html>
        <head>
            <title>Canjear Puntos</title>
            <link rel="stylesheet" href="css/Redeem.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
        
        </head>
        <body>
            <h2>Canjear Puntos</h2>
            <div class="icon-container">
                <div onclick="showDetails('heart')">
                    <i class="fa-solid fa-heart-circle-plus"></i>
                    <p>Incrementar Vidas</p>
                </div>
                <div onclick="showDetails('time')">
                    <i class="fa-sharp fa-solid fa-hourglass-start"></i>
                    <p>Tiempo Extra</p>
                </div>
            </div>
            <div id="heart-card" class="card">
                <i class="fa-solid fa-heart-circle-plus"></i>
                <p>Incrementar Vidas</p>
                <p>Costo: 100 puntos</p>
                <button class="cancel-button" onclick="window.close()">Cancelar</button>
            </div>
            <div id="time-card" class="card">
                <i class="fa-sharp fa-solid fa-hourglass-start"></i>
                <p>Tiempo Extra</p>
                <p>Costo: 50 puntos</p>
                <button class="cancel-button" onclick="window.close()">Cancelar</button>
            </div>
            <script>
                function showDetails(type) {
                    document.getElementById('heart-card').style.display = 'none';
                    document.getElementById('time-card').style.display = 'none';
                    if (type === 'heart') {
                        document.getElementById('heart-card').style.display = 'block';
                    } else if (type === 'time') {
                        document.getElementById('time-card').style.display = 'block';
                    }
                }
            </script>
        </body>
        </html>
    `);
}



function showPoints() {
    var score = game.score;
    var level;

    // Determinar el nivel basado en la cantidad de puntos
    if (score >= 100) {
        level = "Oro";
    } else if (score >= 50) {
        level = "Plata";
    } else {
        level = "Bronce";
    }

    var newWindow = window.open("", "UserPoints", "width=400,height=300");
    newWindow.document.write(`
        <html>
        <head>
            <title>Historial de Puntos y Niveles</title>
            <link rel="stylesheet" href="css/Points.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
            <style>
                /* Estilos CSS adicionales pueden ser agregados aquí */
            </style>
        </head>
        <body>
            <h2>Historial de Puntos y Niveles</h2>
            <h3>Tu Puntuación Actual: ${score} (${level})</h3>

            <!-- Canjear Puntos por Bonos -->
            <h3>Canjear Puntos por Bonos</h3>
            <p>Aquí puedes canjear tus puntos por bonos especiales:</p>
            <ul>
                <li><i class="fa-solid fa-trophy"></i>Nivel Oro: AAcceso a todos los bonos disponibles, incluido el bono de tiempo extra en las partidas.</li>
                <li><i class="fa-solid fa-trophy"></i>Nivel Plata: Se permite el canje de puntos por bonos de tiempo extra en las partidas.</li>
                <li><i class="fa-solid fa-trophy"></i>Nivel Bronce: Acceso básico: Todos los usuarios que se registren obtienen automáticamente el nivel de bronce. No se permite el canje de puntos por bonos de tiempo extra en las partidas.</li>
            </ul>

            <!-- Consejos para Avanzar de Nivel -->
            <h3>Consejos para Avanzar de Nivel</h3>
            <ul>
                <li>Completa los niveles más difíciles para obtener más puntos.</li>
                <li>Participa en eventos especiales para ganar puntos adicionales.</li>
                <li>Mejora tus habilidades para obtener una puntuación más alta.</li>
            </ul>
        </body>
        </html>
    `);
}






