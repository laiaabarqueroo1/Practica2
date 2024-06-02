class Segment {
    constructor(pointA, pointB) {
        this.pointA = pointA;
        this.pointB = pointB;
    }
    intersectionPoint(segment2) {
        if (this.intersect(segment2)) {
            // Ax+By = C (segment1)
            let a1 = this.pointB.y - this.pointA.y;
            let b1 = this.pointA.x - this.pointB.x;
            let c1 = a1 * this.pointA.x + b1 * this.pointA.y;
            // Ax+By = C (segment2)
            let a2 = segment2.pointB.y - segment2.pointA.y;
            let b2 = segment2.pointA.x - segment2.pointB.x;
            let c2 = a2 * segment2.pointA.x + b2 * segment2.pointA.y;
            // Intersection point of two lines
            let d = a1 * b2 - a2 * b1;
            // Parallel lines when d is 0
            if (d !== 0) {
                let x = (b2 * c1 - b1 * c2) / d;
                let y = (a1 * c2 - a2 * c1) / d;
                let intersectionPoint = new Point(x, y); // Both lines
                return intersectionPoint;
            }
            if (d === 0) {
                return false;
            } else {
                let x = (b2 * c1 - b1 * c2) / d;
                let y = (a1 * c2 - a2 * c1) / d;
                let intersectionPoint = new Point(x, y); // Both lines
                // Check if the intersection point is in both segments
                if (this.containsPoint(this.pointA, this.pointB, intersectionPoint) &&
                    this.containsPoint(segment2.pointA, segment2.pointB, intersectionPoint)) {
                    return intersectionPoint;
                }
            }
        }
    }
    intersect(segment2) {
        let s1p1 = this.pointA;
        let s1p2 = this.pointB;
        let s2p1 = segment2.pointA;
        let s2p2 = segment2.pointB;
        function control(p1, p2, p3) {
            return (p2.y - p1.y) * (p3.x - p1.x) < (p3.y - p1.y) * (p2.x - p1.x);
        }
        return (control(s1p1, s1p2, s2p1) !== control(s1p1, s1p2, s2p2) &&
                control(s1p1, s2p1, s2p2) !== control(s1p2, s2p1, s2p2));
    }
    containsPoint(p1, p2, point) {
        return (
            this.isValueInsideInterval(p1.x, point.x, p2.x) &&
            this.isValueInsideInterval(p1.y, point.y, p2.y)
        );
    }
    isValueInsideInterval(a, b, c) {
        return (a < b && b < c) || (c < b && b < a);
    }
}
