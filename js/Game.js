class Game {
    constructor(canvas, ctx, currentLevel) {
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

        this.paddle = new Paddle(new Point((this.canvas.width - 60) / 2, this.height - 15), 60, 4);
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
        const game = this;
        $(document).on("keydown", function (e) {
            if (e.keyCode === game.key.LEFT.code) {
                game.key.LEFT.pressed = true;
            } else if (e.keyCode === game.key.RIGHT.code) {
                game.key.RIGHT.pressed = true;
            } else if (e.keyCode === game.key.SPACE.code) {
                if (game.ball.out === true) {
                    game.ball.out = false;
                    requestAnimationFrame(animation);
                }
                game.key.SPACE.pressed = true;                
            }
        });
        $(document).on("keyup", function (e) {
            if (e.keyCode === game.key.LEFT.code) {
                game.key.LEFT.pressed = false;
            } else if (e.keyCode === game.key.RIGHT.code) {
                game.key.RIGHT.pressed = false;
            } else if (e.keyCode === game.key.SPACE.code) {
                game.key.SPACE.pressed = false;
            }
        });
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