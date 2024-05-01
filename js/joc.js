/* CLASSE JOC */

class Joc {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.amplada = canvas.width;
        this.alcada = canvas.height;
        this.totxoamplada = 22;
        this.totxoalcada = 10; // MIDES DEL TOTXO EN PÍXELS
        this.totxocolor = 20;

        this.bola = new Bola(new Punt(this.canvas.width / 2, this.canvas.height / 2), 3);
        this.pala = new Pala(new Punt((this.canvas.width - 60) / 2, this.canvas.height - 15), 60, 4);
        this.totxo = new Totxo(new Punt((this.canvas.width - 120) / 2, (this.canvas.height - 20) / 3), 120, 20, "#0ad");  // només posem un totxo gegant

        this.key = {
            LEFT: { code: 37, pressed: false },
            RIGHT: { code: 39, pressed: false }
        };
    }

    draw() {
        this.clearCanvas();
        this.pala.draw(this.ctx);
        this.bola.draw(this.ctx);
        this.totxo.draw(this.ctx);

    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    inicialitza() {
        this.pala.draw(this.ctx);
        this.bola.draw(this.ctx);
        this.totxo.draw(this.ctx);

        const joc = this;
        $(document).on("keydown", function (e) {
            if (e.keyCode === joc.key.LEFT.code) {
                joc.key.LEFT.pressed = true;
            } else if (e.keyCode === joc.key.RIGHT.code) {
                joc.key.RIGHT.pressed = true;
            }
        });

        $(document).on("keyup", function (e) {
            if (e.keyCode === joc.key.LEFT.code) {
                joc.key.LEFT.pressed = false;
            } else if (e.keyCode === joc.key.RIGHT.code) {
                joc.key.RIGHT.pressed = false;
            }
        });
    }

    update() {
        // Update paddle position based on key pressed
        if (this.key.LEFT.pressed) {
            this.pala.moveLeft();
        } else if (this.key.RIGHT.pressed) {
            this.pala.moveRight();
        }

        this.bola.update();
        this.draw();
    }
}
