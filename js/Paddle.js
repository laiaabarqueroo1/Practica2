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
        this.width = this.width + (dif * 10);
        if (this.width < 8) {
            this.width = 8;
        }
        if (this.width > 100) {
            this.width = 100;
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
}