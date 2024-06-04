class Timer {
    constructor(updateDisplayCallback, timeoutCallback) {
        this.timeLeft = 180;
        this.interval = null;
        this.updateDisplay = updateDisplayCallback;
        this.timeout = timeoutCallback;
    }

    start() {
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay(this.timeLeft);
            if (this.timeLeft === 0) {
                this.timeout.bind(game)('.lose-page');
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
    }

    reset() {
        this.stop();
        this.timeLeft = 180;
        this.updateDisplay(this.timeLeft);
    }
}