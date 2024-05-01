/* CLASSE PALA */

class Pala {
    constructor(puntPosicio, amplada, alcada) {
        this.amplada = amplada;
        this.alcada = alcada;
        this.posicio = puntPosicio;
        this.vy = 2;
        this.vx = 2; // velocitat = 10 píxels per fotograma
        this.color = "#D30";
    }

    update(canvasWidth) {
        // Update the position of the paddle based on velocity
        // Ensure the paddle stays within the bounds of the canvas
        if (this.posicio.x < 0) {
            this.posicio.x = 0;
        } else if (this.posicio.x + this.amplada > canvasWidth) {
            this.posicio.x = canvasWidth - this.amplada;
        }
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posicio.x, this.posicio.y, this.amplada, this.alcada);
        ctx.restore();

    }

    mou(x, y) {
        this.posicio.x += x;
        this.posicio.y += y;
    }
}