class Wall {
    constructor(canvasWidth, canvasHeight, brickWidth, brickHeight, level) {
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
        // Define number of bricks
        this.numBricks = 0;
        // Generate the wall layout for the current level
        this.generateWall();
    }

    // Generate the wall layout for the current level
    generateWall() {
        // Clear the current level's bricks
        this.bricks = [];
        this.numBricks = 0;

        // Get the layout of the current level
        const levelLayout = this.levels[this.currentLevel].bricks;
        const BRICK_SEPARATION_X = 10;
        const BRICK_SEPARATION_Y = 10;

        levelLayout.forEach((row, y) => {
            row.split('').forEach((brickType, x) => {
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
                for (let i = 0; i < this.getBrickQuantity(brickType, this.currentLevel); i++) {
                    this.bricks.push(new Brick(new Point(brickX + i * (this.brickWidth + BRICK_SEPARATION_X), brickY), this.brickWidth, this.brickHeight, brickColor));
                    this.numBricks++;
                }

            });
        });
    }

    // Method to get the quantity of bricks based on brickType and current level
    getBrickQuantity(brickType, level) {
        switch (level) {
            case 0: // Nivel 1
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
            case 1: // Nivel 2
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
            case 2: // Nivel 3
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
            }

        ];
    }
}