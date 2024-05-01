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
                // If the character is 'a', create a brick at this position
                if (levelLayout[y][x] === 'a') {
                    // Calculate brick position based on brick width and height
                    const brickX = x * this.brickWidth;
                    const brickY = y * this.brickHeight;
                    // Create a brick object and push it to the bricks array
                    const brick = new Brick(new Point(brickX, brickY), this.brickWidth, this.brickHeight, this.levels[this.currentLevel].color);
                    this.bricks.push(brick);
                }
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
                color: "#4CF", // sky blue
                bricks: [
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                ]
            },
            {
                color: "#8D1", // green
                bricks: [
                    "aaaaaaaaaaaa",
                    "     aa     ",
                    "   aaaaaa   ",
                    "   aaaaaa   ",
                    "     aa     ",
                ]
            },
            {
                color: "#D30", // red
                bricks: [
                    "aaaaaaaaaaaa",
                    "a          a",
                    " a        a ",
                    "aa        aa",
                    "  aaaaaaaa  ",
                ]
            }
        ];
    }
}
