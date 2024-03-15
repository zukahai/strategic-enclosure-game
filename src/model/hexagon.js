class Hexagon extends Item {
    constructor(game, width, height, xAlignment, yAlignment) {
        super(game, width, height, xAlignment, yAlignment);
    }

    setImage() {
        this.image = new Image();
        this.image.src = "assets/images/hexagon.png";
    }
}
