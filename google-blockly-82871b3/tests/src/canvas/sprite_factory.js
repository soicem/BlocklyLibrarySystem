class SpriteFactory {
  static getSprite(canvas, imageSrc, imageData) {
    let image = new Image();
    image.src = imageSrc;
    const spriteSize = new Size(50, 50);

    let width = canvas.getWidth() / 2 - spriteSize.getWidth() / 2;
    let height = canvas.getHeight() / 2 - spriteSize.getHeight() / 2;
    let position = new Point(width, height);
    let degree = new Degree(0);

    return new Sprite(canvas, image, imageData, position, spriteSize, degree);
  }
}
