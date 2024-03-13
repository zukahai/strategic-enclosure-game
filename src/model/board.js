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
        
        for (let i = 1; i <= this.numberBlock - 2; i++) {
            this.hexagons[i] = [];
            for (let j = 1; j <= this.numberBlock - 2; j++) {
                let height = 2 * this.sizeHexagon;
                let width = Math.sqrt(3) * this.sizeHexagon;
                let xAlignmentHexagon = this.xAlignment + j * width;
                if (i % 2 == 0)
                    xAlignmentHexagon += width / 2;
                let yAlignmentHexagon = this.yAlignment + i * height - i * this.sizeHexagon / 2

                this.hexagons[i][j] = new Hexagon(this.game, width, height, xAlignmentHexagon, yAlignmentHexagon);
            }
        }

    }

    draw() {
        for (let i = 1; i <= this.numberBlock - 2; i++) {
            for (let j = 1; j <= this.numberBlock - 2; j++) {
                this.hexagons[i][j].draw();
            }
        }
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