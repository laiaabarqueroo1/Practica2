class Paddle {
    constructor(positionPoint, width, height) {
        // Paddle properties
        this.width = width;
        this.height = height;
        this.position = positionPoint;
        this.vy = 2;
        this.vx = 2; // velocity = 2 pixels per frame
        this.color = "#D30"; // red
    }

    // Update the paddle's position within canvas bounds
    update(canvasWidth) {
        // Update the position of the paddle based on velocity
        // Ensure the paddle stays within the bounds of the canvas
        if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width > canvasWidth) {
            this.position.x = canvasWidth - this.width;
        }
    }

    // Draw the paddle on the canvas
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.restore();
    }

    // Move the paddle by the given increments
    move(x, y) {
        this.position.x += x;
        this.position.y += y;
    }
}
