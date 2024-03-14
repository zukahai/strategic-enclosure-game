class Board {
    constructor(game) {
        this.game = game;
        this.numberBlock = 11;
        this.levels = new Level().levels;
        this.level = 5;
        this.initVariable();
        this.initData();
    }

    initVariable() {
        this.data = new Array(this.numberBlock).fill(0).map(() => new Array(this.numberBlock).fill(0));
        this.hexagons = new Array(this.numberBlock).fill(0).map(() => new Array(this.numberBlock).fill(0));
        this.items = new Array(this.numberBlock).fill(0).map(() => new Array(this.numberBlock).fill(0));
        this.initBoardHexagon();
    }

    initBoardHexagon() {
        this.sizeHexagon = this.getSizeHexagon();
        this.sizeHeightBlock = this.sizeHexagon * 2;
        this.xAlignment = (this.game.gameWidth - this.sizeHeightBlock * (Math.sqrt(3) / 2) * this.numberBlock) / 2;
        this.yAlignment = (this.game.gameHeight - 0.75 * this.sizeHeightBlock * this.numberBlock) / 2;

        this.hexagons = [];
        // this.items = [];

        for (let i = 1; i <= this.numberBlock - 2; i++) {
            this.hexagons[i] = [];
            for (let j = 1; j <= this.numberBlock - 2; j++) {
                const { width, height, xAlignmentHexagon, yAlignmentHexagon } = this.getPosition(i, j)
                this.hexagons[i][j] = new Hexagon(this.game, width, height, xAlignmentHexagon, yAlignmentHexagon);
            }
        }
    }

    getPosition(i, j) {
        let height = 2 * this.sizeHexagon;
        let width = Math.sqrt(3) * this.sizeHexagon;

        let xAlignmentHexagon = this.xAlignment + j * width;
        if (i % 2 == 0)
            xAlignmentHexagon += width / 2;
        let yAlignmentHexagon = this.yAlignment + i * height - i * this.sizeHexagon / 2
        return { width, height, xAlignmentHexagon, yAlignmentHexagon };
    }

    setLevel(level) {
        this.initVariable();
        this.data = new Array(this.numberBlock).fill(0).map(() => new Array(this.numberBlock).fill(0));

        this.dataFile = this.levels[level];
        for (let i = 1; i <= this.dataFile.length; i++)
            for (let j = 1; j <= this.dataFile.length; j++)
                this.data[i][j] = this.dataFile[i - 1][j - 1];
        this.data[0] = new Array(this.numberBlock).fill(5);
        this.data[this.numberBlock - 1] = new Array(this.numberBlock).fill(5);
        this.data = this.data.map((row) => {
            row[0] = row[this.numberBlock - 1] = 5;
            return row;
        })

        this.setItemBoard();
        for (let i = 0; i < this.data.length; i++)
            for (let j = 0; j < this.data.length; j++)
                if (this.data[i][j] == 2) {
                    this.postionUfo = {row: i, column: j};
                    break;
                }
        this.setItemBoard();
    }

    getColumnAndRowByPositon(x, y) {
        let row = -1;
        let column = -1;
        let minDistance = 1000 * this.sizeHexagon;
        for (let i = 1; i <= this.numberBlock - 2; i++) {
            for (let j = 1; j <= this.numberBlock - 2; j++) {
                let xCenter = this.hexagons[i][j].xAlignment + this.hexagons[i][j].width / 2;
                let yCenter = this.hexagons[i][j].yAlignment + this.hexagons[i][j].height / 2;
                let distance = Math.sqrt(Math.pow(x - xCenter, 2) + Math.pow(y - yCenter, 2));
                if (distance < minDistance && distance <= 2 * this.sizeHexagon) {
                    minDistance = distance;
                    row = i;
                    column = j;
                }
            }
        }
        return { row, column }
    }

    initData() {
        this.setLevel(this.level);
        // console.log("Done init");
    }

    setItemBoard() {
        for (let i = 1; i < this.numberBlock - 1; i++)
            for (let j = 1; j < this.numberBlock - 1; j++) {
                const { width, height, xAlignmentHexagon, yAlignmentHexagon } = this.getPosition(i, j)
                switch (this.data[i][j]) {
                    case 1:
                        this.items[i][j] = new Barrier(this.game, width, height, xAlignmentHexagon, yAlignmentHexagon);
                        break;
                    case 2:
                        this.items[i][j] = new Ufo(this.game, width, height, xAlignmentHexagon, yAlignmentHexagon);
                        this.postionUfo = {
                            row: i,
                            column: j,
                        }
                        break;
                    default:
                        this.items[i][j] = 0;
                }
            }
    }

    draw() {
        for (let i = 1; i <= this.numberBlock - 2; i++) {
            for (let j = 1; j <= this.numberBlock - 2; j++) {
                this.hexagons[i][j].draw();
            }
        }

        for (let i = 1; i < this.numberBlock - 1; i++)
            for (let j = 1; j < this.numberBlock - 1; j++)
                if (this.items[i][j] != 0)
                    this.items[i][j].draw();
    }

    getSizeHexagon() {
        let gameWidth = this.game.gameWidth;
        let gameHeight = this.game.gameHeight;
        let sizeHexagonByWidth = gameWidth / (2 * this.numberBlock);
        let sizeHexagonByHeight = gameHeight / (2 * 0.75 * this.numberBlock);
        return Math.min(sizeHexagonByHeight, sizeHexagonByWidth);
    }

    setItem(row, column, value) {
        if (this.data[row][column] == 0) {
            this.data[row][column] = value;
            this.setItemBoard();
            return true;
        }
        return false;
    }

    resetCurrentLevel() {
        this.setLevel(this.level);
    }

    nextLevel() {
        if (++this.level >= this.levels.length)
            --this.level;
        this.setLevel(this.level);
    }

    preLevel() {
        if (--this.level < 0)
            ++this.level;
        this.setLevel(this.level);
    }

    moveUfo(newRow, newColumn) {
        if (newRow == -1){
            setTimeout(() => {
                alert("Bạn thắng!");
                this.setLevel(++this.level)
                return;
            }, 200);
        }

        // Lấy hàng, cột cũ của ufo
        const {row, column} = this.postionUfo;
        // Xoá ufo ở tạo đổi cũ
        this.data[row][column] = 0;
        // Cập nhật tạo độ mới

        this.postionUfo = {row: newRow, column: newColumn};
        this.data[newRow][newColumn] = 2;

        // Làm mới giao diện
        this.setItemBoard();

        //===> Chỉ cần thay đổi ở mảng data, mảng item sẽ dùng hàm thay đổi sau
        if (newRow == 0 || newColumn == 0 || newRow == this.data.length - 1 ||  newColumn == this.data.length - 1) {
            setTimeout(() => {
                alert("UFO đã trốn thoát");
                this.resetCurrentLevel();
            }, 200);
        }
    }

}