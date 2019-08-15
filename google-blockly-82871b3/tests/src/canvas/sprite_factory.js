class SpriteFactory {
  // imageName을 key값으로 사용, imageSrc와 분리 _ 08_12 김남규
  static getSprite(canvas, spriteSize, imageName, imageData, imageSrc) {
    let image = new Image();
    image.src = imageSrc;

    let width = canvas.getWidth() / 2 - spriteSize.getWidth() / 2;
    let height = canvas.getHeight() / 2 - spriteSize.getHeight() / 2;
    let position = new Point(width, height);
    let degree = new Degree(0);

    return new Sprite(canvas, image, imageData, position, spriteSize, degree, imageName);
  }
}
