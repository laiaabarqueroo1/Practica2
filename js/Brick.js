class Brick {
    constructor(positionPoint, width, height, color) {
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
}