class Wall {
    constructor(canvasWidth, canvasHeight, brickWidth, brickHeight) {
        // Define levels
        this.defineLevels();
        // Track the current level
        this.currentLevel = 0;
        // Array to store the bricks of the current level
        this.bricks = [];
        // Canvas dimensions
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        // Brick dimensions
        this.brickWidth = brickWidth;
        this.brickHeight = brickHeight;
        // Generate the wall layout for the current level
        this.generateWall();
    }

    // Generate the wall layout for the current level
    generateWall() {
        // Clear the current level's bricks
        this.bricks = [];

        // Get the layout of the current level
        const levelLayout = this.levels[this.currentLevel].bricks;

        // Loop through each row of the level layout
        for (let y = 0; y < levelLayout.length; y++) {
            // Loop through each character in the row
            for (let x = 0; x < levelLayout[y].length; x++) {
                // Calculate brick position based on brick width and height
                const brickX = x * this.brickWidth;
                const brickY = y * this.brickHeight;
                
                // Determine brick color based on the layout character
                let brickColor = "#8EE53F"; // GREEN
                if (levelLayout[y][x] === 'b') {
                    brickColor = "#25D9FF"; // BLUE
                } else if (levelLayout[y][x] === 'r') {
                    brickColor = "#FF0000"; // RED
                } else if (levelLayout[y][x] === 'y') {
                    brickColor = "#FFF000"; // YELLOW
                } else if (levelLayout[y][x] === 'p') {
                    brickColor = "#7331D0"; // PURPLE
                }
                   
                // Create a brick object and push it to the bricks array
                const brick = new Brick(new Point(brickX, brickY), this.brickWidth, this.brickHeight, this.levels[this.currentLevel].color);
                this.bricks.push(brick);
            }
        }
    }

    // Draw the wall on the canvas
    draw(ctx) {
        // Draw each brick of the current level
        this.bricks.forEach(brick => {
            brick.draw(ctx);
        });
    }

    // Define levels with colors and brick layouts
    defineLevels() {
        this.levels = [
            {
                bricks: [
                    "bbbbbbbb",
                    "rrrrrrrr",
                    "yyyyyyyy",
                    "pppppppp"
                ]
            }
        ];
    }
}
