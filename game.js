class game {

    //Objects
    snake;
    fruit;

    // Variables
    static gameCanvas;
    static ctx;
    static points = 0;
    tileSize;
    rows;
    columns;
    gameInterval = 100;

    // Interval object
    interval;

    // Difficulty variable
    static difficulty = "easy";

    constructor() {

        game.gameCanvas = document.querySelector(".game-board");
        game.ctx = game.gameCanvas.getContext("2d");
        this.tileSize = 20;
        this.rows = game.gameCanvas.height / this.tileSize;
        this.columns = game.gameCanvas.width / this.tileSize;

        this.fruit = new fruit(this.tileSize, this.rows, this.columns);
        this.snake = new snake(this.tileSize, this.rows, this.columns, this.fruit);
        this.fruit.pickNewFruitLocation();

        this.startGame();
        this.addEventListeners();

    }

    startGame() {

        this.interval = setInterval(() => {

            // Clearing canvas
            game.ctx.clearRect(0, 0, game.gameCanvas.width, game.gameCanvas.height);

            // Drawing the snake on the screen
            this.snake.checkCollision();
            this.snake.updatePosition();
            this.snake.draw();

            if (this.snake.eatFruit()) {
                this.fruit.pickNewFruitLocation();
            }

            // Drawing the fruit
            this.fruit.draw();
            console.log(this.gameInterval);

        }, this.gameInterval);
    }

    reloadGame() {

        game.ctx.clearRect(0, 0, game.gameCanvas.width, game.gameCanvas.height)

        // Resetting snake position
        this.snake.xPosition = 20;
        this.snake.yPosition = 20;

        // Resetting snake initial speed to right side
        this.snake.xSpeed = this.tileSize;
        this.snake.ySpeed = 0;

        // Resetting points
        game.points = 0;

        // Resetting snake tail
        this.snake.tail = [];
        this.snake.tailSize = 0;

        // clearing interval and restarting game logic loop
        clearInterval(this.interval);
        this.startGame();

    }


    addEventListeners() {

        window.addEventListener("keydown", ((keyEvent) => {

            const direction = keyEvent.keyCode;
            this.snake.changeDirection(direction);

        }));

        // adding difficulty buttons event listeners
        document.getElementById("easy_button").addEventListener("click", () => {
            this.gameInterval = 150;
            game.difficulty = "easy";
            this.reloadGame();
        });

        document.getElementById("medium_button").addEventListener("click", () => {
            this.gameInterval = 100;
            game.difficulty = "medium";
            this.reloadGame();
        });

        document.getElementById("hard_button").addEventListener("click", () => {
            this.gameInterval = 50;
            game.difficulty = "hard";
            this.reloadGame();
        });

        document.getElementById("back_button").addEventListener("click", () => {
            window.location.href="../home";
        })
    }

    // static clearScreen() {
    //
    //      static clear screen method for cleaner code
    //
    // }
}