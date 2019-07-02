class ImageSprite extends Sprite {
  constructor(canvas, image, x, y, width, height, direction) {
    super(canvas, x, y, width, height, direction);
    this.image = image;
  }

  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
  }

  draw() {
    let image = new Image();

    image.addEventListener("load", () => {
      this.canvas.getContext().drawImage(image, this.x, this.y, this.width, this.height);
    }, false);

    image.src = this.image;
  }
}
