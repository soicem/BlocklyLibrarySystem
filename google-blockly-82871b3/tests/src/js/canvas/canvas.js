class Canvas {

  get isHalting() {
    return this._isHalting;
  }

  set isHalting(value) {
    this._isHalting = value;
  }
  constructor(canvas, size, workspace) {
    this.setCanvas(canvas);
    this.setContext(canvas.getContext("2d"));
    this.setSize(size);
    this.setWorkspace(workspace);
    this.setHandler(new CanvasHandler(this));
    this.initialize();
    this._isHalting = false;
  }

  initialize() {
    this._sprites = {};
    this._spritesOrder = [null]; // Index 0 is reserved for a stage
    this._currentSpriteName = null;
    this._currentCostumeNum = 0;
    this._specificSpriteName = null; // 코드 실행 시 사용
    this._waitName = null;
    this.getHandler().startTrackMousePosition();
    this.getHandler().startSelectSprite();
    this.setSpecificSpriteName("aww-cat.png")
    this._libCode = "";
    this.removeIndex = [];
  }

////////// Getter & Setter //////////

  getRemoveIndex(){
    return this.removeIndex;
  }

  setRemoveIndex(arr){
    this.removeIndex = arr;
  }

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
    return this._currentSpriteName;
  }

  setCurrentSpriteName(spriteName) {
    this._currentSpriteName = spriteName;
  }

  getCurrentCostumeNum() {
    return this._currentCostumeNum;
  }

  setCurrentCostumeNum(costumeNum) {
    this._currentCostumeNum = costumeNum;
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

    this.loadCurrentSpriteCostumes();
  }

  loadCurrentSpriteCostumes(){
    clearCostumeGallery();
    var currentSprite = this.getCurrentSprite();
    var length = currentSprite.getCostumeLength();
    //alert("CostumeLength = " + length);
    for(var i = 0; length > i; i++){
      var a = '<div class="costumeImg\" id="' + myCanvas.getCurrentSpriteName() + '_' + i + '" onclick="myCanvas.setCurrentCostume(' + i + ')">'
          + '<img src="' + currentSprite.getCostume(i) + '" alt="">'
          + '<div class="desc">' + myCanvas.getCurrentSpriteName() + '_' + i + '</div>'
          + '</div>';
      document.getElementById("costumeGallery").innerHTML += a;
    }
    this.setCurrentCostume(0);
  }

  setCurrentCostume(num) {
    this.setCurrentCostumeNum(num);
    this.getCurrentSprite().setCurrentCostumeSrc(num);
    var l = document.getElementsByClassName('costumeImg');
    for (var i = 0; i < l.length; i++) {
      l[i].style.border = 'solid 1px #ccc';
    }
    initPage();
    loadImage(this.getCurrentSprite().getCostume(this.getCurrentCostumeNum()));
    document.getElementById(this.getCurrentSpriteName() + '_' + num).style.border = "solid 2px #415DCC";
  }

  addCostumeAndSelect(imageSrc) {
    //console.log(spriteName);
    //this.setCurrentCostumeNum(this.getCurrentCostumeNum() + 1);
    this.getCurrentSprite().setCostume(imageSrc);
    this.setCurrentCostume(this.getCurrentCostumeNum() + 1);
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

  addSprite(spriteName, imageData = null, imageSrc, isClone=[false,]) {
    const defaultSize = new Size(40, 40);

    let sprite = SpriteFactory.getSprite(this, defaultSize, spriteName,
        imageData, imageSrc, isClone);
    this._sprites[spriteName] = sprite;
    this._spritesOrder.push(sprite);

    return sprite;
  }

  addSpriteAndSelect(spriteName, imageData = null, imageSrc, isClone = [false, ]) {
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


  //----------------------------- below for deleting Sprite

  Re_Start(){
      this._isHalting = false;
      this.removeIndex = [];
      let name;

      for(let i = 1; i < this.getSpritesOrder().length; i++){
          name = myCanvas.getSpritesOrder()[i].name;
          myCanvas.getSpriteByName(name).isHalting = false;
      }
  }

    // when the pause btn clicked.
    AllPause(){
        this._isHalting = true;
        let curSprite;

        for(let idx=0; idx <this.getSpritesOrder().length; ++idx){
            curSprite = this._spritesOrder[idx];

            if(curSprite === null)  continue;
            if(curSprite.isClone[0])// if it is a clone,
                this.CloneRemoveFromParent(curSprite, idx);
            else //it's not clone (== normal Sprite )
                this._spritesOrder[idx].isHalting = true;
        }
        this.RemoveFromOrder(this.getSpritesOrder())
    }

    // the clone is removed from its parent.
    CloneRemoveFromParent(curSprite){
      let curName = curSprite._name;
      let parent = this.getSpriteByName(curSprite.isClone[1]);

      parent._cloneChilds = [];
      this.RemoveFromCanvas(curName, true);
    }

  //@Todo: Some Edit is needed for Performance
    RemoveFromOrder() {
      for(let i=this.removeIndex.length-1; i>=0; i--)
        this.getSpritesOrder().splice(this.removeIndex[i], 1);

      console.log(this.getSpritesOrder());
  }

    static RemoveFromGallery(spriteName){
        let removeTag = document.getElementById(spriteName);
        let parentTag = document.getElementById('spriteGallery');
        parentTag.removeChild(removeTag);
    }

    RemoveFromCanvas(spriteName, isClone = false) {
      let Order = this.getSpritesOrder();

      for(let i=0; i<Order.length; ++i)
        if((Order[i] !== null) && (Order[i]._name === spriteName)){
          this.removeIndex.push(i);
          break;
      }

      if(!isClone){
        this.RemoveFromOrder();
        Canvas.RemoveFromGallery(spriteName);
      }

      delete this._sprites[spriteName];
      this._currentSpriteName = this.getSpritesOrder()[1];
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

