class snake {

    // Canvas objects and size
    tileSize;
    rows;
    columns;

    //Fruit object for fruit eat detection
    fruit;

    // Snake properties
    xPosition = 20;
    yPosition = 20;
    xSpeed;
    ySpeed = 0;
    currentDirection = "right";
    tail = [];
    tailSize = 0;

    constructor(tileSize, rows, columns, fruit) {

        this.tileSize = tileSize;
        this.rows = rows;
        this.columns = columns;
        this.xSpeed = tileSize;
        this.fruit = fruit;

    }

    draw() {

        game.ctx.fillStyle = "#53e231";
        for (let i = 0; i < this.tail.length; i++) {
            game.ctx.fillRect(this.tail[i].x, this.tail[i].y, this.tileSize, this.tileSize);
        }

        game.ctx.fillStyle = "#3db121";
        game.ctx.fillRect(this.xPosition, this.yPosition, this.tileSize, this.tileSize);
    }

    updatePosition() {

        // Tail update
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        this.tail[this.tailSize - 1] = { x: this.xPosition, y: this.yPosition };

        // Snake head update and border check
        this.xPosition += this.xSpeed;
        this.yPosition += this.ySpeed;

        if (this.xPosition > game.gameCanvas.height - 20) { // out of bounds checking X-axis
            this.xPosition = 0;
        }

        if (this.xPosition < 0) {
            this.xPosition = game.gameCanvas.height - 20;
        }

        if (this.yPosition > game.gameCanvas.height - 20) { // out of bounds checking Y-axis
            this.yPosition = 0;

        }

        if (this.yPosition < 0) {
            this.yPosition = game.gameCanvas.height - 20;
        }
    }

    changeDirection(newDirection) { // changing direction via arrow keys

        switch (newDirection) {

            case 37: // Left
                if (this.currentDirection !== "right") {
                    this.xSpeed = -this.tileSize;
                    this.ySpeed = 0;
                    this.currentDirection = "left";
                }
                break;

            case 38: // Up
                if (this.currentDirection !== "down") {
                    this.xSpeed = 0;
                    this.ySpeed = -this.tileSize;
                    this.currentDirection = "up";
                }
                break;

            case 39: // Right
                if (this.currentDirection !== "left") {
                    this.xSpeed = this.tileSize;
                    this.ySpeed = 0;
                    this.currentDirection = "right";
                }
                break;

            case 40: // Down
                if (this.currentDirection !== "up") {
                    this.xSpeed = 0;
                    this.ySpeed = this.tileSize;
                    this.currentDirection = "down";
                }
                break;
        }
    }

    checkCollision() {

        for (let i = 0; i < this.tail.length; i++) {

            if (this.xPosition === this.tail[i].x && this.yPosition === this.tail[i].y) {

                this.tailSize = 0;
                this.tail = [];

            }
        }
    }

    eatFruit() { // eating detection

        if (this.xPosition === this.fruit.xPosition && this.yPosition === this.fruit.yPosition) {

            this.tailSize++;
            game.points+= 10; // points on scoreboard

            return true;
        }
        return false;
    }
}