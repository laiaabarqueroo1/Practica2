class Wall {
    constructor(canvasWidth, canvasHeight, brickWidth, brickHeight, currentLevel) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.brickWidth = brickWidth;
        this.brickHeight = brickHeight;

        this.currentLevel = currentLevel;
        this.bricks = [];
        this.generateWall();
    }
    generateWall() {
        this.bricks = [];
        const BRICK_SEPARATION_X = 5;
        const BRICK_SEPARATION_Y = 5;
        const levelLayout = this.getBrickStructure(this.currentLevel);

        for (let y = 0; y < levelLayout.length; y++) {
            for (let x = 0; x < levelLayout[y].length; x++) {
                const brickType = levelLayout[y][x];

                const brickColor = this.getColorForType(brickType);
                this.bricks.push(new Brick(
                    new Point(x * (this.brickWidth + BRICK_SEPARATION_X) + BRICK_SEPARATION_X, y * (this.brickHeight + BRICK_SEPARATION_Y) + BRICK_SEPARATION_Y),
                    this.brickWidth,
                    this.brickHeight,
                    brickColor,
                    brickType === 'b', // isBlue
                    brickType === 'g', // isGreen
                    brickType === 'r', // isRed (pink)
                    brickType === 'y', // isYellow (orange)
                    brickType === 'p' // isPurple
                ));
            }
        }
    }

    getColorForType(brickType) {
        const colorForType = {
            'b': "#4F9FF5", // blue
            'g': "#83DD99", // green
            'r': "#F85D98", // pink (red)
            'y': "#FAAD44", // orange (yellow)
            'p': "#A786EB" // purple
        };
        return colorForType[brickType];
    }

    getBrickStructure(currentLevel) {
        const numRows = currentLevel === 0 ? 3 : (currentLevel === 1 ? 4 : 5);
        const numCols = 11;
        // Define the characters representing each brick type
        const brickTypes = ['b', 'g', 'r', 'y', 'p'];
        let probability;
        switch (currentLevel) {
            case 0:


        for (let i = 0; i < numRows; i++) {
            let row = '';
            for (let j = 0; j < numCols; j++) {
                // Randomly select a brick type based on probabilities
                let random = Math.random();
                let selectedType;
                let accumulatedProbability = 0;
                for (let k = 0; k < brickTypes.length; k++) {
                    accumulatedProbability += probability[k];
                    if (random <= accumulatedProbability) {
                        selectedType = brickTypes[k];
                        break;
                    }
                }
                row += selectedType;
            }
            structure.push(row);
        }
        return structure;
    }    
    draw(ctx) {
        this.bricks.forEach(brick => brick.draw(ctx));
    }
    numBricks() {
        return this.bricks.filter(brick => (brick.hit === 1 && brick.color != "#FAAD44")).length;
    }
    checkCollision(ball, game) {
        let trajectory = new Segment(ball.position, new Point(ball.position.x + ball.vx, ball.position.y + ball.vy));
        this.bricks.forEach(brick => {
            if (brick.hit === 1 && brick.pointInsideRectangle(trajectory.pointB.x, trajectory.pointB.y)) {
                brick.handleCollision(ball, game);
            }
        });
    }
}
}