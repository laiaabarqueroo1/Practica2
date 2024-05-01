class Brick {
    constructor(positionPoint, width, height, color) {
        // Brick properties
        this.width = width;
        this.height = height;
        this.hit = false; // Track if the brick has been hit
        this.position = positionPoint;
        this.color = color;
    }

    // Calculate the area of the brick
    get area() {
        return this.width * this.height;
    }

    // Draw the brick on the canvas if it hasn't been hit
    draw(ctx) {
        if (!this.hit) {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
            ctx.restore();
        }
    }

    // Check if a point is inside the brick
    pointInsideRectangle(point) {
        return (point.x >= this.position.x && point.x <= this.position.x + this.width) &&
            (point.y >= this.position.y && point.y <= this.position.y + this.height);
    }
}