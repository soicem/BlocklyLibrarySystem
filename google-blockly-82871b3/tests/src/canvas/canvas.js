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
    this._specificSpriteName = null; // 코드 실행 시 사용
    this._waitName = null;
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

  getSpecificSprite() {
    return this.getSpriteByName(this.getSpecificSpriteName());
  }

  getCurrentSprite() {
    return this.getSpriteByName(this.getCurrentSpriteName());
  }

  setCurrentSprite(nameOfSprite) {
    if (this.getCurrentSpriteName() !== nameOfSprite) {
      if (this.getCurrentSprite()) {
        var xml = Blockly.Xml.workspaceToDom(this.getWorkspace());
        var prettyXMLText = Blockly.Xml.domToPrettyText(xml);

        this.getCurrentSprite().setXml(prettyXMLText);
        this.getWorkspace().clear();
      }
      if (this.getSpriteByName(nameOfSprite).getXml() !== "") {
        var nextXml = Blockly.Xml.textToDom(
            this.getSpriteByName(nameOfSprite).getXml());
        Blockly.Xml.domToWorkspace(nextXml, this.getWorkspace());
      }

      this.setCurrentSpriteName(nameOfSprite);
    }
    // Highlight the selected sprite
    var l = document.getElementsByClassName('spriteImg');

    for (var i = 0; i < l.length; i++) {
      l[i].style.border = 'solid 1px #ccc';
    }
    document.getElementById(
        this.getCurrentSpriteName()).style.border = "solid 2px #415DCC";
    document.getElementById('sprite_X').value = this.getCurrentSprite().getX();
    document.getElementById('sprite_Y').value = this.getCurrentSprite().getY();
    document.getElementById(
        'sprite_H').value = this.getCurrentSprite().getHeight();
    document.getElementById(
        'sprite_W').value = this.getCurrentSprite().getWidth();
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

  // access time 2019-08-18

  allStop(){
    for(let a in this._spritesOrder){
      if(this._spritesOrder[a] == null) continue;
      this._spritesOrder[a].isHalting = true
    }
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

  addSprite(spriteName, imageData = null, imageSrc, isClone=[false,]) {
    const defaultSize = new Size(40, 40);

    let sprite = SpriteFactory.getSprite(this, defaultSize, spriteName,
        imageData, imageSrc, isClone);
    this._sprites[spriteName] = sprite;
    this._spritesOrder.push(sprite);

    return sprite;
  }

  addSpriteAndSelect(spriteName, imageData = null, imageSrc, isClone = [false, ]) {
    console.log(spriteName);
    this.addSprite(spriteName, imageData, imageSrc, isClone);
    if(!isClone[0]){
      this.setCurrentSprite(spriteName);
    }
  }

  addStage(stageName, imageData = null, imageSrc) {
    const defaultSize = new Size(this.getWidth(), this.getHeight());
    let stage = SpriteFactory.getSprite(this, defaultSize, stageName,
        imageData, imageSrc);

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

}

