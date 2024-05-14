class Ball {
    constructor(positionPoint, radius) {
        // Ball properties
        this.radius = radius;
        this.position = positionPoint;
        this.vx = 1;
        this.vy = -1;
    };

    // Draw the ball on the canvas
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#FFFFFF";
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    // Move the ball by the given increments
    move(x, y) {
        this.position.x += x;
        this.position.y += y;
    }

    // Update the ball's position and handle collisions
    update(paddle, wall) {
        let currentPoint = this.position;
        let nextPoint = new Point(this.position.x + this.vx,
            this.position.y + this.vy);
        let trajectory = new Segment(currentPoint, nextPoint);
        let excess;
        let collision = false;

        // Collision with the canvas borders
        // Top side collision
        if (trajectory.pointB.y - this.radius < 0) {
            excess = (trajectory.pointB.y - this.radius) / this.vy;
            this.position.x = trajectory.pointB.x - excess * this.vx;
            this.position.y = this.radius;
            collision = true;
            this.vy = -this.vy;
        }
        // Right side collision
        if (trajectory.pointB.x + this.radius > canvas.width) {
            excess = (trajectory.pointB.x + this.radius - canvas.width) / this.vx;
            this.position.x = canvas.width - this.radius;
            this.position.y = trajectory.pointB.y - excess * this.vy;
            collision = true;
            this.vx = -this.vx;
        }
        // Left side collision
        if (trajectory.pointB.x - this.radius < 0) {
            excess = (trajectory.pointB.x - this.radius) / this.vx;
            this.position.x = this.radius;
            this.position.y = trajectory.pointB.y - excess * this.vy;
            collision = true;
            this.vx = -this.vx;
        }
        // Bottom side collision
        if (trajectory.pointB.y + this.radius > canvas.height) {
            excess = (trajectory.pointB.y + this.radius - canvas.height) / this.vy;
            this.position.x = trajectory.pointB.x - excess * this.vx;
            this.position.y = canvas.height - this.radius;
            collision = true;
            this.vy = -this.vy;


        }

        // Collision with the paddle
        if (trajectory.pointB.y + this.radius > paddle.position.y &&
            trajectory.pointB.x > paddle.position.x &&
            trajectory.pointB.x < paddle.position.x + paddle.width) {
            // Reverse the vertical velocity and adjust the position
            this.position.y = paddle.position.y - this.radius;
            this.vy = -this.vy; // Invert vertical velocity for bouncing effect
            collision = true;
        }


        // Collision with wall bricks
        wall.bricks.forEach(brick => {
            if (brick.hit === 1 && brick.pointInsideRectangle(trajectory.pointB.x, trajectory.pointB.y)) {
                collision = true;
                let collisionFromAbove = trajectory.pointA.y < brick.position.y;
                let collisionFromBelow = trajectory.pointB.y > brick.position.y + brick.height;
                let collisionFromLeft = trajectory.pointA.x < brick.position.x;
                let collisionFromRight = trajectory.pointB.x > brick.position.x + brick.width;

                // Adjust the position and direction of the ball based on the collision direction
                if ((collisionFromAbove || collisionFromBelow) && !(collisionFromLeft || collisionFromRight)) {
                    // Collision from above or below
                    this.position.y = collisionFromAbove ? brick.position.y - this.radius : brick.position.y + brick.height + this.radius;
                    this.vx = -this.vx; // Invert vertical velocity for bouncing effect
                } else if (!(collisionFromAbove || collisionFromBelow)) {
                    // Collision from the sides
                    this.position.x = collisionFromLeft ? brick.position.x - this.radius : brick.position.x + brick.width + this.radius;
                    this.vy = -this.vy; // Invert horizontal velocity for bouncing effect
                }

            

                brick.hit = 0; // Mark brick as hit
                
                // Posar so
             

                wall.numBricks = wall.numBricks - 1;

                   
                // Aumentar puntos según el color del ladrillo


                if (wall.numBricks === 0) {
                    finishGame("Win");
                }
            }

        });

         // If there was no collision, update the position
         if (!collision) {
            this.position.x = trajectory.pointB.x;
            this.position.y = trajectory.pointB.y;
            if (this.position.y > canvas.height - 15) {
                loseLife("Lose");
            }
        }
    }


    intersectionSegmentRectangle(segment, rectangle) {

        // 1st: CHECK IF THERE'S AN INTERSECTION POINT IN ONE OF THE 4 SEGMENTS
        // IF THERE IS, WHICH IS THAT POINT
        // if there's more than one, the closest one
        let intersectionPoint;
        let distanceI;
        let minIntersectionPoint;
        let minDistance = Infinity;
        let edgeI;

        // Calculate intersection point with the 4 edges of the rectangle
        // we need to know the 4 segments of the rectangle
        // top edge
        let topEdgeSegment = new Segment(rectangle.position,
            new Point(rectangle.position.x + rectangle.width, rectangle.position.y));
        // bottom edge
        let bottomEdgeSegment = new Segment(rectangle.position,
            new Point(rectangle.position.x + rectangle.width, rectangle.position.y));
        // left edge
        let leftEdgeSegment = new Segment(rectangle.position,
            new Point(rectangle.position.x + rectangle.width, rectangle.position.y));
        // right edge
        let rightEdgeSegment = new Segment(rectangle.position,
            new Point(rectangle.position.x + rectangle.width, rectangle.position.y));

        // 2nd: CHECK IF THERE'S AN INTERSECTION POINT IN ONE OF THE 4 SEGMENTS
        // IF THERE IS, WHICH IS THAT POINT
        // if there's more than one, the closest one

        // top edge
        intersectionPoint = segment.intersectionPoint(topEdgeSegment);
        if (intersectionPoint) {
            // distance between two points, the initial point of the segment and the intersection point
            distanceI = this.distance(segment.pointA, intersectionPoint);
            if (distanceI < minDistance) {
                minDistance = distanceI;
                minIntersectionPoint = intersectionPoint;
                edgeI = "top";
            }
        }
        // bottom edge
        intersectionPoint = segment.intersectionPoint(bottomEdgeSegment);
        if (intersectionPoint) {
            // distance between two points, the initial point of the segment and the intersection point
            distanceI = this.distance(segment.pointA, intersectionPoint);
            if (distanceI < minDistance) {
                minDistance = distanceI;
                minIntersectionPoint = intersectionPoint;
                edgeI = "bottom";
            }
        }

        // left edge
        intersectionPoint = segment.intersectionPoint(leftEdgeSegment);
        if (intersectionPoint) {
            // distance between two points, the initial point of the segment and the intersection point
            distanceI = this.distance(segment.pointA, intersectionPoint);
            if (distanceI < minDistance) {
                minDistance = distanceI;
                minIntersectionPoint = intersectionPoint;
                edgeI = "left";
            }
        }
        // right edge
        intersectionPoint = segment.intersectionPoint(rightEdgeSegment);
        if (intersectionPoint) {
            // distance between two points, the initial point of the segment and the intersection point
            distanceI = this.distance(segment.pointA, intersectionPoint);
            if (distanceI < minDistance) {
                minDistance = distanceI;
                minIntersectionPoint = intersectionPoint;
                edgeI = "right";
            }
        }

        // Returns the edge where the collision occurred, and the point (x,y)
        if (edgeI) {
            return { intersectionPoint: minIntersectionPoint, edge: edgeI };
        }
    }



    // Calculate distance between two points
    distance(p1, p2) {
        return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
    }
}