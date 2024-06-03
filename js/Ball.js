class Ball {
    constructor(positionPoint, radius) {
        this.radius = radius;
        this.position = positionPoint;
        this.initialPosition = new Point(positionPoint.x, positionPoint.y);
        this.vx = 1;
        this.vy = -1;
        this.out = true;
    };
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    move(dx, dy) {
        this.position.x += dx;
        this.position.y += dy;
    }
    reset() {
        this.position = new Point(this.initialPosition.x, this.initialPosition.y); 
        this.vx = 1;
        this.vy = -1;
        this.out = true;
    }
    update(paddle, wall) {
        let currentPoint = this.position;
        let nextPoint = new Point(this.position.x + this.vx, this.position.y + this.vy);
        let trajectory = new Segment(currentPoint, nextPoint);
        let excess;
        let collision = false;

        // Top side collision
        if (trajectory.pointB.y - this.radius < 0) {
            excess = (trajectory.pointB.y - this.radius) / this.vy;
            this.position.x = trajectory.pointB.x - excess * this.vx;
            this.position.y = this.radius;
            collision = true;
            this.vy = -this.vy;
            // Top side collision sound
            const audioBorder = new Audio('./sounds/HitBorder.wav');
            audioBorder.play();
        }
        // Right side collision
        if (trajectory.pointB.x + this.radius > canvas.width) {
            excess = (trajectory.pointB.x + this.radius - canvas.width) / this.vx;
            this.position.x = canvas.width - this.radius;
            this.position.y = trajectory.pointB.y - excess * this.vy;
            collision = true;
            this.vx = -this.vx;
            // Right side collision sound
            const audioBorder = new Audio('./sounds/HitBorder.wav');
            audioBorder.play();
        }
        // Left side collision
        if (trajectory.pointB.x - this.radius < 0) {
            excess = (trajectory.pointB.x - this.radius) / this.vx;
            this.position.x = this.radius;
            this.position.y = trajectory.pointB.y - excess * this.vy;
            collision = true;
            this.vx = -this.vx;
            // Left side collision sound
            const audioBorder = new Audio('./sounds/HitBorder.wav');
            audioBorder.play();
        }

        // Bottom side collision
        // The ball passes the paddle's position 
        if (trajectory.pointB.y > paddle.position.y + this.radius) {
            excess = (trajectory.pointB.y + this.radius - canvas.height) / this.vy;
            this.position.x = trajectory.pointB.x - excess * this.vx;
            this.position.y = canvas.height - this.radius;
            collision = true;
            this.out = true;                   
            // Lose 1 life
            if (game.lives > 0) {
                loseLife();
                game.usedLives.push(game.lives);
            }            
            this.vy = -this.vy;
        }

        wall.checkCollision(this, game);
       
        // Collision with the paddle
        if (paddle.checkCollision(this, trajectory)) {
            collision = true;
        }
        // Update position if no collision
        if (!collision) {
            this.position.x = trajectory.pointB.x;
            this.position.y = trajectory.pointB.y;
        }

    }
    intersectionSegmentRectangle(segment, rectangle) {
        // 1st: CHECK IF THERE'S AN INTERSECTION POINT IN THE RECTANGLE
        // if there is, WHICH IS THAT POINT
        // if there's more than one, the closest one
        let intersectionPoint;
        let distanceI;
        let minIntersectionPoint;
        let minDistance = Infinity;
        let edgeI;
        // top edge
        let topEdgeSegment = new Segment(rectangle.position,
                             new Point(rectangle.position.x + rectangle.width, rectangle.position.y));
        // bottom edge
        let bottomEdgeSegment = new Segment(rectangle.position,
                                new Point(rectangle.position.x + rectangle.width, rectangle.position.y + rectangle.height));
        // left edge
        let leftEdgeSegment = new Segment(rectangle.position,
                              new Point(rectangle.position.x, rectangle.position.y + rectangle.height));
        // right edge
        let rightEdgeSegment = new Segment(rectangle.position,
                               new Point(rectangle.position.x + rectangle.width, rectangle.position.y + rectangle.height));

        // 2nd: CHECK IF THERE'S AN INTERSECTION POINT IN ONE OF THE 4 SEGMENTS
        // if there is, WHICH IS THAT POINT
        // if there's more than one, the closest one

        // top edge
        intersectionPoint = segment.intersectionPoint(topEdgeSegment);
        if (intersectionPoint) {
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
            distanceI = this.distance(segment.pointA, intersectionPoint);
            if (distanceI < minDistance) {
                minDistance = distanceI;
                minIntersectionPoint = intersectionPoint;
                edgeI = "right";
            }
        }
        if (edgeI) {
            return { intersectionPoint: minIntersectionPoint, edge: edgeI };
        }
    }
    distance(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
