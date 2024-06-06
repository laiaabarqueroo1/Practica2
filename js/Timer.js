class Timer {
    constructor(duration, displayCallback, endCallback) {
        this.duration = duration; // Total time in seconds
        this.timeLeft = duration;
        this.displayCallback = displayCallback; // Function to update the display
        this.endCallback = endCallback; // Function to call when timer ends
        this.intervalId = null;
    }

    start() {
        this.intervalId = setInterval(() => {
            this.timeLeft--;
            if (this.timeLeft <= 0) {
                clearInterval(this.intervalId);
                this.endCallback();
            }
            this.displayCallback(this.timeLeft);
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    reset() {
        this.stop();
        this.timeLeft = this.duration;
        this.displayCallback(this.timeLeft);
    }
}
