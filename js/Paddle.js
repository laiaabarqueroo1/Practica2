class Paddle {
    constructor(positionPoint, width, height) {
        this.width = width;
        this.initialWidth = width;
        this.height = height;
        this.initialHeight = height;
        this.position = positionPoint;
        this.initialPosition = new Point(positionPoint.x, positionPoint.y);
        this.vx = 2;
        this.vy = 0;
        this.color = "#D30"; // red
    }
    update(canvasWidth) {
        this.position.x += this.vx;
        if (this.position.x < 0) {
            this.position.x = 0;
        }
        if (this.position.x + this.width > canvasWidth) {
            this.position.x = canvasWidth - this.width;
        }
    }
    reset() {
        this.position = new Point(this.initialPosition.x, this.initialPosition.y);
        this.width = this.initialWidth;
        this.height = this.initialHeight;
    }
    resize(dif) {
        this.width = this.width + (dif * 5);
        if (this.width < 7) {
            this.width = 7;
        }
        if (this.width > 50) {
            this.width = 50;
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.restore();
    }
    move(dx, dy) {
        this.position.x += dx;
        this.position.y += dy;
    }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======

=======
>>>>>>> parent of e40228d (prova)
=======
>>>>>>> parent of 100ff00 (prvoa)
    checkCollision(ball, trajectory) {
        if (trajectory.pointB.y + ball.radius > this.position.y &&
            trajectory.pointB.x > this.position.x &&
            trajectory.pointB.x < this.position.x + this.width) {
            // Reverse the vertical velocity and adjust the position
            ball.position.y = this.position.y - ball.radius;
            ball.vy = -ball.vy; // Invert vertical velocity for bouncing effect

            // Paddle collision sound
            const audioPaddle = new Audio('./sounds/HitBorder.wav');
            audioPaddle.play();
            return true;
        }
        return false;
    }
<<<<<<< HEAD
<<<<<<< HEAD

>>>>>>> parent of ca6c47c (netejant codi x3)
=======
>>>>>>> parent of e40228d (prova)
=======
=======
>>>>>>> parent of cd08400 (petita migració de ball a paddle)
>>>>>>> parent of 100ff00 (prvoa)
}