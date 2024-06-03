class Game {
    constructor(canvas, ctx, currentLevel, lives, score) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.width = canvas.width;
        this.height = canvas.height;
        this.brickWidth = 22;
        this.brickHeight = 10;

        this.score = 0;
        this.lives = 3;
        this.usedLives = [];
        this.currentLevel = currentLevel;

        this.paddle = new Paddle(new Point((this.canvas.width - 50) / 2, this.height - 15), 50, 4);
        this.ball = new Ball(new Point(this.canvas.width / 2, 130), 3);
        this.wall = new Wall(this.width, this.height, this.brickWidth, this.brickHeight, this.currentLevel);

        this.key = {
            SPACE: { code: 32, pressed: false },
            LEFT: { code: 37, pressed: false },
            RIGHT: { code: 39, pressed: false }
        };
    }
    draw() {
        this.clearCanvas();
        this.paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.wall.draw(this.ctx);
    }
    reset() {
        this.ball.reset();
        this.paddle.reset();
        this.initialize();
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    initialize() {
        this.draw();

        // Background Music
        const BackgroundMusic = new Audio('./sounds/BackgroundMusic.mp3');
        BackgroundMusic.volume = 0.3; // Adjust the background music volume (0.0 - 1.0)

        BackgroundMusic.addEventListener('ended', () => {
            BackgroundMusic.play();
        });

        BackgroundMusic.play();

        let isMusicPlaying = true;

        function toggleMusic() {
            if (isMusicPlaying) {
                BackgroundMusic.pause();
                document.getElementById('sound-off').style.display = 'none';
                document.getElementById('sound-on').style.display = 'block';
            } else {
                BackgroundMusic.play();
                document.getElementById('sound-off').style.display = 'block';
                document.getElementById('sound-on').style.display = 'none';
            }
            isMusicPlaying = !isMusicPlaying;
        }

        document.getElementById('sound-off').addEventListener('click', toggleMusic);
        document.getElementById('sound-on').addEventListener('click', toggleMusic);

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

        requestAnimationFrame(this.animation.bind(this));
    }
    handleKeyDown(event) {
        switch (event.keyCode) {
            case this.key.LEFT.code:
                this.key.LEFT.pressed = true;
                break;
            case this.key.RIGHT.code:
                this.key.RIGHT.pressed = true;
                break;
            case this.key.SPACE.code:
                if (this.ball.out === true) {
                    this.ball.out = false;
                    this.startTimer();
                    requestAnimationFrame(this.animation.bind(this));
                }
                this.key.SPACE.pressed = true;
                break;
        }
    }
    handleKeyUp(event) {
        switch (event.keyCode) {
            case this.key.LEFT.code:
                this.key.LEFT.pressed = false;
                break;
            case this.key.RIGHT.code:
                this.key.RIGHT.pressed = false;
                break;
            case this.key.SPACE.code:
                this.key.SPACE.pressed = false;
                break;
        }
    }
    animation() {
        this.update();
        if (!this.ball.out) {
            requestAnimationFrame(this.animation.bind(this));
        }
    }
    update() {
        if (this.key.LEFT.pressed && this.paddle.position.x > 0) {
            this.paddle.move(-this.paddle.vx, 0);
        } else if (this.key.RIGHT.pressed && this.paddle.position.x + this.paddle.width < this.canvas.width) {
            this.paddle.move(this.paddle.vx, 0);
        }
        if (!this.ball.out) {
            this.ball.update(this.paddle, this.wall);
        }
        this.draw();
    }
    updateScore(brick) {
        switch (brick.color) {
            case "#A786EB": // PURPLE
                this.score += 150;
                break;
            case "#F85D98": // PINK
                this.score += 20;
                break;
            case "#4F9FF5": // BLUE
                this.score += 10;
                break;
            case "#83DD99": // GREEN
                this.score += 1;
                break;
        }
        this.updateScoreDisplay();
    }
    updateScoreDisplay() {
        let orangeBricks = this.wall.bricks.filter(brick => brick.color === "#FAAD44");
        if (this.wall.numBricks() === 0 || orangeBricks === this.wall.numBricks()) {
            this.winGame();
            return;
        }
    }
    checkWinCondition() {
        let orangeBricks = this.wall.bricks.filter(brick => brick.color === "#FAAD44");
        if (this.wall.numBricks() === 0 || orangeBricks.length === this.wall.numBricks()) {
            this.winGame();
        }
    }
}
