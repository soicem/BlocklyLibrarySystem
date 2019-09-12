class SpriteFactory {
  /**
   * Constructs a new Sprite based off from the given info
   * @param {string} name
   * @param {Canvas} canvas
   * @param {string} imageSrc
   * @param {Size} spriteSize
   * @param {[boolean,]} isClone
   * @returns {Sprite}
   */
  // imageName을 key값으로 사용, imageSrc와 분리 _ 08_12 김남규
  static getSprite(name, canvas, imageSrc, spriteSize, isClone = [false,]) {
    let x = canvas.width / 2 - spriteSize.width / 2;
    let y = canvas.height / 2 - spriteSize.height / 2;
    let position = new Point(x, y);
    let degree = new Degree(0);
    if(isClone[0]){
      position = isClone[2];
    }

    return new Sprite(name, canvas, imageSrc, position, spriteSize, degree, isClone);
  }
}
