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

                this.bricks.push(new Brick(new Point(brickX, brickY), this.brickWidth, this.brickHeight, brickColor));
                this.numBricks = this.numBricks + 1;

            });
        });
    }

    // Method to get the quantity of bricks based on brickType
    getBrickQuantity(brickType) {
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