class Canvas {
  constructor(canvas, size, workspace) {
    this.setCanvas(canvas);
    this.setContext(canvas.getContext("2d"));
    this.setSize(size);
    this.setWorkspace(workspace);
    this.setHandler(new CanvasHandler(this));
    this.initialize();
  }

  initialize() {
    this._sprites = {};
    this._spritesOrder = [null]; // Index 0 is reserved for a stage
    this._currentSpriteName = null;
    this._specificSpriteName = null;
    this.getHandler().startTrackMousePosition();
    this.getHandler().startSelectSprite();
    this.setSpecificSpriteName("aww-cat.png")
    this._libCode = null;
  }

////////// Getter & Setter //////////

  getLibCode() {
    return this._libCode;
  }

  setLibCode(libCode) {
    this._libCode += this._libCode + "\n" + libCode;
  }

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

  getHandler() {
    return this._handler;
  }

  setHandler(handler) {
    this._handler = handler;
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

  setWorkspace(workspace) {
    this._workspace = workspace;
  }

  getWorkspace() {
    return this._workspace;
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

  getSpecificSpriteName() {
    return this._specificSpriteName
  }

  setSpecificSpriteName(spriteName) {
    this._specificSpriteName = spriteName;
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

  getActualSpriteObject(uniformSprite) {
    let actualSpriteObject = null;

    if (uniformSprite instanceof Sprite) {
      actualSpriteObject = uniformSprite;
    } else if (typeof (uniformSprite) === "string") {
      actualSpriteObject = this.getSpriteByName(uniformSprite);
    } else {
      // Error
    }

    return actualSpriteObject;
  }

  getSpecificSprite(){
    return this.getSpriteByName(this.getSpecificSpriteName());
  }

  getCurrentSprite() {
    return this.getSpriteByName(this.getCurrentSpriteName());
  }

  setCurrentSprite(nameOfSprite) {
    if (this.getCurrentSpriteName() !== nameOfSprite) {
      var xml = Blockly.Xml.workspaceToDom(this.getWorkspace());
      var prettyXMLText = Blockly.Xml.domToPrettyText(xml);

      this.getCurrentSprite().setXml(prettyXMLText);

      this.getWorkspace().clear();

      if (this.getSpriteByName(nameOfSprite).getXml() !== "") {
        var nextXml = Blockly.Xml.textToDom(this.getSpriteByName(nameOfSprite).getXml());
        Blockly.Xml.domToWorkspace(nextXml, this.getWorkspace());
      }

      this.setCurrentSpriteName(nameOfSprite);
    }
    // Highlight the selected sprite
    var l = document.getElementsByClassName('spriteImg');

    for(var i = 0; i < l.length; i++){
      l[i].style.border = 'solid 1px #ccc';
    }
    document.getElementById(this.getCurrentSpriteName()).style.border = "solid 2px #415DCC";
    document.getElementById('sprite_X').value = this.getCurrentSprite().getX();
    document.getElementById('sprite_Y').value = this.getCurrentSprite().getY();
    document.getElementById('sprite_H').value = this.getCurrentSprite().getHeight();
    document.getElementById('sprite_W').value = this.getCurrentSprite().getWidth();
  }

  getLayerNumber(sprite) {
    sprite = this.getActualSpriteObject(sprite);
    let result = null;

    for (let i = 0; i < this.getSpritesOrder().length; i++) {
      if (this.getSpritesOrder()[i] === sprite) {
        result = i;
        break;
      }
    }

    return result;
  }

  getSpriteAtPosition(point) {
    let foundSprite = null;

    for (let i = this.getSpritesOrder().length - 1; i >= 0; i--) {
      const sprite = this.getSpritesOrder()[i];

      if (sprite === null) {
        continue;
      }

      if (sprite.getX() <= point.getX() &&
          point.getX() <= (sprite.getX() + sprite.getWidth()) &&
          sprite.getY() <= point.getY() &&
          point.getY() <= (sprite.getY() + sprite.getHeight())) {
        foundSprite = sprite;
        break;
      }
    }

    return foundSprite;
  }

  ////////// Class Methods //////////

  clear() {
    this.getContext().clearRect(0, 0, this.getSize().getWidth(),
        this.getSize().getHeight());
  }

  render() {
    this.clear();

    for (let i = 0; i < this.getSpritesOrder().length; i++) {
      if (this.getSpritesOrder()[i] !== null) {
        this.getSpritesOrder()[i].render();
      }
    }
  }

  addSprite(spriteName, imageData = null) {
    const defaultSize = new Size(40, 40);
    let sprite = SpriteFactory.getSprite(this, defaultSize, spriteName, imageData);

    this._sprites[spriteName] = sprite;
    this._spritesOrder.push(sprite);

    return sprite;
  }

  addSpriteAndSelect(spriteName, imageData = null) {
    this.addSprite(spriteName, imageData);
    this.setCurrentSpriteName(spriteName);
  }

  addStage(stageName, imageData = null) {
    const defaultSize = new Size(this.getWidth(), this.getHeight());
    let stage = SpriteFactory.getSprite(this, defaultSize, stageName, imageData);

    this._sprites[stageName] = stage;
    this._spritesOrder[0] = stage;

    return stage;
  }

  addStageAndSelect(stageName, imageData = null) {
    this.addStage(stageName, imageData);
    this.setCurrentSpriteName(stageName);
  }

  removeSprite(spriteName) {
    //@TODO: must remove canvas and sprite objects itself

    delete this.getSprites()[spriteName];

    const foundAt = this.getSpritesOrder().indexOf(spriteName);
    this.getSpritesOrder().splice(foundAt, 1);
  }

  changeSpriteOrder(sprite, newLayer) {
    sprite = this.getActualSpriteObject(sprite);
    let currentLayer = this.getLayerNumber(sprite);

    if (currentLayer === newLayer) {
      return;
    }

    this._spritesOrder.splice(currentLayer, 1);
    this._spritesOrder.splice(newLayer, 0, sprite);
  }

  moveSpriteToTop(sprite) {
    this.changeSpriteOrder(sprite, this.getSpritesOrder().length - 1)
  }

  isColorOverlayingColor(baseSprite, baseRgb, lookupRgb) {
    let isOverlaying = false;

    const baseWidth = baseSprite.getWidth();
    const baseHeight = baseSprite.getHeight();
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    canvas.width = baseWidth;
    canvas.height = baseHeight;
    const pixels = baseSprite.getPixelsOfRgb(baseRgb);

    for (let layer = 0; layer < this.getSpritesOrder().length && !isOverlaying; layer++) {
      const currentSprite = this.getSpritesOrder()[layer];

      if (currentSprite === null) {
        continue;
      }

      const currentX = currentSprite.getX();
      const currentY = currentSprite.getY();
      const currentWidth = currentSprite.getWidth();
      const currentHeight = currentSprite.getHeight();

      if (currentSprite === baseSprite) {
        if (layer !== 0 && layer !== this.getSpritesOrder().length - 1) {
          let data = context.getImageData(0, 0, baseWidth, baseHeight).data;
          isOverlaying = this.isPixelsOverlayingRgb(data, baseSprite.getSize(), pixels, lookupRgb);
        }
      } else {
        const baseX = baseSprite.getX();
        const baseY = baseSprite.getY();

        context.drawImage(currentSprite.getImage(), currentX - baseX,
            currentY - baseY, currentWidth, currentHeight);
      }
    }

    let data = context.getImageData(0, 0, baseWidth, baseHeight).data;
    if (!isOverlaying) {
      isOverlaying = this.isPixelsOverlayingRgb(data, baseSprite.getSize(), pixels, lookupRgb);
    }

    return isOverlaying;
  }

  isOverlayingColor(baseSprite, lookupRgb) {
    return this.isColorOverlayingColor(baseSprite, null, lookupRgb);
  }

  isPixelsOverlayingRgb(data, size, pixels, rgb) {
    let isOverlaying = false;

    for (let i = 0; i < pixels.length; i++) {
      const index = (pixels[i].getY() * size.getWidth() + pixels[i].getX()) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];

      if (a === 0) {
        continue;
      }

      if (r === rgb.r && g === rgb.g && b === rgb.b) {
        isOverlaying = true;
        break;
      }
    }

    return isOverlaying;
  }

}

