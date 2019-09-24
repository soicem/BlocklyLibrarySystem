class Canvas {
  /**
   * @param {Object} canvas
   * @param {Size} size
   * @param {Blockly.Workspace} workspace
   */
  constructor(canvas, size, workspace) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.size = size;
    this.workspace = workspace;
    this.handler = new CanvasHandler(this);
    this.initialize();
  }

  /**
   */
  initialize() {
    this._specificEventCodeName;
    this._isHalting = false;
    this._sprites = {};
    this._spritesOrder = [null]; // Index 0 is reserved for a stage
    this._currentSpriteName = null;
    this._currentCostumeNum = 0;
    this._specificSpriteName = null; // 코드 실행 시 사용
    this._waitName = null;
    this.handler.startTrackMousePosition();
    this.handler.startSelectSprite();
    this.specificSpriteName = "aww-cat.png";
    this._libCode = "";
    this.removeIndex = [];
  }

  ////////// Getter & Setter //////////

  /**
   * @returns {Object}
   */
  get canvas() {
    return this._canvas;
  }

  /**
   * @param {Object} canvas
   */
  set canvas(canvas) {
    this._canvas = canvas;
  }

  /**
   * @returns {Object}
   */
  get context() {
    return this._context;
  }

  /**
   * @param {Object} context
   */
  set context(context) {
    this._context = context;
  }

  /**
   * @returns {Size}
   */
  get size() {
    return this._size;
  }

  /**
   * @param {Size} size
   */
  set size(size) {
    this._size = size;

    const canvas = this.canvas;
    canvas.width = this.width;
    canvas.height = this.height;
  }

  /**
   * @param {Blockly.Workspace} workspace
   */
  set workspace(workspace) {
    this._workspace = workspace;
  }

  /**
   * @returns {Blockly.Workspace}
   */
  get workspace() {
    return this._workspace;
  }

  /**
   * @returns {CanvasHandler}
   */
  get handler() {
    return this._handler;
  }

  /**
   * @param {CanvasHandler} handler
   */
  set handler(handler) {
    this._handler = handler;
  }

  /**
   * @returns {boolean}
   */
  get isHalting() {
    return this._isHalting;
  }

  /**
   * @param {boolean} halting
   */
  set isHalting(halting) {
    this._isHalting = halting;
  }

  /**
   * @returns {Object<string, Sprite>}
   */
  get sprites() {
    return this._sprites;
  }

  /**
   * @returns {Sprite[]}
   */
  get spritesOrder() {
    return this._spritesOrder;
  }

  /**
   * @returns {string}
   */
  get currentSpriteName() {
    return this._currentSpriteName;
  }

  /**
   * @param {string} spriteName
   */
  set currentSpriteName(spriteName) {
    this._currentSpriteName = spriteName;
  }

  /**
   * @returns {number}
   */
  get currentCostumeNum() {
    return this._currentCostumeNum;
  }

  /**
   * @param {number} costumeNum
   */
  set currentCostumeNum(costumeNum) {
    this._currentCostumeNum = costumeNum;
  }

  /**
   * @returns {string}
   */
  get specificEventCode() {
    return this._specificEventCodeName;
  }

  /**
   * @param {string} spriteName
   */
  set specificEventCode(spriteEventCodeName) {
    this._specificEventCodeName = spriteEventCodeName;
  }

  /**
   * @returns {string}
   */
  get specificSpriteName() {
    return this._specificSpriteName
  }

  /**
   * @param {string} spriteName
   */
  set specificSpriteName(spriteName) {
    this._specificSpriteName = spriteName;
  }

  /**
   * @returns {string}
   */
  get libCode() {
    return this._libCode;
  }

  /**
   * @param {string} libCode
   */
  set libCode(libCode) {
    this._libCode += this._libCode + "\n" + libCode;
  }

  /**
   * @returns {[]}
   */
  get removeIndex(){
    return this._removeIndex;
  }

  /**
   * @param {[]} arr
   */
  set removeIndex(arr){
    this._removeIndex = arr;
  }

  // --- More ---

  /**
   * @returns {number}
   */
  get width() {
    return this.size.width;
  }

  /**
   * @returns {number}
   */
  get height() {
    return this.size.height;
  }

  /**
   * @param {string} spriteName
   * @returns {Sprite}
   */
  getSpriteByName(spriteName) {
    return this.sprites[spriteName];
  }

  /**
   * @param {Sprite|string} uniformSprite
   * @returns {null}
   */
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

  /**
   * @returns {Sprite}
   */
  getSpecificSprite() {
    return this.getSpriteByName(this.specificSpriteName);
  }

  /**
   * @returns {Sprite}
   */
  getCurrentSprite() {
    return this.getSpriteByName(this.currentSpriteName);
  }

  /**
   * @param {string} nameOfSprite
   */
  setCurrentSprite(nameOfSprite) {
    if (this.currentSpriteName !== nameOfSprite) {
      if (this.getCurrentSprite()) {
        const xml = Blockly.Xml.workspaceToDom(this.workspace);
        const prettyXMLText = Blockly.Xml.domToPrettyText(xml);

        this.getCurrentSprite().xml = prettyXMLText;
        this.workspace.clear();
      }
      if (this.getSpriteByName(nameOfSprite).xml !== "") {
        const nextXml = Blockly.Xml.textToDom(
            this.getSpriteByName(nameOfSprite).xml);
        Blockly.Xml.domToWorkspace(nextXml, this.workspace);
      }

      this.currentSpriteName = nameOfSprite;
    }
    // Highlight the selected sprite
    const l = document.getElementsByClassName('spriteImg');

    for (let i = 0; i < l.length; i++) {
      l[i].style.border = 'solid 1px #ccc';
    }
    document.getElementById(
        this.currentSpriteName).style.border = "solid 2px #415DCC";
    document.getElementById('sprite_X').value = this.getCurrentSprite().x;
    document.getElementById('sprite_Y').value = this.getCurrentSprite().y;
    document.getElementById(
        'sprite_H').value = this.getCurrentSprite().height;
    document.getElementById(
        'sprite_W').value = this.getCurrentSprite().width;

    this.loadCurrentSpriteCostumes();
  }

  /**
   */
  loadCurrentSpriteCostumes(){
    clearCostumeGallery();
    const currentSprite = this.getCurrentSprite();
    const length = currentSprite.getCostumeLength();
    //alert("CostumeLength = " + length);
    for(let i = 0; length > i; i++){
      const a = '<div class="costumeImg\" id="'
          + myCanvas.currentSpriteName + '_' + i
          + '" onclick="myCanvas.setCurrentCostume(' + i + ')">'
          + '<img src="' + currentSprite.getCostume(i) + '" alt="">'
          + '<div class="desc">' + myCanvas.currentSpriteName + '_' + i
          + '</div>'
          + '<img src="./src/resources/images/trash.png" class="trash" onclick="myCanvas.deleteCostumeAndSelect('+ i +')">'
          + '</div>';
      document.getElementById("costumeGallery").innerHTML += a;
    }
    this.getCurrentSprite().setCurrentCostumeSrc(0);
  }

  /**
   * @param {number} num
   */
  setCurrentCostume(num) {
    this.currentCostumeNum = num;
    this.getCurrentSprite().setCurrentCostumeSrc(0);
    const l = document.getElementsByClassName('costumeImg');
    for (let i = 0; i < l.length; i++) {
      l[i].style.border = 'solid 1px #ccc';
    }
    initPage();
    loadImage(this.getCurrentSprite().getCostume(this.currentCostumeNum));
    document.getElementById(this.currentSpriteName + '_' + num).style.border = "solid 2px #415DCC";
  }

  /**
   * @param {string} imageSrc
   */
  addCostumeAndSelect(imageSrc) {
    this.getCurrentSprite().setCostume(imageSrc);
    this.setCurrentCostume(this.currentCostumeNum + 1);
  }

  /**
   * @param {number} num
   */
  deleteCostumeAndSelect(num){
    if(num == 0){
      alert("스프라이트의 대표 이미지는 지울 수 없습니다");
      return;
    }
    this.getCurrentSprite().deleteCostume(num);
    this.loadCurrentSpriteCostumes();
  }

  /**
   * @param {Sprite} sprite
   * @returns {null|number}
   */
  getLayerNumber(sprite) {
    sprite = this.getActualSpriteObject(sprite);
    let result = null;

    for (let i = 0; i < this.spritesOrder.length; i++) {
      if (this.spritesOrder[i] === sprite) {
        result = i;
        break;
      }
    }

    return result;
  }

  /**
   * @param {Point} point
   * @returns {null|Sprite}
   */
  getSpriteAtPosition(point) {
    let foundSprite = null;

    for (let i = this.spritesOrder.length - 1; i >= 0; i--) {
      const sprite = this.spritesOrder[i];

      if (sprite === null) {
        continue;
      }

      if (sprite.x <= point.x &&
          point.x <= (sprite.x + sprite.width) &&
          sprite.y <= point.y &&
          point.y <= (sprite.y + sprite.height)) {
        foundSprite = sprite;
        break;
      }
    }

    return foundSprite;
  }

  ////////// Class Methods //////////

  /**
   */
  clear() {
    this.context.clearRect(0, 0, this.size.width,
        this.size.height);
  }

  /**
   */
  render() {
    this.clear();

    for (let i = 0; i < this.spritesOrder.length; i++) {
      if (this.spritesOrder[i] !== null) {
        this.spritesOrder[i].render();
      }
    }
  }

  /**
   * @param {string} spriteName
   * @param {string} imageSrc
   * @param {[boolean,]} isClone
   * @returns {Sprite}
   */
  addSprite(spriteName, imageSrc, isClone = [false,]) {
    const defaultSize = new Size(40, 40);

    let sprite = SpriteFactory.getSprite(spriteName, this, imageSrc, defaultSize, isClone);
    this._sprites[spriteName] = sprite;
    this._spritesOrder.push(sprite);

    return sprite;
  }

  /**
   * @param {string} spriteName
   * @param {string} imageSrc
   * @param {[boolean,]} isClone
   */
  addSpriteAndSelect(spriteName, imageSrc, isClone = [false,]) {
    this.addSprite(spriteName, imageSrc, isClone);
    if(!isClone[0]){
      this.setCurrentSprite(spriteName);
    }
  }

  /**
   * @param {string} stageName
   * @param {string} imageSrc
   * @returns {Sprite}
   */
  addStage(stageName, imageSrc) {
    const defaultSize = new Size(this.width, this.height);
    let stage = SpriteFactory.getSprite(stageName, this, imageSrc, defaultSize);

    this._sprites[stageName] = stage;
    this._spritesOrder[0] = stage;

    return stage;
  }

  /**
   * @param {string} stageName
   * @param {string} imageSrc
   */
  addStageAndSelect(stageName, imageSrc) {
    this.addStage(stageName, imageSrc);
    this.currentSpriteName = stageName;
  }

  //----------------------------- below for deleting Sprite

  /**
   */
  restart(){
      this._isHalting = false;
      this.removeIndex = [];
      let name;

      for(let i = 1; i < this.spritesOrder.length; i++){
          name = myCanvas.spritesOrder[i].name;
          myCanvas.getSpriteByName(name).isHalting = false;
      }
  }

  /**
   * When the pause btn clicked.
   */
  allPause() {
    this._isHalting = true;
    let curSprite;

    for (let idx = 0; idx < this.spritesOrder.length; ++idx) {
      curSprite = this._spritesOrder[idx];

      if (curSprite === null) continue;

      if (curSprite.isClone[0]) { // if it is a clone,
        this.cloneRemoveFromParent(curSprite);
      } else { //it's not clone (== normal Sprite )
        this._spritesOrder[idx].isHalting = true;
      }
    }

    this.removeFromOrder(this.spritesOrder)
  }

  /**
   * The clone is removed from its parent.
   * @param {Sprite} curSprite
   */
  cloneRemoveFromParent(curSprite){
    let curName = curSprite._name;
    let parent = this.getSpriteByName(curSprite.isClone[1]);

    parent._cloneChilds = [];
    this.removeFromCanvas(curName, true);
  }

  /**
   */
  //@Todo: Some Edit is needed for Performance
  removeFromOrder() {
    for(let i=this.removeIndex.length-1; i>=0; i--)
      this.spritesOrder.splice(this.removeIndex[i], 1);

    console.log(this.spritesOrder);
  }

  /**
   * @param {string} spriteName
   */
  static removeFromGallery(spriteName){
      let removeTag = document.getElementById(spriteName);
      let parentTag = document.getElementById('spriteGallery');
      parentTag.removeChild(removeTag);
  }

  /**
   * @param {string} spriteName
   * @param {boolean} isClone
   */
  removeFromCanvas(spriteName, isClone = false) {
    let Order = this.spritesOrder;

    for(let i=0; i<Order.length; ++i)
      if((Order[i] !== null) && (Order[i]._name === spriteName)){
        this.removeIndex.push(i);
        break;
    }

    if(!isClone){
      this.removeFromOrder();
      Canvas.removeFromGallery(spriteName);
    }

    delete this._sprites[spriteName];
    this._currentSpriteName = this.spritesOrder[1];
  }

  /**
   * @param {Sprite} sprite
   * @param {number} newLayer
   */
  changeSpriteOrder(sprite, newLayer) {
    sprite = this.getActualSpriteObject(sprite);
    let currentLayer = this.getLayerNumber(sprite);

    if (currentLayer === newLayer) {
      return;
    }

    this._spritesOrder.splice(currentLayer, 1);
    this._spritesOrder.splice(newLayer, 0, sprite);
  }

  /**
   * @param {Sprite} sprite
   */
  moveSpriteToTop(sprite) {
    this.changeSpriteOrder(sprite, this.spritesOrder.length - 1)
  }

  /**
   * @param {Library} library
   * @param {string[]} oldFunctions
   */
  updateLibraryBlocks(library, oldFunctions) {
    this._spritesOrder.forEach((sprite) => {
      if (sprite) sprite.updateLibraryBlocks(library, oldFunctions);
    });
  }
}

