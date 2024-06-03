class Game {
    constructor(canvas, ctx, currentLevel) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.width = this.canvas.width;
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

        

        function handleKeyDown(event) {
            switch (event.keyCode) {
                case game.key.LEFT.code:
                    game.key.LEFT.pressed = true;
                    break;
                case game.key.RIGHT.code:
                    game.key.RIGHT.pressed = true;
                    break;
                case game.key.SPACE.code:
                    if (game.ball.out === true) {
                        // Preload of sound to avoid delays
                        const audio = new Audio('./sounds/HitBrick.wav');
                        audio.preload = 'auto';

                        game.ball.out = false;
                        clearInterval(timerInterval);
                        startTimer();
                        requestAnimationFrame(animation);
                    }
                    game.key.SPACE.pressed = true;
                    break;
            }
        }

        function handleKeyUp(event) {
            switch (event.keyCode) {
                case game.key.LEFT.code:
                    game.key.LEFT.pressed = false;
                    break;
                case game.key.RIGHT.code:
                    game.key.RIGHT.pressed = false;
                    break;
                case game.key.SPACE.code:
                    game.key.SPACE.pressed = false;
                    break;
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        requestAnimationFrame(animation);
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

}


  

