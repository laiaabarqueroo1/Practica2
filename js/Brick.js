class Brick {
    constructor(positionPoint, width, height, color, hit) {
        this.position = positionPoint;
        this.width = width;
        this.height = height;
        this.color = color;
        this.hit = 1;
    }
    get area() {
        return this.width * this.height;
    }
    draw(ctx) {
        if (this.hit === 1) {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
            ctx.restore();
        }
    }
    pointInsideRectangle(x, y) {
        return (
            x >= this.position.x &&
            x <= this.position.x + this.width &&
            y >= this.position.y &&
            y <= this.position.y + this.height
        );
    }

    handleCollision(ball, game) {
        let trajectory = new Segment(ball.position, new Point(ball.position.x + ball.vx, ball.position.y + ball.vy));
        let collisionFromAbove = trajectory.pointA.y < this.position.y && trajectory.pointB.y >= this.position.y;
        let collisionFromBelow = trajectory.pointA.y > this.position.y + this.height && trajectory.pointB.y <= this.position.y + this.height;
        let collisionFromLeft = trajectory.pointA.x < this.position.x && trajectory.pointB.x >= this.position.x;
        let collisionFromRight = trajectory.pointA.x > this.position.x + this.width && trajectory.pointB.x <= this.position.x + this.width;

        if (collisionFromAbove) {
            ball.position.y = this.position.y - ball.radius;
            ball.vy = -ball.vy;
        } else if (collisionFromBelow) {
            ball.position.y = this.position.y + this.height + ball.radius;
            ball.vy = -ball.vy;
        } else if (collisionFromLeft) {
            ball.position.x = this.position.x - ball.radius;
            ball.vx = -ball.vx;
        } else if (collisionFromRight) {
            ball.position.x = this.position.x + this.width + ball.radius;
            ball.vx = -ball.vx;
        }

        this.hit = this.color !== "#FAAD44" ? 0 : this.hit;

        if (this.isRed) {
            game.paddle.resize(-1.5);
        } else if (this.isGreen) {
            game.paddle.resize(+1);
        } else if (this.isPurple) {
            ball.vx *= 1.25;
            ball.vy *= 1.25;
        }

        const audioBrick = new Audio('./sounds/HitBrick.wav');
        audioBrick.play();

        game.updateScore(this);
        game.checkWinCondition();
    }
}

    