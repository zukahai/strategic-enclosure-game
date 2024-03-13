class Item {
    constructor(game, witdh, height, xAlignment, yAlignment) {
        this.witdh = witdh;
        this.height = height;
        this.xAlignment = xAlignment;
        this.yAlignment = yAlignment;
        this.game = game;
    }

    draw() {
        this.game.context.drawImage(this.getImage(), this.xAlignment, this.yAlignment, this.witdh, this.height);
    }

    getImage() {
        return new Image();
    }

}