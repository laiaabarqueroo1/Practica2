// Global variables
let game;
let myCanvas;
let ctx;
let currentLevel;
let userName = "";
let userLives = 3;
let gameStatus = 0; // 0: pregame, 1: ingame
let menuContainer;
let timer;
const levelTimes = [180, 240, 300]; // Initial times for levels 0, 1, and 2

$(document).ready(function () {
    myCanvas = document.getElementById("canvas");
    ctx = myCanvas.getContext("2d");

    // Initializing a new game
    newGame();
    document.addEventListener('keydown', startTimerOnSpace);
});

function newGame() {
    $('#principal, #lose-page, #win-page').hide();
    startGame();
    loadTopScores();
}

function startGame() {
    $('#button1').click(() => startNewLevel(0));
    $('#button2').click(() => startNewLevel(1));
    $('#button3').click(() => startNewLevel(2));
}
function showStartPage() {
    $('.end-page').hide();
    $('#principal').hide();
    $('#initial-page').show();
    resetGame();
    newGame();
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
function startTimerOnSpace(event) {
    if (event.code === 'Space') {
        timer.start();
        document.removeEventListener('keydown', startTimerOnSpace); // Remove the event listener after starting the timer
    }
}

//-----GAME MANAGEMENT-----
function startNewLevel(level) {
    $('#initial-page').hide();
    $('#principal').show();
    currentLevel = level;
    gameStatus = 1;
    game = new Game(myCanvas, ctx, currentLevel);
    game.initialize(currentLevel);
    updateLevelDisplay(currentLevel);

    // Create a new timer for the level with appropriate time
    timer = new Timer(levelTimes[currentLevel], updateTimerDisplay, () => mostrarPantalla('.lose-page'));
    updateTimerDisplay(levelTimes[currentLevel]); // Update the display immediately with the initial time

    animation();
    menuContainer = document.getElementById("menu-container");
    fetch("menu.html")
        .then(response => response.text())
        .then(data => {
            menuContainer.innerHTML = data;
            loadMenu.addMenuEventListeners();
        })
        .catch(error => console.error("Error loading menu:", error));
    loadProducts();

    // Start the timer on space bar press
    document.addEventListener('keydown', startTimerOnSpace);
}
function startLevel(level) {
    console.log('Starting level:', level);
    togglePopup();
}
function loseLife() {
    game.principalMusic('STOP'); // Stop the music
    if (userLives > 0) {
        userLives--;
        game.usedLives.push(userLives);
        updateLivesDisplay();
        if (userLives > 0) {
            game.reset();
            timer.stop(); // Stop the timer when a life is lost
            animation();

            // LoseBall sound
            const audioLoseBall = new Audio('./sounds/LoseBall.wav');
            audioLoseBall.play();

            // Resume the timer on space bar press
            document.addEventListener('keydown', startTimerOnSpace);
        } else {
            timer.stop();
            mostrarPantalla('.lose-page');

            // LoseGame sound
            const audioLoseGame = new Audio('./sounds/LoseGame.wav');
            audioLoseGame.play();
        }
    }
}

//-----END GAME MANAGEMENT-----
function mostrarPantalla(page) {
    gameStatus = 0;
    $('#canvas').hide();
    if (page === '.win-page') {
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
function winGame() {
    // WinGame sound
    const audioWinGame = new Audio('./sounds/WinGame.wav');
    audioWinGame.play();

    timer.stop();
    document.getElementById("finalScore").textContent = game.score;
    saveScore(game.score);
    mostrarPantalla('.win-page');
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
    timer.reset();
    animation();
    document.addEventListener('keydown', startTimerOnSpace);
}

//-----UPDATE MANAGEMENT-----
function updateLevelDisplay(currentLevel) {
    document.getElementById("level").textContent = currentLevel + 1;
}

function updateTimerDisplay(timeLeft) {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    document.getElementById("timer").textContent = formattedTime;
}

function updateScoreDisplay() {
    document.getElementById("score").textContent = game.score;
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
        livesContainer.appendChild(heartIcon);
    }
}

//-----SCORES-----
// Function to save the score
function saveScore(score) {
    const loggedInUser = localStorage.getItem('loggedInUser');

    if (!loggedInUser) {
        console.error("No logged-in user found for saving the score.");
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = users.find(user => user.username === loggedInUser);

    if (currentUser) {
        // Initialize games array if it doesn't exist
        currentUser.games = currentUser.games || [];
        currentUser.games.push(score);
        currentUser.totalScore = currentUser.games.reduce((total, gameScore) => total + gameScore, 0);
        if (currentUser.totalScore >= 1500) {
            currentUser.level = "GOLD";
        } else if (currentUser.totalScore >= 350) {
            currentUser.level = "SILVER";
        } else {
            currentUser.level = "BRONZE";
        }
    } else {
        currentUser = {
            username: loggedInUser,
            games: [score],
            totalScore: score,
            level: score >= 1500 ? "GOLD" : score >= 350 ? "SILVER" : "BRONZE"
        };
        users.push(currentUser);
    }

    // Save changes to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Update top scores
    updateTopScores(loggedInUser, score);

    // Load and display top scores
    loadTopScores();
}

// Function to update top scores in localStorage
function updateTopScores(name, score) {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push({ name, score });

    // Sort scores in descending order and keep only the top 5
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 5);

    // Save the updated top scores to localStorage
    localStorage.setItem('scores', JSON.stringify(scores));
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

//-----REGISTER-----
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

// Event listener for the register form submission
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from being submitted

    // Get the values from the register form
    const newUsername = document.getElementById("newUsername").value.trim();
    const newPassword = document.getElementById("newPassword").value.trim();

    // Validate the username and password
    if (!newUsername || !newPassword) {
        alert("Username and password cannot be empty.");
        return;
    }

    // Verify if the user already exists
    if (userExists(newUsername)) {
        alert("The username is already in use. Please choose another one.");
        return;
    }

    // Initialize user data in localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username: newUsername, password: newPassword, score: 0, level: 'BRONZE' });
    localStorage.setItem('users', JSON.stringify(users));

    // Set the new user as the logged-in user
    localStorage.setItem('loggedInUser', newUsername);

    alert("User registered and logged in successfully!");
    closeRegisterPopup();

    // Update UI with new user info
    updateUserInfo(newUsername);
});

function userExists(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username === username);
}

// Event listener for the login form submission
document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from being submitted

    // Get the values from the login form
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validate the username and password
    if (!username || !password) {
        alert("Username and password cannot be empty.");
        return;
    }

    // Verify if the user and password are correct
    if (isValidLogin(username, password)) {
        alert("Login successful. Welcome, " + username + "!");
        closeLoginPopup();

        // Store the logged-in user in localStorage
        localStorage.setItem('loggedInUser', username);

        // Update UI with logged-in user info
        updateUserInfo(username);
    } else {
        alert("Username or password incorrect. Please try again.");
    }
});

function isValidLogin(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);
    return user !== undefined;
}

function updateUserInfo(username) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = users.find(user => user.username === username);

    document.getElementById("points-count").textContent = `Player: ${username}, Points: ${game.score}`;
    document.querySelector('.user-level .points-level').textContent = currentUser.level;
    userLives = 3;
    updateLivesDisplay();
}

function togglePopup() {
    const popup = document.getElementById('legend-container');
    popup.classList.toggle('active');
}

//-----PRODUCT MANAGEMENT-----
/**
 * Load the products based on the redeemed products of the current user.
 * Disable buttons and apply grayscale filter to non-redeemed products.
 * Create a container for each product with an image and a redeemed count.
 */
function loadProducts() {
    const products = [
        { id: 'timemaster', name: 'timemaster', imgSrc: './images/reloj-de-arena.png' },
        { id: 'scoresensei', name: 'scoresensei', imgSrc: './images/diamante.png' },
        { id: 'inmortalizar', name: 'inmortalizar', imgSrc: './images/pocion-de-amor.png' }
    ];

    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        console.error('No user is currently logged in.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.username === loggedInUser);

    if (!currentUser) {
        console.error('Logged-in user not found:', loggedInUser);
        return;
    }

    products.forEach(product => {
        const button = document.getElementById(product.id);
        
        const redeemedCount = currentUser.redeemedProducts ? currentUser.redeemedProducts[product.name] : 0;
       
        const container = document.createElement('div');
        container.classList.add('product-container');
        container.style.filter = redeemedCount > 0 ? 'none' : 'grayscale(100%)';

        if (redeemedCount > 0) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }

        const productImg = document.createElement('img');
        productImg.src = product.imgSrc;
        container.appendChild(productImg);

        const badge = document.createElement('span');
        badge.classList.add('redeem-count');
        badge.textContent = redeemedCount;
        container.appendChild(badge);

        button.innerHTML = '';
        button.appendChild(container);
    });
}

function handleProductClick(productId) {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        console.error('No user is currently logged in.');
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(user => user.username === loggedInUser);

    if (!currentUser) {
        console.error('Logged-in user not found:', loggedInUser);
        return;
    }

    if (!currentUser.redeemedProducts || !currentUser.redeemedProducts[productId]) {
        console.warn(`El producto "${productId}" aún no ha sido redimido por el usuario.`);
        return;
    }

    callback(currentUser);
    currentUser.redeemedProducts[productId]--;

    if (currentUser.redeemedProducts[productId] === 0) {
        delete currentUser.redeemedProducts[productId];
    }

    localStorage.setItem('users', JSON.stringify(users));
    loadProducts();
}


document.getElementById('inmortalizar').addEventListener('click', function() {
    handleProductClick('inmortalizar', () => {
        userLives++;
        updateLivesDisplay();
    });
});

document.getElementById('timemaster').addEventListener('click', function() {
    handleProductClick('timemaster', () => {
        timeLeft += 120;
        updateTimerDisplay();
    });
});

document.getElementById('scoresensei').addEventListener('click', function() {
    handleProductClick('scoresensei', () => {
        game.ball.score *= 2;
        updateScoreDisplay();
    });
});
