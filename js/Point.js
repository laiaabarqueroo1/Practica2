class Point {
    constructor(x, y) {
        // Point properties
        this.x = x;
        this.y = y;
    }

    // Calculate the distance between two points
    static distanceBetweenTwoPoints(a, b) {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }
}
