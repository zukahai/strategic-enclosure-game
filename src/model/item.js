class Item {
    constructor(game, width, height, xAlignment, yAlignment) {
        this.width = width;
        this.height = height;
        this.xAlignment = xAlignment;
        this.yAlignment = yAlignment;
        this.game = game;
    }

    draw() {
        this.game.context.drawImage(this.getImage(), this.xAlignment, this.yAlignment, this.width, this.height);
    }

    getImage() {
        return new Image();
    }

}