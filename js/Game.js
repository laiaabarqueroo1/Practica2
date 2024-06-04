class Game {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
    // JBS constructor(canvas, ctx, currentLevel, lives, score) {
>>>>>>> parent of 44d91e3 (Arreglar bugs inici de partida)
=======
>>>>>>> parent of 5f6e40d (prova)
    constructor(canvas, ctx, currentLevel) {
=======
    constructor(canvas, ctx, currentLevel,lives, score) {
>>>>>>> parent of d7bdcc8 (migrar de ball)
<<<<<<< HEAD
=======
    constructor(canvas, ctx, currentLevel, lives, score) {
>>>>>>> parent of 42804e6 (Canvis)
=======
    constructor(canvas, ctx, currentLevel) {
>>>>>>> parent of bb05300 (prova)
=======
>>>>>>> parent of 5f6e40d (prova)
=======
    constructor(canvas, ctx, currentLevel,lives, score) {
>>>>>>> parent of 517f84c (prova)
        this.canvas = canvas;
        this.ctx = ctx;

<<<<<<< HEAD
        this.width = canvas.width;
=======
        // JBS this.width = canvas.width;
        this.width = this.canvas.width;
>>>>>>> parent of 44d91e3 (Arreglar bugs inici de partida)
        this.height = canvas.height;
        this.brickWidth = 22;
        this.brickHeight = 10;

        this.score = 0;
        this.lives = 3;
        this.usedLives = [];
<<<<<<< HEAD
<<<<<<< HEAD
        this.currentLevel = currentLevel;      
=======
        this.currentLevel = currentLevel;    
>>>>>>> parent of d7bdcc8 (migrar de ball)
=======
        this.currentLevel = currentLevel;
>>>>>>> parent of bb05300 (prova)

        this.paddle = new Paddle(new Point((this.canvas.width - 50) / 2, this.height - 15), 50, 4);
        this.ball = new Ball(new Point(this.canvas.width / 2, 130), 3);
        this.wall = new Wall(this.width, this.height, this.brickWidth, this.brickHeight, this.currentLevel);

        this.key = {
            SPACE: { code: 32, pressed: false },
            LEFT: { code: 37, pressed: false },
            RIGHT: { code: 39, pressed: false }
        };
        alert("Gamelinia28");
    }

    draw() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
        // Alert no va, funció no es crida
        alert("Alert1");
>>>>>>> parent of 42804e6 (Canvis)
=======
        // Alert no va, funció no es crida
        alert("Alert draw");
>>>>>>> parent of 44d91e3 (Arreglar bugs inici de partida)
        this.clearCanvas();
        alert("Alert draw1");
        this.paddle.draw(this.ctx);
        alert("Alert draw2");
        this.ball.draw(this.ctx);
        alert("Alert draw3");
        this.wall.draw(this.ctx);
        alert("Alert draw final");
    }

    reset() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
        // Alert no va, funció no es crida
        alert("Alert2");
>>>>>>> parent of 42804e6 (Canvis)
=======
        // Alert no va, funció no es crida
        alert("alert reset");
>>>>>>> parent of 44d91e3 (Arreglar bugs inici de partida)
        this.ball.reset();
        this.paddle.reset();
        this.initialize();
    }

    clearCanvas() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
        // Alert no va, funció no es crida
        alert("Alert3");
>>>>>>> parent of 42804e6 (Canvis)
=======
        alert("AClear canvas inicial");
>>>>>>> parent of 44d91e3 (Arreglar bugs inici de partida)
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        alert("Clear canvas final");
    }

    initialize() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
        // Alert no va, funció no es crida
        alert("Alert4");
>>>>>>> parent of 42804e6 (Canvis)
=======
        // Alert no va, funció no es crida
        alert("Alert initialize");
>>>>>>> parent of 44d91e3 (Arreglar bugs inici de partida)
        this.draw();

        // Background Music
        const BackgroundMusic = new Audio('./sounds/BackgroundMusic.mp3');
        BackgroundMusic.volume = 0.3; // Adjust the background music volume (0.0 - 1.0)

        BackgroundMusic.addEventListener('ended', () => {
            BackgroundMusic.play();
        });

        BackgroundMusic.play();

        let isMusicPlaying = true;

        function toggleMusic() {
            if (isMusicPlaying) {
                BackgroundMusic.pause();
                document.getElementById('sound-off').style.display = 'none';
                document.getElementById('sound-on').style.display = 'block';
            } else {
                BackgroundMusic.play();
                document.getElementById('sound-off').style.display = 'block';
                document.getElementById('sound-on').style.display = 'none';
            }
            isMusicPlaying = !isMusicPlaying;
        }

        document.getElementById('sound-off').addEventListener('click', toggleMusic);
        document.getElementById('sound-on').addEventListener('click', toggleMusic);

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
        requestAnimationFrame(this.animation.bind(this));
    }
    handleKeyDown(event) {
        switch (event.keyCode) {
            case this.key.LEFT.code:
                this.key.LEFT.pressed = true;
                break;
            case this.key.RIGHT.code:
                this.key.RIGHT.pressed = true;
                break;
            case this.key.SPACE.code:
                if (this.ball.out === true) {
                    this.ball.out = false;
                    requestAnimationFrame(this.animation.bind(this));
                }
                this.key.SPACE.pressed = true;
                break;
=======
        function handleKeyDown(event) {
            switch (event.keyCode) {
                case game.key.LEFT.code:
                    game.key.LEFT.pressed = true;
                    break;
                case game.key.RIGHT.code:
                    game.key.RIGHT.pressed = true;
                    break;
                case game.key.SPACE.code:
                    if (game.ball.out === true) {
                        // Preload of sound to avoid delays
                        const audio = new Audio('./sounds/HitBrick.wav');
                        audio.preload = 'auto';

                        game.ball.out = false;
                        clearInterval(timerInterval);
                        startTimer();
                        requestAnimationFrame(animation);
                    }
                    game.key.SPACE.pressed = true;
                    break;
            }
>>>>>>> parent of a4d2059 (.)
        }
    }
    handleKeyUp(event) {
        switch (event.keyCode) {
            case this.key.LEFT.code:
                this.key.LEFT.pressed = false;
                break;
            case this.key.RIGHT.code:
                this.key.RIGHT.pressed = false;
                break;
            case this.key.SPACE.code:
                this.key.SPACE.pressed = false;
                break;
        }
    }
    animation() {
        this.update();
        if (!this.ball.out) {
            requestAnimationFrame(this.animation.bind(this));
        }
=======
>>>>>>> parent of 5f6e40d (prova)
        function handleKeyDown(event) {
            switch (event.keyCode) {
                case game.key.LEFT.code:
                    game.key.LEFT.pressed = true;
                    break;
                case game.key.RIGHT.code:
                    game.key.RIGHT.pressed = true;
                    break;
                case game.key.SPACE.code:
                    if (game.ball.out === true) {
                        // Preload of sound to avoid delays
                        const audio = new Audio('./sounds/HitBrick.wav');
                        audio.preload = 'auto';
<<<<<<< HEAD

                        game.ball.out = false;
                        clearInterval(timerInterval);
                        startTimer() 
                        startTimer();
                        requestAnimationFrame(animation);
                    }
                    game.key.SPACE.pressed = true;

<<<<<<< HEAD
=======
        requestAnimationFrame(this.animation.bind(this));
    }

=======
        requestAnimationFrame(this.animation.bind(this));
    }
>>>>>>> parent of bb05300 (prova)
    handleKeyDown(event) {
        switch (event.keyCode) {
            case this.key.LEFT.code:
                this.key.LEFT.pressed = true;
                break;
            case this.key.RIGHT.code:
                this.key.RIGHT.pressed = true;
                break;
            case this.key.SPACE.code:
                if (this.ball.out === true) {
                    this.ball.out = false;
<<<<<<< HEAD
                    this.startTimer();
                    requestAnimationFrame(this.animation.bind(this));
>>>>>>> parent of b843c22 (netenjant codi x2)
                }
            }
        }
<<<<<<< HEAD
    }
<<<<<<< HEAD
=======
=======

                        game.ball.out = false;
                        clearInterval(timerInterval);
                        startTimer();
                        requestAnimationFrame(animation);
                    }
                    game.key.SPACE.pressed = true;
                    break;
            }
        }
>>>>>>> parent of d7bdcc8 (migrar de ball)

        function handleKeyUp(event) {
            switch (event.keyCode) {
                case game.key.LEFT.code:
                    game.key.LEFT.pressed = false;
                    break;
                case game.key.RIGHT.code:
                    game.key.RIGHT.pressed = false;
                    break;
                case game.key.SPACE.code:
                    game.key.SPACE.pressed = false;
                    break;
            }
=======

=======
                    requestAnimationFrame(this.animation.bind(this));
                }
                this.key.SPACE.pressed = true;
                break;
        }
    }
>>>>>>> parent of bb05300 (prova)
    handleKeyUp(event) {
        switch (event.keyCode) {
            case this.key.LEFT.code:
                this.key.LEFT.pressed = false;
                break;
            case this.key.RIGHT.code:
                this.key.RIGHT.pressed = false;
                break;
            case this.key.SPACE.code:
                this.key.SPACE.pressed = false;
                break;
        }
    }
<<<<<<< HEAD

    startTimer() {
        // Implementar lógica de temporizador si es necesario
    }

=======
>>>>>>> parent of bb05300 (prova)
    animation() {
        this.update();
        if (!this.ball.out) {
            requestAnimationFrame(this.animation.bind(this));
<<<<<<< HEAD
>>>>>>> parent of b843c22 (netenjant codi x2)
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        requestAnimationFrame(animation);
<<<<<<< HEAD
=======
        }
>>>>>>> parent of bb05300 (prova)
=======
>>>>>>> parent of d7bdcc8 (migrar de ball)
>>>>>>> parent of 5f6e40d (prova)
    }

    update() {
        if (this.key.LEFT.pressed && this.paddle.position.x > 0) {
            this.paddle.move(-this.paddle.vx, 0);
        } else if (this.key.RIGHT.pressed && this.paddle.position.x + this.paddle.width < this.canvas.width) {
            this.paddle.move(this.paddle.vx, 0);
        }
        if (!this.ball.out) {
            this.ball.update(this.paddle, this.wall);
        }
        this.draw();
    }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
}
>>>>>>> parent of cd08400 (petita migració de ball a paddle)
=======
    
=======

>>>>>>> parent of b843c22 (netenjant codi x2)
=======
>>>>>>> parent of e40228d (prova)
=======
>>>>>>> parent of bb05300 (prova)
    updateScore(brick) {
        switch (brick.color) {
            case "#A786EB": // PURPLE
                this.score += 150;
                break;
            case "#F85D98": // PINK
                this.score += 20;
                break;
            case "#4F9FF5": // BLUE
                this.score += 10;
                break;
            case "#83DD99": // GREEN
                this.score += 1;
                break;
        }
        this.updateScoreDisplay();
    }
<<<<<<< HEAD
<<<<<<< HEAD
    
=======

=======
>>>>>>> parent of bb05300 (prova)
    updateScoreDisplay() {
        let orangeBricks = this.wall.bricks.filter(brick => brick.color === "#FAAD44");
        if (this.wall.numBricks() === 0 || orangeBricks === this.wall.numBricks()) {
            this.winGame();
            return;
        }
    }

    checkWinCondition() {
        let orangeBricks = this.wall.bricks.filter(brick => brick.color === "#FAAD44");
        if (this.wall.numBricks() === 0 || orangeBricks.length === this.wall.numBricks()) {
            this.winGame();
        }
    }
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of b843c22 (netenjant codi x2)

  
=======

>>>>>>> parent of ca6c47c (netejant codi x3)
}
>>>>>>> parent of d7bdcc8 (migrar de ball)
=======
}
>>>>>>> parent of e40228d (prova)
=======
}
=======
}
>>>>>>> parent of cd08400 (petita migració de ball a paddle)
>>>>>>> parent of bb05300 (prova)
=======
=======
    
>>>>>>> parent of d7bdcc8 (migrar de ball)
    updateScore(brick) {
        switch (brick.color) {
            case "#A786EB": // PURPLE
                this.score += 150;
                break;
            case "#F85D98": // PINK
                this.score += 20;
                break;
            case "#4F9FF5": // BLUE
                this.score += 10;
                break;
            case "#83DD99": // GREEN
                this.score += 1;
                break;
        }
        this.updateScoreDisplay();
        
    }
<<<<<<< HEAD
    updateScoreDisplay() {
        let orangeBricks = this.wall.bricks.filter(brick => brick.color === "#FAAD44");
        if (this.wall.numBricks() === 0 || orangeBricks === this.wall.numBricks()) {
            this.winGame();
            return;
        }
    }
    checkWinCondition() {
        let orangeBricks = this.wall.bricks.filter(brick => brick.color === "#FAAD44");
        if (this.wall.numBricks() === 0 || orangeBricks.length === this.wall.numBricks()) {
            this.winGame();
        }
    }
}
=======
}
>>>>>>> parent of cd08400 (petita migració de ball a paddle)
=======
    

  
}
>>>>>>> parent of d7bdcc8 (migrar de ball)
>>>>>>> parent of 5f6e40d (prova)
