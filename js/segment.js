class Segment {
    constructor(pointA, pointB) {
        // Segment properties
        this.pointA = pointA;
        this.pointB = pointB;
        this.color = "#3F3"; // green
    }

    // Find intersection point with another segment
    intersectionPoint(segment2) {
        if (this.intersect(segment2)) {
            // Convert segment1 to the general form of a line: Ax+By = C
            let a1 = this.pointB.y - this.pointA.y;
            let b1 = this.pointA.x - this.pointB.x;
            let c1 = a1 * this.pointA.x + b1 * this.pointA.y;

            // Convert segment2 to the general form of a line: Ax+By = C
            let a2 = segment2.pointB.y - segment2.pointA.y;
            let b2 = segment2.pointA.x - segment2.pointB.x;
            let c2 = a2 * segment2.pointA.x + b2 * segment2.pointA.y;

            // Intersection point of two lines
            let d = a1 * b2 - a2 * b1;
            // Parallel lines when d is 0
            if (d != 0) {
                let x = (b2 * c1 - b1 * c2) / d;
                let y = (a1 * c2 - a2 * c1) / d;
                let intersectionPoint = new Point(x, y);	// this point belongs to both lines
                return intersectionPoint;
            }
            if (d == 0) {
                return false;
            } else {
                let x = (b2 * c1 - b1 * c2) / d;
                let y = (a1 * c2 - a2 * c1) / d;
                let intersectionPoint = new Point(x, y);	// this point belongs to both lines
                if (this.containsPoint(this.pointA, this.pointB, intersectionPoint) && this.containsPoint(segment2.pointA, segment2.pointB, intersectionPoint)) {
                    return intersectionPoint;
                }
            }
        }
    }

    // Check if two segments intersect
    intersect(segment2) {
        let s1p1 = this.pointA;
        let s1p2 = this.pointB;
        let s2p1 = segment2.pointA;
        let s2p2 = segment2.pointB;

        function control(p1, p2, p3) {
            return (p2.y - p1.y) * (p3.x - p1.x) < (p3.y - p1.y) * (p2.x - p1.x);
        }
        return (control(s1p1, s1p2, s2p1) != control(s1p1, s1p2, s2p2) && control(s1p1, s2p1, s2p2) != control(s1p2, s2p1, s2p2));
    }

    // Check if a point is contained within a segment
    containsPoint(p1, p2, point) {
        return (this.isValueInsideInterval(p1.x, point.x, p2.x) && this.isValueInsideInterval(p1.y, point.y, p2.y));
    }

    // Check if a value is inside an interval
    isValueInsideInterval(a, b, c) {
        // Returns true if b is between a and c, both excluded
        if (Math.abs(a - b) < 0.000001 || Math.abs(b - c) < 0.000001) { // can't do a==b with real values!!
            return false;
        }
        return (a < b && b < c) || (c < b && b < a);
    }
}
