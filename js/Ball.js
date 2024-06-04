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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> parent of e40228d (prova)
=======
>>>>>>> parent of bb05300 (prova)

        wall.checkCollision(this, game);
       
>>>>>>> parent of b843c22 (netenjant codi x2)
        // Collision with the paddle
<<<<<<< HEAD
<<<<<<< HEAD
        if (trajectory.pointB.y + this.radius > paddle.position.y &&
            trajectory.pointB.x > paddle.position.x &&
            trajectory.pointB.x < paddle.position.x + paddle.width) {
            // Reverse the vertical velocity and adjust the position
            this.position.y = paddle.position.y - this.radius;
            this.vy = -this.vy; // Invert vertical velocity for bouncing effect
=======

        // Collision with the wall
        wall.checkCollision(this, game);
       
        // Collision with the paddle
>>>>>>> parent of 100ff00 (prvoa)
=======
=======
>>>>>>> parent of c572a05 (rever changes)
=======
>>>>>>> parent of 4deea90 (Update Ball.js)
        
        // Collision with wall bricks
        wall.bricks.forEach(brick => {
            if (brick.hit === 1 && brick.pointInsideRectangle(trajectory.pointB.x, trajectory.pointB.y)) {
                let collisionFromAbove = trajectory.pointA.y < brick.position.y && trajectory.pointB.y >= brick.position.y;
                let collisionFromBelow = trajectory.pointA.y > brick.position.y + brick.height && trajectory.pointB.y <= brick.position.y + brick.height;
                let collisionFromLeft = trajectory.pointA.x < brick.position.x && trajectory.pointB.x >= brick.position.x;
                let collisionFromRight = trajectory.pointA.x > brick.position.x + brick.width && trajectory.pointB.x <= brick.position.x + brick.width;
                // Adjust the position and direction of the ball according to the collision direction
                if (collisionFromAbove) {
                    this.position.y = brick.position.y - this.radius;
                    this.vy = -this.vy; 
                } else if (collisionFromBelow) {
                    this.position.y = brick.position.y + brick.height + this.radius;
                    this.vy = -this.vy; 
                } else if (collisionFromLeft) {
                    this.position.x = brick.position.x - this.radius;
                    this.vx = -this.vx; 
                } else if (collisionFromRight) {
                    this.position.x = brick.position.x + brick.width + this.radius;
                    this.vx = -this.vx;
                }
                // Mark the brick as hit
                brick.hit = brick.color !== "#FAAD44" ? 0 : brick.hit; // If it's not an orange brick, mark it as hit
                // Properties of bricks according to their colour
                if (brick.color === "#F85D98") {
                    // Pink brick: decrease paddle size
                    paddle.resize(-1.5);
                }
                else if (brick.color === "#83DD99") {
                    // Green brick: increase paddle size
                    paddle.resize(+1);
                }
                else if (brick.color === "#A786EB") {
                    // Purple brick: increase velocity of the ball by 25%
                    this.vx *= 1.25;
                    this.vy *= 1.25;
                }
                // Brick hit sound
                const audioBrick = new Audio('./sounds/HitBrick.wav');
                audioBrick.play();
                
                updateScoreDisplay();
                let orangeBricks = wall.bricks.filter(brick => brick.color === "#FAAD44");
                if (wall.numBricks() === 0 || orangeBricks === wall.numBricks()) {
                    WinGame();
                    return;
                }
            }
        });
<<<<<<< HEAD
<<<<<<< HEAD
             // Collision with the paddle
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of bb05300 (prova)
=======
>>>>>>> parent of d7bdcc8 (migrar de ball)
>>>>>>> parent of 100ff00 (prvoa)
        if (paddle.checkCollision(this, trajectory)) {
>>>>>>> parent of d7bdcc8 (migrar de ball)
=======
        if (paddle.checkCollision(this, trajectory)) {
            collision = true;
        }
=======
      
>>>>>>> parent of c572a05 (rever changes)

        // Collision with the paddle
        if (trajectory.pointB.y + this.radius > paddle.position.y &&
            trajectory.pointB.x > paddle.position.x &&
            trajectory.pointB.x < paddle.position.x + paddle.width) {
            // Reverse the vertical velocity and adjust the position
            this.position.y = paddle.position.y - this.radius;
            this.vy = -this.vy; // Invert vertical velocity for bouncing effect
>>>>>>> parent of 846e657 (restablecer)
            collision = true;
            // Paddle collision sound
            const audioPaddle = new Audio('./sounds/HitBorder.wav');
            audioPaddle.play();
        }
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> parent of 846e657 (restablecer)
        // Collision with wall bricks
        wall.bricks.forEach(brick => {
            if (brick.hit === 1 && brick.pointInsideRectangle(trajectory.pointB.x, trajectory.pointB.y)) {
                let collisionFromAbove = trajectory.pointA.y < brick.position.y && trajectory.pointB.y >= brick.position.y;
                let collisionFromBelow = trajectory.pointA.y > brick.position.y + brick.height && trajectory.pointB.y <= brick.position.y + brick.height;
                let collisionFromLeft = trajectory.pointA.x < brick.position.x && trajectory.pointB.x >= brick.position.x;
                let collisionFromRight = trajectory.pointA.x > brick.position.x + brick.width && trajectory.pointB.x <= brick.position.x + brick.width;
                // Adjust the position and direction of the ball according to the collision direction
                if (collisionFromAbove) {
                    this.position.y = brick.position.y - this.radius;
                    this.vy = -this.vy; 
                } else if (collisionFromBelow) {
                    this.position.y = brick.position.y + brick.height + this.radius;
                    this.vy = -this.vy; 
                } else if (collisionFromLeft) {
                    this.position.x = brick.position.x - this.radius;
                    this.vx = -this.vx; 
                } else if (collisionFromRight) {
                    this.position.x = brick.position.x + brick.width + this.radius;
                    this.vx = -this.vx;
                }
                // Mark the brick as hit
                brick.hit = brick.color !== "#FAAD44" ? 0 : brick.hit; // If it's not an orange brick, mark it as hit
                // Properties of bricks according to their colour
                if (brick.color === "#F85D98") {
                    // Pink brick: decrease paddle size
                    paddle.resize(-1.5);
                }
                else if (brick.color === "#83DD99") {
                    // Green brick: increase paddle size
                    paddle.resize(+1);
                }
                else if (brick.color === "#A786EB") {
                    // Purple brick: increase velocity of the ball by 25%
                    this.vx *= 1.25;
                    this.vy *= 1.25;
                }
                // Brick hit sound
                const audioBrick = new Audio('./sounds/HitBrick.wav');
                audioBrick.play();
                // Increase score according to the colour of the brick hit
                switch (brick.color) {
                    case "#A786EB": // PURPLE
                        game.score += 150;
                        break;
                    case "#F85D98": // PINK (red)
                        game.score += 20;
                        break;
                    case "#4F9FF5": // blue
                        game.score += 10;
                        break;
                    case "#83DD99": // GREEN
                        game.score += 1;
                        break;
                    case "#FAAD44": // ORANGE (yellow)
                        // Do nothing - it's an orange brick
                        break;
                }
<<<<<<< HEAD
                updateScoreDisplay();
                let orangeBricks = wall.bricks.filter(brick => brick.color === "#FAAD44");
                if (wall.numBricks() === 0 || orangeBricks === wall.numBricks()) {
                    WinGame();
                    return;
                }
            }
<<<<<<< HEAD
        });    

<<<<<<< HEAD
=======
=======
>>>>>>> parent of 100ff00 (prvoa)
        // Collision with the paddle
        if (trajectory.pointB.y + this.radius > paddle.position.y &&
            trajectory.pointB.x > paddle.position.x &&
            trajectory.pointB.x < paddle.position.x + paddle.width) {
            // Reverse the vertical velocity and adjust the position
            this.position.y = paddle.position.y - this.radius;
            this.vy = -this.vy; // Invert vertical velocity for bouncing effect
            collision = true;
            // Paddle collision sound
            const audioPaddle = new Audio('./sounds/HitBorder.wav');
            audioPaddle.play();
        }
=======
        
>>>>>>> parent of d158c7d (jjj)
        // Collision with wall bricks
        wall.bricks.forEach(brick => {
            if (brick.hit === 1 && brick.pointInsideRectangle(trajectory.pointB.x, trajectory.pointB.y)) {
                let collisionFromAbove = trajectory.pointA.y < brick.position.y && trajectory.pointB.y >= brick.position.y;
                let collisionFromBelow = trajectory.pointA.y > brick.position.y + brick.height && trajectory.pointB.y <= brick.position.y + brick.height;
                let collisionFromLeft = trajectory.pointA.x < brick.position.x && trajectory.pointB.x >= brick.position.x;
                let collisionFromRight = trajectory.pointA.x > brick.position.x + brick.width && trajectory.pointB.x <= brick.position.x + brick.width;
                // Adjust the position and direction of the ball according to the collision direction
                if (collisionFromAbove) {
                    this.position.y = brick.position.y - this.radius;
                    this.vy = -this.vy; 
                } else if (collisionFromBelow) {
                    this.position.y = brick.position.y + brick.height + this.radius;
                    this.vy = -this.vy; 
                } else if (collisionFromLeft) {
                    this.position.x = brick.position.x - this.radius;
                    this.vx = -this.vx; 
                } else if (collisionFromRight) {
                    this.position.x = brick.position.x + brick.width + this.radius;
                    this.vx = -this.vx;
                }
                // Mark the brick as hit
                brick.hit = brick.color !== "#FAAD44" ? 0 : brick.hit; // If it's not an orange brick, mark it as hit
                // Properties of bricks according to their colour
                if (brick.color === "#F85D98") {
                    // Pink brick: decrease paddle size
                    paddle.resize(-1.5);
                }
                else if (brick.color === "#83DD99") {
                    // Green brick: increase paddle size
                    paddle.resize(+1);
                }
                else if (brick.color === "#A786EB") {
                    // Purple brick: increase velocity of the ball by 25%
                    this.vx *= 1.25;
                    this.vy *= 1.25;
                }
                // Brick hit sound
                const audioBrick = new Audio('./sounds/HitBrick.wav');
                audioBrick.play();
<<<<<<< HEAD
                // Increase score according to the colour of the brick hit
                switch (brick.color) {
                    case "#A786EB": // PURPLE
                        game.score += 150;
                        break;
                    case "#F85D98": // PINK (red)
                        game.score += 20;
                        break;
                    case "#4F9FF5": // blue
                        game.score += 10;
                        break;
                    case "#83DD99": // GREEN
                        game.score += 1;
                        break;
                    case "#FAAD44": // ORANGE (yellow)
                        // Do nothing - it's an orange brick
                        break;
                }
=======
>>>>>>> parent of cd08400 (petita migració de ball a paddle)
=======
                
>>>>>>> parent of d158c7d (jjj)
                updateScoreDisplay();
                let orangeBricks = wall.bricks.filter(brick => brick.color === "#FAAD44");
                if (wall.numBricks() === 0 || orangeBricks === wall.numBricks()) {
                    WinGame();
                    return;
                }
            }
        });
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> parent of d6fba2b (jjj)
      

=======
>>>>>>> parent of b4200f8 (se us actualitza?)
=======
      

>>>>>>> parent of 4deea90 (Update Ball.js)
        // Collision with the paddle
        if (trajectory.pointB.y + this.radius > paddle.position.y &&
            trajectory.pointB.x > paddle.position.x &&
            trajectory.pointB.x < paddle.position.x + paddle.width) {
            // Reverse the vertical velocity and adjust the position
            this.position.y = paddle.position.y - this.radius;
            this.vy = -this.vy; // Invert vertical velocity for bouncing effect
            collision = true;
            // Paddle collision sound
            const audioPaddle = new Audio('./sounds/HitBorder.wav');
            audioPaddle.play();
        }

        

        // Collision with wall bricks
        wall.bricks.forEach(brick => {
            if (brick.hit === 1 && brick.pointInsideRectangle(trajectory.pointB.x, trajectory.pointB.y)) {
                let collisionFromAbove = trajectory.pointA.y < brick.position.y && trajectory.pointB.y >= brick.position.y;
                let collisionFromBelow = trajectory.pointA.y > brick.position.y + brick.height && trajectory.pointB.y <= brick.position.y + brick.height;
                let collisionFromLeft = trajectory.pointA.x < brick.position.x && trajectory.pointB.x >= brick.position.x;
                let collisionFromRight = trajectory.pointA.x > brick.position.x + brick.width && trajectory.pointB.x <= brick.position.x + brick.width;
                // Adjust the position and direction of the ball according to the collision direction
                if (collisionFromAbove) {
                    this.position.y = brick.position.y - this.radius;
                    this.vy = -this.vy; 
                } else if (collisionFromBelow) {
                    this.position.y = brick.position.y + brick.height + this.radius;
                    this.vy = -this.vy; 
                } else if (collisionFromLeft) {
                    this.position.x = brick.position.x - this.radius;
                    this.vx = -this.vx; 
                } else if (collisionFromRight) {
                    this.position.x = brick.position.x + brick.width + this.radius;
                    this.vx = -this.vx;
                }
                // Mark the brick as hit
                brick.hit = brick.color !== "#FAAD44" ? 0 : brick.hit; // If it's not an orange brick, mark it as hit
                // Properties of bricks according to their colour
                if (brick.color === "#F85D98") {
                    // Pink brick: decrease paddle size
                    paddle.resize(-1.5);
                }
                else if (brick.color === "#83DD99") {
                    // Green brick: increase paddle size
                    paddle.resize(+1);
                }
                else if (brick.color === "#A786EB") {
                    // Purple brick: increase velocity of the ball by 25%
                    this.vx *= 1.25;
                    this.vy *= 1.25;
                }
                // Brick hit sound
                const audioBrick = new Audio('./sounds/HitBrick.wav');
                audioBrick.play();
                // Increase score according to the colour of the brick hit
                switch (brick.color) {
                    case "#A786EB": // PURPLE
                        game.score += 150;
                        break;
                    case "#F85D98": // PINK (red)
                        game.score += 20;
                        break;
                    case "#4F9FF5": // blue
                        game.score += 10;
                        break;
                    case "#83DD99": // GREEN
                        game.score += 1;
                        break;
                    case "#FAAD44": // ORANGE (yellow)
                        // Do nothing - it's an orange brick
                        break;
                }
                updateScoreDisplay();
                let orangeBricks = wall.bricks.filter(brick => brick.color === "#FAAD44");
                if (wall.numBricks() === 0 || orangeBricks === wall.numBricks()) {
                    WinGame();
                    return;
                }
            }
        });
             
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> parent of cd08400 (petita migració de ball a paddle)
<<<<<<< HEAD
=======
        if (paddle.checkCollision(this, trajectory)) {
            collision = true;
        }
>>>>>>> parent of e40228d (prova)
=======
>>>>>>> parent of cd08400 (petita migració de ball a paddle)
>>>>>>> parent of 100ff00 (prvoa)
=======
>>>>>>> parent of c572a05 (rever changes)
=======

<<<<<<< HEAD
=======
             
>>>>>>> parent of cd08400 (petita migració de ball a paddle)
>>>>>>> parent of 306543e (mig arreglat)
=======
>>>>>>> parent of b4200f8 (se us actualitza?)
=======
>>>>>>> parent of d158c7d (jjj)
=======
>>>>>>> parent of d6fba2b (jjj)
=======

>>>>>>> parent of 4deea90 (Update Ball.js)
=======
        });
             
>>>>>>> parent of 63a7a0a (Merge branch 'main' of https://github.com/laiaabarqueroo1/Practica2)
        // Update position if no collision
        if (!collision) {
            this.position.x = trajectory.pointB.x;
            this.position.y = trajectory.pointB.y;
        }

    }
    intersectionSegmentRectangle(segment, rectangle) {
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
