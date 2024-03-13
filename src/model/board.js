class Board {
    constructor(game) {
        this.game = game;
        this.numberBlock = 11;
        this.init();
    }

    init() {
        this.sizeHexagon = this.getSizeHexagon();
        this.sizeHeightBlock = this.sizeHexagon * 2;
        this.xAlignment = (this.game.gameWidth - this.sizeHeightBlock * (Math.sqrt(3) / 2) * this.numberBlock) / 2;
        this.yAlignment = (this.game.gameHeight - 0.75 * this.sizeHeightBlock * this.numberBlock) / 2;

        this.data = new Array(this.numberBlock).fill(0).map(() => new Array(this.numberBlock).fill(0));
        
        
        this.hexagons = [];
        this.items = [];
        
        let height = 2 * this.sizeHexagon;
        let width = Math.sqrt(3) * this.sizeHexagon;

        for (let i = 1; i <= this.numberBlock - 2; i++) {
            this.hexagons[i] = [];
            for (let j = 1; j <= this.numberBlock - 2; j++) {
                let xAlignmentHexagon = this.xAlignment + j * width;
                if (i % 2 == 0)
                    xAlignmentHexagon += width / 2;
                let yAlignmentHexagon = this.yAlignment + i * height - i * this.sizeHexagon / 2

                this.hexagons[i][j] = new Hexagon(this.game, width, height, xAlignmentHexagon, yAlignmentHexagon);
            }
        }
        this.items[0] = new Ufo(this.game, width, height, this.hexagons[5][4].xAlignment, this.hexagons[5][4].yAlignment);
        this.items[1] = new Barrier(this.game, width, height, this.hexagons[6][4].xAlignment, this.hexagons[6][4].yAlignment);
        this.items[2] = new Barrier(this.game, width, height, this.hexagons[6][7].xAlignment, this.hexagons[6][7].yAlignment);
        this.items[3] = new Barrier(this.game, width, height, this.hexagons[1][2].xAlignment, this.hexagons[1][2].yAlignment);
        this.items[4] = new Barrier(this.game, width, height, this.hexagons[3][3].xAlignment, this.hexagons[3][3].yAlignment);

    }

    draw() {
        for (let i = 1; i <= this.numberBlock - 2; i++) {
            for (let j = 1; j <= this.numberBlock - 2; j++) {
                this.hexagons[i][j].draw();
            }
        }

        for (let i = 0; i < this.items.length; i++)
            this.items[i].draw();
    }

    getSizeHexagon() {
        let gameWidth = this.game.gameWidth;
        let gameHeight = this.game.gameHeight;
        let sizeHexagonByWidth = gameWidth / (2 * this.numberBlock);
        let sizeHexagonByHeight = gameHeight / (2 * 0.75 * this.numberBlock);
        console.log(sizeHexagonByHeight, sizeHexagonByWidth);
        return Math.min(sizeHexagonByHeight, sizeHexagonByWidth);
    }

}