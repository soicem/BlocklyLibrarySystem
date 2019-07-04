class SpriteManager {

  constructor() {
    this.sprites = {};
    this.spritesXml = {};
    this.spritesOrder = [];
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

  _createSprite(spriteName) {
    const canvasContainer = "canvases";
    const canvasOrder = this.spritesOrder.length;
    const canvasWidth = 500;
    const canvasHeight = 300;
    let baseCanvas = new Canvas(canvasContainer, spriteName,
        canvasOrder, canvasWidth, canvasHeight);

    const spriteWidth = 50;
    const spriteHeight = 50;
    const spriteX = canvasWidth / 2 - spriteWidth / 2;
    const spriteY = canvasHeight / 2 - spriteHeight / 2;
    return new ImageSprite(baseCanvas, spriteName, spriteX, spriteY,
        spriteWidth,
        spriteHeight);
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

}
