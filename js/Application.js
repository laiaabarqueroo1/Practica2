
let game;
let myCanvas;
let ctx;
let currentLevel;
let timeLeft = 180;
let timerInterval;
let userName = "";
let userLives = 3; 
let gameStatus = 0; // 0: pregame, 1: ingame
let menuContainer;

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
    clearInterval(timerInterval);
    startTimer();
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
    // Alert no va, funció no es crida
    alert("Alert5");
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
    timeLeft = 100;
    updateTimerDisplay();
    clearInterval(timerInterval);
    startTimer();
    animation();
}

function updateLevelDisplay(currentLevel) {
    document.getElementById("level").textContent = currentLevel + 1;
}

function startTimer() {
    alert("Alert6");
    // Alert no va, funció no es crida
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
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = users.find(user => user.username === name);

    if (currentUser) {
        // Agregar la nueva partida al array de partidas del usuario
        currentUser.games.push(score);
        // Calcular el total de puntuaciones
        currentUser.totalScore = currentUser.games.reduce((total, gameScore) => total + gameScore, 0);

        // Actualizar el nivel del usuario basado en su puntuación total
        if (currentUser.totalScore >= 1000) {
            currentUser.level = "Oro";
        } else if (currentUser.totalScore >= 350) {
            currentUser.level = "Plata";
        } else {
            currentUser.level = "Bronce";
        }
    } else {
        // Si el usuario no existe, crearlo
        currentUser = {
            username: name,
            games: [score],
            totalScore: score,
            level: score >= 1000 ? "Oro" : score >= 350 ? "Plata" : "Bronce"
        };
        users.push(currentUser);
    }

    // Guardar los cambios en localStorage
    localStorage.setItem('users', JSON.stringify(users));
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

    // Initialize user data in localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username: newUsername, score: 0, level: 'bronce' });
    localStorage.setItem('users', JSON.stringify(users));

    alert("User registered successfully! Now you can log in.");
    closeRegisterPopup();
});

function userExists(username) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.username === username);
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

        // Store the logged in user in a cookie
        setCookie('loggedInUser', userName, 30); // Set the cookie for 1 day


        let users = JSON.parse(localStorage.getItem('users')) || [];
        let currentUser = users.find(user => user.username === userName);

        document.getElementById("points-count").textContent = `Player: ${userName}, Points: ${game.score}`;
        document.querySelector('.user-level .level').textContent = currentUser.level;
        userLives = 3;
        updateLivesDisplay();
    } else {
        alert("Username or password incorrect. Please try again.");
    }
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
    console.log('Starting level:', level);
    togglePopup();
}


function updateScoreDisplay() {
  document.getElementById("score").textContent = game.score;
      
}


function showStartPage() {
    $('.end-page').hide();
    $('#principal').hide();
    $('#initial-page').show();
    resetGame();
    newGame(); 
}

function loadProducts() {
    const products = [
        { id: 'timemaster', name: 'timemaster', imgSrc: './images/reloj-de-arena.png' },
        { id: 'scoresensei', name: 'scoresensei', imgSrc: './images/diamante.png' },
        { id: 'inmortalizar', name: 'inmortalizar', imgSrc: './images/pocion-de-amor.png' }
    ];

  

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Encontrar el usuario actual
    const currentUser = users.find(user => user.username === userName);

    // Verificar si el usuario actual existe
    if (!currentUser) {
        console.error('Usuario no encontrado:', userName);
        return;
    }

    // Iterar sobre cada producto
    products.forEach(product => {
        const button = document.getElementById(product.id);
        const img = button.querySelector('img');

        // Verificar si el producto ya ha sido redimido por el usuario
        if (!currentUser.redeemedProducts || !currentUser.redeemedProducts[product.name]) {
            console.warn('El producto aún no ha sido redimido por el usuario:', product.name);

            // Si no ha sido redimido, deshabilitar el botón y aplicar filtro de escala de grises a la imagen
            button.disabled = true;
            img.style.filter = 'grayscale(100%)';
            return;
        }

        const redeemedCount = currentUser.redeemedProducts[product.name];

        // Si el producto ha sido redimido, habilitar el botón y eliminar cualquier filtro aplicado a la imagen
        button.disabled = false;
        img.style.filter = 'none';

        // Crear un contenedor div para el botón y el número de redenciones
        const container = document.createElement('div');
        container.classList.add('product-container');

        // Agregar la imagen del producto al contenedor
        const productImg = document.createElement('img');
        productImg.src = product.imgSrc;
        container.appendChild(productImg);

        // Agregar el número de redenciones al contenedor
        const badge = document.createElement('span');
        badge.classList.add('redeem-count');
        badge.textContent = redeemedCount;
        container.appendChild(badge);

        // Reemplazar el contenido del botón con el contenedor
        button.innerHTML = '';
        button.appendChild(container);
    });
}
document.getElementById('inmortalizar').addEventListener('click', function() {
    // Añadir una vida
    userLives++;
    updateLivesDisplay();


    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Encontrar el usuario actual
    const currentUser = users.find(user => user.username === userName);

    // Verificar si el usuario actual existe
    if (!currentUser) {
        console.error('Usuario no encontrado:', userName);
        return;
    }

    // Verificar si el usuario tiene vidas disponibles
    if (userLives <= 0) {
        console.error('El usuario no tiene vidas disponibles.');
        return;
    }

    // Verificar si el usuario ha redimido el producto "inmortalizar"
    if (!currentUser.redeemedProducts || !currentUser.redeemedProducts.inmortalizar) {
        console.warn('El producto "inmortalizar" aún no ha sido redimido por el usuario.');
        return;
    }

    // Disminuir una redención al producto "inmortalizar"
    currentUser.redeemedProducts.inmortalizar--;

    // Guardar los cambios en el localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Actualizar la visualización de productos
    loadProducts();
});


document.getElementById('timemaster').addEventListener('click', function() {
   

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Encontrar el usuario actual
    const currentUser = users.find(user => user.username === userName);

    // Verificar si el usuario actual existe
    if (!currentUser) {
        console.error('Usuario no encontrado:', userName);
        return;
    }

    // Verificar si el usuario ha redimido el producto "timemaster"
    if (!currentUser.redeemedProducts || !currentUser.redeemedProducts.timemaster) {
        console.warn('El producto "timemaster" aún no ha sido redimido por el usuario.');
        return;
    }

    // Incrementar el tiempo restante del juego en 2 minutos (120 segundos)
    timeLeft += 120;

    // Disminuir una redención al producto "timemaster"
    currentUser.redeemedProducts.timemaster--;

    // Guardar los cambios en el localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Actualizar la visualización de productos
    loadProducts();

    // Actualizar la visualización del temporizador
    updateTimerDisplay();
});

document.getElementById('scoresensei').addEventListener('click', function() {
 

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Encontrar el usuario actual
    const currentUser = users.find(user => user.username === userName);

    // Verificar si el usuario actual existe
    if (!currentUser) {
        console.error('Usuario no encontrado:', userName);
        return;
    }

    // Verificar si el usuario ha redimido el producto "scoresensei"
    if (!currentUser.redeemedProducts || !currentUser.redeemedProducts.scoresensei) {
        console.warn('El producto "scoresensei" aún no ha sido redimido por el usuario.');
        return;
    }

    // Multiplicar la puntuación actual del juego por 2
    game.ball.score *= 2;

    // Disminuir una redención al producto "scoresensei"
    currentUser.redeemedProducts.scoresensei--;

    // Guardar los cambios en el localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Actualizar la visualización de productos
    loadProducts();

    // Actualizar la visualización de la puntuación
    updateScoreDisplay();
});





