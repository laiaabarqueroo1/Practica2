class GameApp {
    constructor() {
        this.game = null;
        this.myCanvas = document.getElementById("canvas");
        this.ctx = this.myCanvas.getContext("2d");
        this.currentLevel = null;
        this.timer = new Timer(this.updateTimerDisplay.bind(this), this.showScreen.bind(this));
        this.user = new User();
        this.uiManager = new UIManager();
        this.menuLoader = new MenuLoader();
        this.productManager = new ProductManager(this.user, this.timer, this.uiManager);

        this.setupEventListeners();
    }
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> parent of 38e04c3 (pre-application)
=======
>>>>>>> parent of 38e04c3 (pre-application)
    setupEventListeners() {
        $('#button1').click(() => this.startNewLevel(0));
        $('#button2').click(() => this.startNewLevel(1));
        $('#button3').click(() => this.startNewLevel(2));
        document.getElementById('registerForm').addEventListener('submit', this.registerUser.bind(this));
        document.getElementById('loginForm').addEventListener('submit', this.loginUser.bind(this));
        document.getElementById('inmortalizar').addEventListener('click', () => this.productManager.useProduct('inmortalizar'));
        document.getElementById('timemaster').addEventListener('click', () => this.productManager.useProduct('timemaster'));
        document.getElementById('scoresensei').addEventListener('click', () => this.productManager.useProduct('scoresensei'));
        $(document).ready(() => this.newGame());
    }
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> parent of 38e04c3 (pre-application)
=======
>>>>>>> parent of 38e04c3 (pre-application)
    newGame() {
        $('#principal, #lose-page, #win-page').hide();
        this.uiManager.showInitialPage();
        this.loadTopScores();
    }
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> parent of 38e04c3 (pre-application)
=======
>>>>>>> parent of 38e04c3 (pre-application)
    startNewLevel(level) {
        $('#initial-page').hide();
        $('#principal').show();
        this.currentLevel = level;
        this.game = new Game(this.myCanvas, this.ctx, level);
        this.game.initialize();
        this.uiManager.updateLevelDisplay(level);
        this.timer.reset();
        this.timer.start();
        this.animate();
        this.menuLoader.loadMenu();
        this.productManager.loadProducts();
    }
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> parent of 38e04c3 (pre-application)
=======
>>>>>>> parent of 38e04c3 (pre-application)
    animate() {
        if (this.game.status === 1) {
            this.game.update();
            if (!this.game.isBallOut()) {
                requestAnimationFrame(this.animate.bind(this));
            }
        }
    }
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> parent of 38e04c3 (pre-application)
=======
>>>>>>> parent of 38e04c3 (pre-application)
    showScreen(screen) {
        this.uiManager.showScreen(screen);
        this.timer.stop();
        $('.buttonRestart').click(() => {
            this.game.status = 1;
            this.resetGame();
        });
        $('.buttonExit').click(() => {
            this.uiManager.showInitialPage();
            this.resetGame();
            this.newGame();
        });
    }
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> parent of 38e04c3 (pre-application)
=======
>>>>>>> parent of 38e04c3 (pre-application)
    resetGame() {
        this.uiManager.resetGame();
        this.user.resetLives();
        this.uiManager.updateLivesDisplay(this.user.lives);
        this.game.reset();
        this.timer.reset();
        this.timer.start();
        this.animate();
    }
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> parent of 38e04c3 (pre-application)
=======
>>>>>>> parent of 38e04c3 (pre-application)
    registerUser(event) {
        event.preventDefault();
        const username = document.getElementById("newUsername").value;
        const password = document.getElementById("newPassword").value;
        if (this.user.exists(username)) {
            alert("The username is already in use. Please choose another one.");
            return;
        }
        this.user.register(username, password);
        alert("User registered successfully! Now you can log in.");
        this.uiManager.closeRegisterPopup();
    }
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> parent of 38e04c3 (pre-application)
=======
>>>>>>> parent of 38e04c3 (pre-application)
    loginUser(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        if (this.user.login(username, password)) {
            alert("Login successful. Welcome, " + username + "!");
            this.uiManager.closeLoginPopup();
            this.uiManager.updateUserDisplay(username, this.user.getScore(username), this.user.getLevel(username));
            this.user.resetLives();
            this.uiManager.updateLivesDisplay(this.user.lives);
        } else {
            alert("Username or password incorrect. Please try again.");
        }
    }
<<<<<<< HEAD
<<<<<<< HEAD

    updateTimerDisplay(timeLeft) {
        this.uiManager.updateTimerDisplay(timeLeft);
    }

=======
    updateTimerDisplay(timeLeft) {
        this.uiManager.updateTimerDisplay(timeLeft);
    }
>>>>>>> parent of 38e04c3 (pre-application)
=======
    updateTimerDisplay(timeLeft) {
        this.uiManager.updateTimerDisplay(timeLeft);
    }
>>>>>>> parent of 38e04c3 (pre-application)
    loadTopScores() {
        const scores = this.user.getTopScores();
        this.uiManager.updateTopScoresDisplay(scores);
    }
}
