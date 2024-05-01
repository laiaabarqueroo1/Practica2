class Mur {
    constructor(canvasWidth, canvasHeight, totxoamplada, totxoalcada) {
        this.defineixNivells();
        this.nivellActual = 0; // Track the current level
        this.mur = []; // Array to store the bricks of the current level
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.totxoamplada = totxoamplada;
        this.totxoalcada = totxoalcada;
    }

    generaMur() {
        // Clear the current level's bricks
        this.mur = [];

        // Get the current level layout
        const levelLayout = this.nivells[this.nivellActual].totxos;

        // Loop through each row of the level layout
        for (let y = 0; y < levelLayout.length; y++) {
            // Loop through each character in the row
            for (let x = 0; x < levelLayout[y].length; x++) {
                // If the character is 'a', create a brick at this position
                if (levelLayout[y][x] === 'a') {
                    // Calculate brick position based on brick width and height
                    const brickX = x * this.totxoamplada;
                    const brickY = y * this.totxoalcada;
                    // Create a brick object and push it to the wall array
                    const brick = new Totxo(new Punt(brickX, brickY), this.totxoamplada, this.totxoalcada, this.nivells[this.nivellActual].color);
                    this.mur.push(brick);
                }
            }
        }
    }

    draw(ctx) {
        // Draw each brick of the current level
        this.mur.forEach(brick => {
            brick.draw(ctx);
        });
    }

    defineixNivells() {
        this.nivells = [
            {
                color: "#4CF", // blue cel
                totxos: [
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                    "aaaaaaaaaaaa",
                ]
            },
            {
                color: "#8D1", // verd
                totxos: [
                    "aaaaaaaaaaaa",
                    "     aa     ",
                    "   aaaaaa   ",
                    "   aaaaaa   ",
                    "     aa     ",
                ]
            },
            {
                color: "#D30", // vermell
                totxos: [
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
