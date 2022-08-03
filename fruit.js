class fruit {

    xPosition;
    yPosition;
    tileSize;
    rows;
    columns;

    constructor(tileSize, rows, columns) {

        this.tileSize = tileSize;
        this.rows = rows;
        this.columns = columns;

    }

    pickNewFruitLocation() {

        this.xPosition = (Math.floor(Math.random() * this.columns - 1) + 1) * this.tileSize;
        this.yPosition = (Math.floor(Math.random() * this.rows - 1) + 1) * this.tileSize;

    }

    draw() {

        game.ctx.fillStyle = "#e31010"
        game.ctx.fillRect(this.xPosition, this.yPosition, this.tileSize, this.tileSize);

    }
}