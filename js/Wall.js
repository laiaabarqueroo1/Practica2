class Wall {
    constructor(canvasWidth, canvasHeight, brickWidth, brickHeight, currentLevel) {
        // Track the current level
        this.currentLevel = currentLevel;
        console.log(currentLevel)
        // Array to store the bricks of the current level
        this.bricks = [];
        // Canvas dimensions
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        // Brick dimensions
        this.brickWidth = brickWidth;
        this.brickHeight = brickHeight;
        // Flags for brick colors
        this.isBlue;
        this.isGreen;
        this.isRed;
        this.isYellow;
        this.isPurple;

        // Generate the wall layout for the current level
        this.generateWall();
    }

    // Dentro del método generateWall() de la clase Wall
generateWall() {
    // Clear the current level's bricks
    this.bricks = [];
    // Get the layout of the current level
    const levelLayout = this.getBrickStructure(this.currentLevel);

    const BRICK_SEPARATION_X = 5;
    const BRICK_SEPARATION_Y = 5;

    // Loop through each row of the level layout
    for (let y = 0; y < levelLayout.length; y++) {
        // Loop through each character in the row
        for (let x = 0; x < levelLayout[y].length; x++) {
            const brickType = levelLayout[y][x]; // Get the brick type

            // Determine brick color based on the layout character
            const brickColor = this.getColorForType(brickType);

            // Create brick, passing the color flags
            this.bricks.push(new Brick(
                new Point(x * (this.brickWidth + BRICK_SEPARATION_X) + BRICK_SEPARATION_X, 
                          y * (this.brickHeight + BRICK_SEPARATION_Y) + BRICK_SEPARATION_Y),
                this.brickWidth, 
                this.brickHeight, 
                brickColor, 
                brickType === 'b',  // isBlue
                brickType === 'g',  // isGreen
                brickType === 'r',  // isRed
                brickType === 'y',  // isYellow
                brickType === 'p'   // isPurple
            ));
        }
    }
}


    // Get the color for a given brick type
    getColorForType(brickType) {
        // Define colors for each type
        const colorForType = {
            'b': "#4F9FF5", // BLUE
            'g': "#83DD99", // GREEN
            'r': "#F85D98", // PINK (red)
            'y': "#FAAD44", // ORANGE (yellow)
            'p': "#A786EB"  // PURPLE
        };

        // Set corresponding flag to true based on the brick type
        this.isBlue = brickType === 'b';
        this.isGreen = brickType === 'g';
        this.isRed = brickType === 'r';
        this.isYellow = brickType === 'y';
        this.isPurple = brickType === 'p';

        // Return the color for the given type
        return colorForType[brickType];
    }

    // Get the structure of bricks for the current level
    getBrickStructure(currentLevel) {
        // Define the minimum and maximum number of rows and columns
        const minRows = 3;
        const maxRows = 5;
        const minCols = 11;
        const maxCols = 11;

        // Generate a random number of rows and columns within the defined range
        const numRows = Math.floor(Math.random() * (maxRows - minRows + 1)) + minRows;
        const numCols = Math.floor(Math.random() * (maxCols - minCols + 1)) + minCols;

        // Define the characters representing each brick type
        const brickTypes = ['b', 'g', 'r', 'y', 'p'];
        
        // Adjust probabilities based on level difficulty
        let probability = [0.2, 0.2, 0.25, 0.3, 0.05]; // Default probabilities
        if (currentLevel === 2) {
            probability = [0.2, 0.5, 0.25, 0.3, 0.1]; // Hard level
        } else if (currentLevel === 0) {
            probability = [0.25, 0.5, 0.4, 0.01, 0.01]; // Medium level
        }

        // Initialize an empty structure array
        const structure = [];

        // Generate the structure randomly based on the number of rows and columns
        for (let i = 0; i < numRows; i++) {
            let row = '';
            for (let j = 0; j < numCols; j++) {
                // Randomly select a brick type based on probabilities
                let random = Math.random();
                let accumulatedProbability = 0;
                let selectedType;
                for (let k = 0; k < brickTypes.length; k++) {
                    accumulatedProbability += probability[k];
                    if (random <= accumulatedProbability) {
                        selectedType = brickTypes[k];
                        break;
                    }
                }
                row += selectedType;
            }
            // Add the row to the structure
            structure.push(row);
        }

        return structure;
    }
    
    /* // Jana: Crec que ho podem borrar, ho he posat a Ball, però l'ideal seria posar-ho a Brick
    updateScore() {
        this.score = 0; // Reinicia el puntaje antes de recalcularlo
        
        // Itera sobre todos los ladrillos para calcular el puntaje
        this.bricks.forEach(brick => {
            if (brick.hit === 1) {
                // Añade los puntos del ladrillo al puntaje total, considerando el color
                switch (brick.color) {
                    case '#800080': // Lila
                        this.score += 150;
                        break;
                    case '#FF0000': // Rojo
                        this.score += 20;
                        break;
                    case '#0000FF': // Azul
                        this.score += 10;
                        break;
                    case '#008000': // Verde
                        this.score += 1;
                        break;
                    case '#FFFF00': // Amarillo
                        this.score += 50;
                        break;
                    // Agrega más casos según sea necesario para otros colores
                }
            }
        });
      
        return this.score; // Devuelve el puntaje actualizado
    }
    */

    // Draw the wall on the canvas
    draw(ctx) {
        // Draw each brick of the current level
        this.bricks.forEach(brick => {
            brick.draw(ctx);
        });
    }

    // numBricks que queden per destruir
    numBricks() {
        var n = 0;
        this.bricks.forEach(brick => {
            if (brick.hit === 1) { // FALTA PER FER: No considerar taronjes!!
                n = n + 1; 
            }
        });
        return n;
    }
}
