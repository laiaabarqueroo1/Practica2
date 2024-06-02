class Timer {
    constructor(updateDisplayCallback, timeoutCallback) {
        this.timeLeft = 180;
        this.interval = null;
        this.updateDisplayCallback = updateDisplayCallback;
        this.timeoutCallback = timeoutCallback;
    }

    start() {
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplayCallback(this.timeLeft);
            if (this.timeLeft === 0) {
                this.timeoutCallback('.lose-page');
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
    }

    reset() {
        this.stop();
        this.timeLeft = 180;
        this.updateDisplayCallback(this.timeLeft);
    }
}