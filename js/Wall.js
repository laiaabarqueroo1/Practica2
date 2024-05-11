class Wall {
    constructor(canvasWidth, canvasHeight, brickWidth, brickHeight, currentLevel) {
        // Define levels
        this.defineLevels();
        // Track the current level
        this.currentLevel = currentLevel;
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
        console.log("Current level in getBrickQuantity:", currentLevel);
    }

    // Generate the wall layout for the current level
    generateWall() {
        // Clear the current level's bricks
        this.bricks = [];

        // Get the layout of the current level
        const levelLayout = this.levels[this.currentLevel].bricks;
        const BRICK_SEPARATION_X = 10;
        const BRICK_SEPARATION_Y = 10;

        // Loop through each row of the level layout
        for (let y = 0; y < levelLayout.length; y++) {
            // Loop through each character in the row
            for (let x = 0; x < levelLayout[y].length; x++) {
                const brickType = levelLayout[y][x]; // Get the brick type

                // Calculate brick position based on brick width and height
                const brickX = x * (this.brickWidth + BRICK_SEPARATION_X) + BRICK_SEPARATION_X;
                const brickY = y * (this.brickHeight + BRICK_SEPARATION_Y) + BRICK_SEPARATION_Y;

                // Determine brick color based on the layout character
                let brickColor;
                switch (brickType) {
                    case 'b':
                        brickColor = "#25D9FF"; // BLUE
                        break;
                    case 'g':
                        brickColor = "#8EE53F"; // GREEN
                        break;
                    case 'r':
                        brickColor = "#FF0000"; // RED
                        break;
                    case 'y':
                        brickColor = "#FFF000"; // YELLOW
                        break;
                    case 'p':
                        brickColor = "#7331D0"; // PURPLE
                        break;
                }

                // Calculate the quantity of bricks based on type and current level
                const quantity = this.getBrickQuantity(brickType);

                for (let i = 0; i < quantity; i++) {
                    this.bricks.push(new Brick(new Point(brickX + i * (this.brickWidth + BRICK_SEPARATION_X), brickY), this.brickWidth, this.brickHeight, brickColor));
                    this.numBricks++;
                }
            }
        }
    }
   
    // Method to get the quantity of bricks based on brickType and current level
    getBrickQuantity(brickType) {
        console.log("Current level in getBrickQuantity:", this.currentLevel);
        switch (this.currentLevel) {
            case 0: // Level 1
                switch (brickType) {
                    case 'b':
                        return 8; // 8 bricks BLUE
                    case 'g':
                        return 6; // 6 bricks GREEN
                    case 'p':
                        return 2; // 2 bricks PURPLE
                    default:
                        return 0;
                }
            case 1: // Level 2
                switch (brickType) {
                    case 'b':
                        return 5; // 5 bricks BLUE
                    case 'g':
                        return 6; // 6 bricks GREEN
                    case 'r':
                        return 3; // 3 bricks RED
                    case 'p':
                        return 2; // 2 bricks PURPLE
                    default:
                        return 0;
                }
            case 2: // Level 3
                switch (brickType) {
                    case 'y':
                        return 2; // 2 bricks YELLOW
                    case 'b':
                        return 4; // 4 bricks BLUE
                    case 'r':
                        return 5; // 5 bricks RED
                    case 'g':
                        return 4; // 4 bricks GREEN
                    case 'p':
                        return 1; // 1 brick PURPLE
                    default:
                        return 0;
                }
            default:
                return 0;
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
        this.levels = [{
            bricks: [
                "gbryyyrbg",
                "gbrrrrrbg",
                "gbbbbbbbg",
                "ggggggggg",
            ]
        },
        {
            bricks: [
                "gbbbbbbbg",
                "gbryyyrbg",
                "gbrypyrbg",
                "gbrrrrrbg",
                "ggggggggg",
            ]
        },
        {
            bricks: [
                "bgpryrpgb",
                " bgprpgb ",
                "  bgpgb  ",
                "   bgb   ",
                "    b    ",
            ]
        }];
    }
}
