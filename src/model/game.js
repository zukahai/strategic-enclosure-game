class Game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
        this.listenMouse();
        this.listenKey();
    }

    init() {
        this.gameWidth = 0, this.gameHeight = 0;
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.fps = new FPS();
        this.render();
        this.board = new Board(this);
        this.start();
        // this.loop();
    }

    listenKey() {
        document.addEventListener("keydown", evt => {
            if (evt.key === 'r') {
                this.board.resetCurrentLevel();
            }
            if (evt.key == 'n') {
                this.board.nextLevel();
            }
            if (evt.key == 'p') {
                this.board.preLevel();
            }
        });
    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            this.soloveMouseClick(x, y);
        })

        document.addEventListener("mousemove", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;

        })

        document.addEventListener("mouseup", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
        })
    }

    soloveMouseClick(x, y) {
        const { row, column } = this.board.getColumnAndRowByPositon(x, y);
        if (row > 0 && column > 0) {
            if (this.board.setItem(row, column, 1)) {
                const algorithm = new AlogorithmBFS(this.board.data, this.board.postionUfo);
                const step = algorithm.getNextStepUfo();
                this.board.moveUfo(step.row, step.column);
            }
        }
    }


    loop(timestamp) {
        this.fps.calculateFPS(timestamp);
        this.update();
        this.draw();
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    // loop() {
    //     // this.fps.calculateFPS(timestamp);
    //     // this.update();
    //     this.draw();
    //     setTimeout(() => {
    //         this.loop();
    //     }, 30);
    // }

    start() {
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    update() {
        this.render();
    }

    render() {
        if (this.canvas.width != document.documentElement.clientWidth || this.canvas.height != document.documentElement.clientHeight) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            this.gameWidth = this.canvas.width;
            this.gameHeight = this.canvas.height;
        }
    }

    draw() {
        this.clearScreen();
        this.board.draw();
        this.board.draw();
        this.drawLevel();
        this.drawFPS();
    }

    drawFPS() {
        this.context.font = (this.board.sizeHexagon / 1.5) + 'px NVNPixelFJVerdana8pt';
        this.context.fillStyle = "white";
        let fps = this.fps.getFPS();
        if (fps < 30)
            this.context.fillStyle = "red";
        this.context.fillText("FPS: " + fps, this.gameWidth * 0.9 - this.board.sizeHexagon, this.board.sizeHexagon);
    }

    drawLevel() {
        this.context.font = (this.board.sizeHexagon / 1.5) + 'px NVNPixelFJVerdana8pt';
        this.context.fillStyle = "white";
        this.context.fillText("Level: " + (this.board.level + 1), this.board.sizeHexagon, this.board.sizeHexagon);
    }


    drawText() {
        this.context.font = this.getSize() / 1.5 + 'px Arial Black';
        this.context.fillStyle = "#FF00CC";
        let s = " steps"
        if (step < 2)
            s = " step"
        this.context.textAlign = "center";
        this.context.fillText(step + s + " left to get to the red box", this.gameWidth / 2, Yalignment - sizeBlock / 2);
        this.context.fillText("Level " + level, this.gameWidth / 2, Yalignment + sizeBlock / 2 + sizeChess);
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.gameWidth, this.gameHeight);
    }
}

var g = new Game();