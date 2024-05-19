let game;
let myCanvas;
let ctx;
let currentLevel;
let timeLeft = 600;
let timerInterval;
let playerName = "";
let username = "";
let userLives = 3; // Add the user lives variable to keep track of the lives

$(document).ready(function () {
    $('#principal, #lose-page, #win-page').hide();
    myCanvas = document.getElementById("canvas");
    ctx = myCanvas.getContext("2d");
    startGame();
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
    mostrarPantalla('.win-page');
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


