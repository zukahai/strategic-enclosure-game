class Barrier extends Item {
    constructor(game, width, height, xAlignment, yAlignment) {
        super(game, width, height, xAlignment, yAlignment);
    }

    setImage() {
        this.image = new Image();
        this.image.src = "assets/images/barrier.png";
    }
}
