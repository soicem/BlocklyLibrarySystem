class SpriteManager {
  constructor() {
    this.sprites = {};
    this.spritesXml = {};
    this.spritesOrder = [""];
    this.currentSpriteName = null;
  }

  get sprites() {
    return this._sprites;
  }

  set sprites(value) {
    this._sprites = value;
  }

  get spritesXml() {
    return this._spriteXmls;
  }

  set spritesXml(value) {
    this._spriteXmls = value;
  }

  get spritesOrder() {
    return this._spritesOrder;
  }

  set spritesOrder(value) {
    this._spritesOrder = value;
  }

  get currentSpriteName() {
    return this._currentSprite;
  }

  set currentSpriteName(value) {
    this._currentSprite = value;
  }

  exists(spriteName) {
    return spriteName in this.sprites;
  }

  _createSprite(spriteName, isStage) {
    const canvasContainer = "canvases";
    var canvasOrder = this.spritesOrder.length + 1;
    if(isStage){
      canvasOrder = 0;
    }
    const canvasWidth = 500;
    const canvasHeight = 300;
    let baseCanvas = new Canvas(canvasContainer, spriteName,
        canvasOrder, canvasWidth, canvasHeight);
    var spriteWidth = 50;
    var spriteHeight = 50;
    var spriteX = canvasWidth / 2 - spriteWidth / 2;
    var spriteY = canvasHeight / 2 - spriteHeight / 2;
    if(isStage){
      spriteWidth = canvasWidth;
      spriteHeight = canvasHeight
      spriteX = 0;
      spriteY = 0;
    }
    return new ImageSprite(this, baseCanvas, spriteName, spriteX, spriteY,
        spriteWidth, spriteHeight);
  }

  addSprite(spriteName) {
    if (this.exists(spriteName)) {
      throw new ExistingSpriteException(
          "the name '" + spriteName + "' is already in use.")
    }

    let newSprite = this._createSprite(spriteName);
    this.sprites[spriteName] = newSprite;
    this.spritesXml[spriteName] = "";
    this.spritesOrder.push(newSprite);

    return newSprite;
  }

  addStage(stageName) {
    if (this.exists(stageName)) {
      throw new ExistingSpriteException(
          "the name '" + stageName + "' is already in use.")
    }

    let newStage = this._createSprite(stageName, true);
    this.sprites[stageName] = newStage;
    this.spritesXml[stageName] = "";
    // 제일 첫 번째로 바꿔야함
    this.spritesOrder[0] = newStage;
    //this.spritesOrder.splice(0, 0, newStage)
    //this.spritesOrder.push(newStage);

    return newStage;
  }

  addSpriteAndSelect(spriteName) {
    this.addSprite(spriteName);
    this.currentSpriteName = spriteName;
  }

  getSprite(spriteName) {
    if (!this.exists(spriteName)) {
      throw new NotExistingSpriteException(
          "sprite name '" + spriteName + "' does not exist.")
    }

    return this.sprites[spriteName];
  }



  getCurrentSprite() {
    return this.getSprite(this.currentSpriteName);
  }

  removeSprite(spriteName) {
    if (!this.exists(spriteName)) {
      throw new NotExistingSpriteException(
          "sprite name '" + spriteName + "' does not exist.")
    }

    //@TODO: must remove canvas and sprite objects itself

    delete this.sprites[spriteName];
    delete this.spritesXml[spriteName];

    const foundAt = this.spritesOrder.indexOf(spriteName);
    this.spritesOrder.splice(foundAt, 1);
  }

  getOverlayingDataOf(baseSprite) {
    function initializedArray(size, defaultValue) {
      let array = new Array(size);
      for (let i = 0; i < array.length; i++) {
        array[i] = defaultValue;
      }
      return array;
    }

    const x = baseSprite.x;
    const y = baseSprite.y;
    const width = baseSprite.width;
    const height = baseSprite.height;
    const totalPixels = width * height;
    let data = initializedArray(totalPixels * 4, 0);

    for (let i = this.spritesOrder.length - 1; i >= 0; i--) {
      let iSprite = this.spritesOrder[i];

      if (iSprite === baseSprite) continue; //skip if it's sprite itself

      let iData = iSprite.canvas.getContext().getImageData(x, y, width, height).data;

      for (let j = 0, filled = 0; j < iData.length && filled < totalPixels; j += 4) {
        const iDataR = iData[j];
        const iDataG = iData[j + 1];
        const iDataB = iData[j + 2];
        const iDataA = iData[j + 3];

        const isMissingPixel = (data[j + 3] === 0);
        const hasPixelData = (iDataA !== 0);
        if (isMissingPixel && hasPixelData) {
          data[j] = iDataR;
          data[j + 1] = iDataG;
          data[j + 2] = iDataB;
          data[j + 3] = iDataA;

          filled++;
        }
      }
    }

    return data;
  }
}
