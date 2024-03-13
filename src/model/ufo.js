class Ufo extends Item {
    constructor(game, width, height, xAlignment, yAlignment) {
        super(game, width, height, xAlignment, yAlignment);
    }

    getImage() {
        let hexagonImage = new Image();
        hexagonImage.src = "assets/images/ufo.png";
        return hexagonImage;
    }
}
