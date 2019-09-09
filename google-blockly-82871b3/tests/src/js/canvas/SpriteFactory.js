class SpriteFactory {
  /**
   * Constructs a new Sprite based off from the given info
   * @param {Canvas} canvas
   * @param {Size} spriteSize
   * @param {string} imageName
   * @param {string} imageData
   * @param {string} imageSrc
   * @param {[boolean,]} isClone
   * @returns {Sprite}
   */
  // imageName을 key값으로 사용, imageSrc와 분리 _ 08_12 김남규
  static getSprite(canvas, spriteSize, imageName, imageData, imageSrc, isClone=[false,]) {
    let image = new Image();
    image.src = imageSrc;

    let x = canvas.getWidth() / 2 - spriteSize.width / 2;
    let y = canvas.getHeight() / 2 - spriteSize.height / 2;
    let position = new Point(x, y);
    let degree = new Degree(0);
    if(isClone[0]){
      position = isClone[2];
    }

    return new Sprite(canvas, image, imageData, position, spriteSize, degree, imageName, isClone);
  }
}
