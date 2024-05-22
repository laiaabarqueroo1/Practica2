
let game;
let myCanvas;
let ctx;
let currentLevel;
let timeLeft = 600;
let timerInterval;
let userName = "";
let userLives = 3; 
let gameStatus = 0; // 0: pregame, 1: ingame

$(document).ready(function () {
    myCanvas = document.getElementById("canvas");
    ctx = myCanvas.getContext("2d");
    newGame();
    function newGame() {
        $('#principal, #lose-page, #win-page').hide();
        startGame();
        loadTopScores();
        function startGame() {        
            $('#button1').click(function () {
                startNewLevel(0);
            });
        
            $('#button2').click(function () {
                startNewLevel(1);
            });
        
            $('#button3').click(function () {
                startNewLevel(2);
            });
        }
    }    
});

function startNewLevel(level) {
    $('#initial-page').hide();
    $('#principal').show();
    currentLevel = level;
    gameStatus = 1;
    game = new Game(myCanvas, ctx, currentLevel);
    game.initialize(currentLevel);
    updateLevelDisplay(currentLevel);
    startTimer();
    animation();
}

function animation() {
    if (gameStatus === 1) {
        game.update();
        if (game.ball.out === true) {  
            cancelAnimationFrame(animation);
        } else {
            requestAnimationFrame(animation);
        }
    }
}

document.addEventListener("DOMContentLoaded", function () {
    updateTimerDisplay();
});

function mostrarPantalla(text) {
    gameStatus = 0;
    $('#canvas').hide();
    if (text === '.win-page') {
        $('#win-page').show();
    } else {
        $('#lose-page').show();
    }
 
    $('.buttonRestart').click(function () {
        gameStatus = 1;
        resetGame();
    });

    $('.buttonExit').click(function () {
        $('.end-page').hide();
        $('#principal').hide();
        $('#initial-page').show();
        resetGame();
        newGame(); 
    });
}
function resetGame() {
    $('#canvas').show();
    $('.end-page').hide();
    userLives = 3; 
    updateLivesDisplay();
    game.score = 0;
    updateScoreDisplay();
    game = new Game(myCanvas, ctx, currentLevel);
    game.initialize(currentLevel);
    game.reset();
    timeLeft = 600;
    updateTimerDisplay();
    startTimer();
    animation();
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
            mostrarPantalla('.lose-page');
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
            game.reset();
            clearInterval(timerInterval);
            animation(); 
            // LoseBall sound
            const audioLoseBall = new Audio('./sounds/LoseBall.wav');
            audioLoseBall.play();
        } else {
            clearInterval(timerInterval);
            mostrarPantalla('.lose-page');
            // LoseGame sound
            const audioLoseGame = new Audio('./sounds/LoseGame.wav');
            audioLoseGame.play();
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
    saveScore(userName, game.score); 
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
    userName = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Get the stored password from the cookie
    const storedPassword = getCookie(userName);

    // Verify if the user and password are correct
    if (storedPassword === password) {
        alert("Login successful. Welcome, " + userName + "!");
        closeLoginPopup();
        document.getElementById("points-count").textContent = `Player: ${userName}, Points: ${game.score}`;
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
    var userinfo = document.querySelector('#sidebar-menu ul li:nth-child(1) a');
    if (event.target === pointsLink) {
        showPoints(); 
    }
    if (event.target === changepoints) {
        redeem(type); 
        
    }
    if (event.target === userinfo) {
        userinfo(type); 
        
    }
}

function redeem(type) {
    
    document.getElementById('heart-card').style.display = 'none';
    document.getElementById('time-card').style.display = 'none';

    
    if (type === 'heart') {
        document.getElementById('heart-card').style.display = 'block';
    } else if (type === 'time') {
        document.getElementById('time-card').style.display = 'block';
    }
    window.open('./reedem.html');
}

function showPoints() {
    var newScore = game.score;
    var userName = localStorage.getItem('currentUser');
    var users = JSON.parse(localStorage.getItem('users')) || {};

    if (!users[userName]) {
        users[userName] = { score: 0, level: "Bronce" };
    }

    users[userName].score += newScore;

    // Determinar el nivel basado en la cantidad de puntos acumulados
    if (users[userName].score >= 1000) {
        users[userName].level = "Oro";
    } else if (users[userName].score >= 350) {
        users[userName].level = "Plata";
    } else {
        users[userName].level = "Bronce";
    }

    // Almacenar los valores actualizados en localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Abrir la página 'showpoints.html'
    window.open('./showpoints.html');
}

function userinfo(){
    window.open('./user.html');
}










