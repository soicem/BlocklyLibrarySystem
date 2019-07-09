class SpriteManager {
  constructor() {
    this.sprites = {};
    this.spritesXml = {};
    this.spritesImg = {};
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

  get spritesImg() {
    return this._spritesImg;
  }

  set spritesImg(value) {
    this._spritesImg = value;
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
    let canvasOrder = this.spritesOrder.length + 1;
    if (isStage) {
      canvasOrder = 0;
    }
    const canvasWidth = 500;
    const canvasHeight = 500;
    let baseCanvas = new Canvas(canvasContainer, spriteName,
        canvasOrder, canvasWidth, canvasHeight);
    let spriteWidth = 25;
    let spriteHeight = 25;
    let spriteX = canvasWidth / 2 - spriteWidth / 2;
    let spriteY = canvasHeight / 2 - spriteHeight / 2;
    if (isStage) {
      spriteWidth = canvasWidth;
      spriteHeight = canvasHeight;
      spriteX = 0;
      spriteY = 0;
    }
    return new ImageSprite(this, baseCanvas, spriteName, spriteX, spriteY,
        spriteWidth, spriteHeight);
  }

  addSprite(spriteName, ImgData) {
    if (this.exists(spriteName)) {
      throw new ExistingSpriteException(
          "the name '" + spriteName + "' is already in use.")
    }

    let newSprite = this._createSprite(spriteName);
    this.sprites[spriteName] = newSprite;
    this.spritesImg[spriteName] = ImgData;
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

  /**
   * Returns reduced image data of all layers that are visible in front.
   *    ignores the image data of sprite that is the base
   * @param {!ImageSprite} baseSprite The sprite that is base of searching conditions
   * @return {!Array} The reduced image data from all visible layers
   *    (1D array of x,y and rgba for each x,y)
   */
  getOverlayingDataOf(baseSprite) {
    let data = []; // data record (passed back to the caller)

    const x = baseSprite.x;
    const y = baseSprite.y;
    const width = baseSprite.width;
    const height = baseSprite.height;
    const totalPixels = width * height;

    let filled = 0; // used to skip hidden layers when all pixels are found

    // loop through each sprite layers
    for (let layerIdx = this.spritesOrder.length - 1;
        layerIdx >= 0 && filled < totalPixels;
        layerIdx--) {
      let iSprite = this.spritesOrder[layerIdx];

      // skips if it's sprite itself
      if (iSprite === baseSprite) {
        continue;
      }

      let iData = iSprite.canvas.getContext().getImageData(x, y, width,
          height).data;

      // loop through each pixels of current selected layer (within base sprite's area)
      for (let pixelIdx = 0;
          pixelIdx < iData.length && filled < totalPixels;
          pixelIdx += 4) {
        const iDataR = iData[pixelIdx]; // Red
        const iDataG = iData[pixelIdx + 1]; // Green
        const iDataB = iData[pixelIdx + 2]; // Blue
        const iDataA = iData[pixelIdx + 3]; // Alpha

        const isMissingPixel = !(data[pixelIdx + 3] || 0);
        const hasPixelData = (iDataA !== 0);
        // record pixel info if and only if this pixel info wasn't filled in previously
        // and has pixel data on current layer
        if (isMissingPixel && hasPixelData) {
          data[pixelIdx] = iDataR;
          data[pixelIdx + 1] = iDataG;
          data[pixelIdx + 2] = iDataB;
          data[pixelIdx + 3] = iDataA;

          filled++;
        }
      }
    }
    return data;
  }
}
