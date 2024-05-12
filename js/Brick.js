class Brick {
    constructor(positionPoint, width, height, color) {
        // Brick properties
        this.position = positionPoint;
        this.width = width;
        this.height = height;  
        this.color = color;
        this.hit = 1; // Track if the brick has been hit
        
    }

    // Calculate the area of the brick
    get area() {
        return this.width * this.height;
    }

    
    // Handle collision with the ball
    handleCollision() {
        if (this.isYellow && this.hit === 1) {
            // If it's a yellow brick and it's been hit once, it gets destroyed
            return true;
        } else {
            // If it's not yellow or it has already received enough hits, it does not get destroyed
            this.hit++;
            return false;
        }
    }
   
    // Draw the brick on the canvas
    draw(ctx) {
        // Draw the brick if it has been hit at least once, or if it's a yellow brick and has been hit twice
        if (this.hit === 1){
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
            ctx.restore();
        }
    }

    // Check if a point is inside the brick
    pointInsideRectangle(x, y) {
        return (
            x >= this.position.x &&
            x <= this.position.x + this.width &&
            y >= this.position.y &&
            y <= this.position.y + this.height
        );
    }
}
