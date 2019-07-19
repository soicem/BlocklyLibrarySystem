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

  isOverlayingColor(baseSprite, rgb) {
    const baseX = baseSprite.getX();
    const baseY = baseSprite.getY();
    const baseWidth = baseSprite.getWidth();
    const baseHeight = baseSprite.getHeight();
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    canvas.width = baseWidth;
    canvas.height = baseHeight;

    for (let layer = 0; layer < this.getSpritesOrder().length; layer++) {
      const currentSprite = this.getSpritesOrder()[layer];

      if (currentSprite === "") {
        continue;
      }

      const currentX = currentSprite.getX();
      const currentY = currentSprite.getY();
      const currentWidth = currentSprite.getWidth();
      const currentHeight = currentSprite.getHeight();

      if (currentSprite === baseSprite) {
        if (layer !== 0 && layer !== this.getSpritesOrder().length - 1) {

          let data = context.getImageData(0, 0, baseWidth, baseHeight).data;
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];

            if (a === 0) {
              continue;
            }

            if (r === rgb.red && g === rgb.green && b === rgb.blue) {
              return true;
            }
          }

        }
      } else {
        context.drawImage(currentSprite.getImage(), currentX - baseX,
            currentY - baseY, currentWidth, currentHeight);
      }
    }

    let data = context.getImageData(0, 0, baseWidth, baseHeight).data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a === 0) {
        continue;
      }

      if (r === rgb.red && g === rgb.green && b === rgb.blue) {
        return true;
      }
    }

    return false;
  }

}

