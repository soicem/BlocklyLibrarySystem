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

    //@ToDo: remove separation of imageSrc and imageData
    if (imageSrc === "penguin.png") {
      image.src = imageSrc;
    } else {
      console.log(imageData);
      image.src = imageData;
    }

    let x = canvas.width / 2 - spriteSize.width / 2;
    let y = canvas.height / 2 - spriteSize.height / 2;
    let position = new Point(x, y);
    let degree = new Degree(0);
    if(isClone[0]){
      position = isClone[2];
    }

    return new Sprite(canvas, image, imageData, position, spriteSize, degree, imageName, isClone);
  }
}
