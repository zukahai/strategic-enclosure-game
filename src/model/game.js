game_W = 0, game_H = 0;
sizeChess = sizeBlock = 0;
Xalignment = Yalignment = 0;

let hexagon_image = new Image();
hexagon_image.src = "assets/images/hexagon.png";

blockArrived = []

class game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        this.loop();
        this.listenMouse();
    }

    listenMouse() {
        document.addEventListener("mousedown", evt => {
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            console.log("click" , x, y);
        })

        document.addEventListener("mousemove", evt => {
            if (win)
                return;
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
            
        })

        document.addEventListener("mouseup", evt => {
            if (win)
                return;
            var x = evt.offsetX == undefined ? evt.layerX : evt.offsetX;
            var y = evt.offsetY == undefined ? evt.layerY : evt.offsetY;
        })
    }


    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 30);
    }

    update() {
        this.render();
    }

    render() {
        if (this.canvas.width != document.documentElement.clientWidth || this.canvas.height != document.documentElement.clientHeight) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            game_W = this.canvas.width;
            game_H = this.canvas.height;

        }
    }

    draw() {
        this.clearScreen();
    }

   
    drawText() {
        this.context.font = this.getSize() / 1.5 + 'px Arial Black';
        this.context.fillStyle = "#FF00CC";
        let s = " steps"
        if (step < 2)
            s = " step"
        this.context.textAlign = "center";
        this.context.fillText(step + s + " left to get to the red box", game_W / 2, Yalignment - sizeBlock / 2);
        this.context.fillText("Level " + level, game_W / 2, Yalignment + sizeBlock / 2 + sizeChess);
    }

    clearScreen() {
        this.context.clearRect(0, 0, game_W, game_H);
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, game_W, game_H);
    }
}

var g = new game();