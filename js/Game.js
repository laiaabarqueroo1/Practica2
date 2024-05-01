class Game {
    constructor(canvas, ctx) {
        // Canvas and context
        this.canvas = canvas;
        this.ctx = ctx;

        // Canvas dimensions
        this.width = canvas.width;
        this.height = canvas.height;

        // Brick dimensions and color
        this.brickWidth = 22;
        this.brickHeight = 10; // Brick dimensions in pixels
        this.brickColor = 20;

        // Creating instances of ball, paddle, and brick
        this.ball = new Ball(new Point(this.canvas.width / 2, this.canvas.height / 2), 3);
        this.paddle = new Paddle(new Point((this.canvas.width - 60) / 2, this.canvas.height - 15), 60, 4);
        this.brick = new Brick(new Point((this.canvas.width - 120) / 2, (this.canvas.height - 20) / 3), 120, 20, "#0ad"); // Only one giant brick

        // Key codes for paddle movement
        this.key = {
            LEFT: { code: 37, pressed: false },
            RIGHT: { code: 39, pressed: false }
        };
    }

    // Draw all game elements
    draw() {
        this.clearCanvas();
        this.paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.brick.draw(this.ctx);
    }

    // Clear the canvas
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Initialize game
    initialize() {
        this.paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.brick.draw(this.ctx);

        const game = this;

        // Event listeners for paddle movement
        $(document).on("keydown", function (e) {
            if (e.keyCode === game.key.LEFT.code) {
                game.key.LEFT.pressed = true;
            } else if (e.keyCode === game.key.RIGHT.code) {
                game.key.RIGHT.pressed = true;
            }
        });

        $(document).on("keyup", function (e) {
            if (e.keyCode === game.key.LEFT.code) {
                game.key.LEFT.pressed = false;
            } else if (e.keyCode === game.key.RIGHT.code) {
                game.key.RIGHT.pressed = false;
            }
        });
    }

    // Update game state
    update() {
        // Update paddle position based on key pressed
        if (this.key.LEFT.pressed) {
            this.paddle.moveLeft();
        } else if (this.key.RIGHT.pressed) {
            this.paddle.moveRight();
        }

        // Update ball position based on its own movement logic
        this.ball.update();
        this.draw();
    }
}