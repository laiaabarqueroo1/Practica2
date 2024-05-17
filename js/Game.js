class Game {
    constructor(canvas, ctx, currentLevel) {
        // Canvas and context
        this.canvas = canvas;
        this.ctx = ctx;
        // Canvas dimensions
        this.width = canvas.width;
        this.height = canvas.height;
        // Brick dimensions and color
        this.brickWidth = 22;
        this.brickHeight = 10;
        console.log(currentLevel);
        this.currentLevel = currentLevel;
        this.score = 0;
        this.lives=3;
        // Creating instances of ball, paddle, and brick
        this.paddle = new Paddle(new Point((this.canvas.width - 60) / 2, this.canvas.height - 15), 60, 4);
        this.ball = new Ball(new Point(this.canvas.width / 2, 130), 3);
        this.wall = new Wall(this.width, this.height, this.brickWidth, this.brickHeight, this.currentLevel);
        // Key codes for paddle movement
        this.key = {
            SPACE: { code: 32, pressed: false },
            LEFT: { code: 37, pressed: false },
            RIGHT: { code: 39, pressed: false }
        };
    }

    // Draw all game elements
    draw() {
        this.clearCanvas();
        this.paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.wall.draw(this.ctx);
    }

    // Clear the canvas
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Initialize game
    initialize() {
        this.draw();
        const game = this;
        // Event listeners for paddle movement
        $(document).on("keydown", { game: this }, function (e) {
            if (e.keyCode === game.key.LEFT.code) {
                game.key.LEFT.pressed = true;
            } else if (e.keyCode === game.key.RIGHT.code) {
                game.key.RIGHT.pressed = true;
            } else if (e.keyCode === game.key.SPACE.code && game.ball.out === true) {
                game.key.SPACE.pressed = true;
                game.ball.out = false;
                requestAnimationFrame(animation);
            }
        });

        $(document).on("keyup", { game: this }, function (e) {
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

    // Update game state
    update() {
        // Update paddle position based on key pressed
        if (this.key.LEFT.pressed) {
            // Ensure paddle stays within canvas bounds
            if (this.paddle.position.x > 0) {
                this.paddle.move(-this.paddle.vx, 0);
            }
        } else if (this.key.RIGHT.pressed) {
            // Ensure paddle stays within canvas bounds
            if (this.paddle.position.x + this.paddle.width < this.canvas.width) {
                this.paddle.move(this.paddle.vx, 0);
            }
        }
        // Update score
        //var score = this.wall.updateScore(); // Obtener el puntaje actualizado desde la pared
        //document.getElementById("score").textContent = score;
        // Update ball position based on its own movement logic

        this.ball.update(this.paddle, this.wall);
        this.draw();
    }
}