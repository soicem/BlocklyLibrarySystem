class Canvas {
  constructor(canvas, size) {
    this.setCanvas(canvas);
    this.setContext(canvas.getContext("2d"));
    this.setSize(size);

    this._sprites = {};
    this._spritesOrder = [""]; // Index 0 is reserved for a stage
    this._currentSpriteName = null;
  }

  ////////// Getter & Setter //////////

  getCanvas() {
    return this._canvas;
  }

  setCanvas(canvas) {
    this._canvas = canvas;
  }

  getContext() {
    return this._context;
  }

  setContext(context) {
    this._context = context;
  }

  getSize() {
    return this._size;
  }

  setSize(size) {
    this._size = size;

    const canvas = this.getCanvas();
    canvas.width = this.getWidth();
    canvas.height = this.getHeight();
  }

  getSprites() {
    return this._sprites;
  }

  getSpritesOrder() {
    return this._spritesOrder;
  }

  getCurrentSpriteName() {
    return this._currentSpriteName
  }

  setCurrentSpriteName(spriteName) {
    this._currentSpriteName = spriteName;
  }

  // --- More ---

  getWidth() {
    return this.getSize().getWidth();
  }

  getHeight() {
    return this.getSize().getHeight();
  }

  getSpriteByName(spriteName) {
    return this.getSprites()[spriteName];
  }

  getCurrentSprite() {
    return this.getSpriteByName(this.getCurrentSpriteName());
  }

  ////////// Class Methods //////////

  clear() {
    this.getContext().clearRect(0, 0, this.getSize().getWidth(),
        this.getSize().getHeight());
  }

  render() {
    this.clear();

    for (let i = 0; i < this.getSpritesOrder().length; i++) {
      if (this.getSpritesOrder()[i] !== "") {
        this.getSpritesOrder()[i].render();
      }
    }
  }

  addSprite(spriteName) {
    const defaultSize = new Size(50, 50);
    let sprite = SpriteFactory.getSprite(this, defaultSize, spriteName);

    this._sprites[spriteName] = sprite;
    this._spritesOrder.push(sprite);

    return sprite;
  }

  addSpriteAndSelect(spriteName) {
    this.addSprite(spriteName);
    this.setCurrentSpriteName(spriteName);
  }

  addStage(stageName) {
    const defaultSize = new Size(500, 500);
    let stage = SpriteFactory.getSprite(this, defaultSize, stageName);

    this._sprites[stageName] = stage;
    this._spritesOrder[0] = stage;

    return stage;
  }

  addStageAndSelect(stageName) {
    this.addStage(stageName);
    this.setCurrentSpriteName(stageName);
  }

  removeSprite(sprite) {
    //@TODO: must remove canvas and sprite objects itself

    delete this.getSprites()[sprite];

    const foundAt = this.getSpritesOrder().indexOf(sprite);
    this.getSpritesOrder().splice(foundAt, 1);
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
    for (let layerIdx = this.getSpritesOrder().length - 1;
        layerIdx >= 0 && filled < totalPixels;
        layerIdx--) {
      let iSprite = this.getSpritesOrder()[layerIdx];

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

