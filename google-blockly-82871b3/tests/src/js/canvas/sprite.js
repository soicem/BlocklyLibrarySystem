class Sprite {
  get isHalting() {
    return this._isHalting;
  }

  set isHalting(value) {
    this._isHalting = value;
  }
  get isContinue() {
    return this._isContinue;
  }

  set isContinue(value) {
    this._isContinue = value;
  }
  get cloneChilds() {
    return this._cloneChilds;
  }

  set cloneChilds(value) {
    this._cloneChilds.push(value);
  }
  get isClone() {
    return this._isClone;
  }

  set isClone(value) {
    this._isClone = value;
  }

  constructor(canvas, image, imageData, position, size, angle, name, isClone=[false,]) {
    this._isClone = isClone;
    this._cloneChilds = [];
    this._name = name; // 이름
    this._isContinue = true;
    this._isHalting = false;
    this._imageSrc = [];
    this.setCostume(image.src);
    this.setCurrentCostumeSrc(0);
    this.setCanvas(canvas);
    this.setImage(image);
    this.setImageData(imageData);
    this.setPosition(position);
    this.setSize(size);
    this.setAngle(angle);
    this.setSpeechBubble(null);
    this.setJsCode("");
    this.resetXml();


    /* Event 별 코드 저장을 위함 (ex : whenFlagClicked)*/
    /* 특정 이벤트를 여러번 작성 가능*/
    this._whenClicked = [];
    this._whenCloning = [];
  }


  get whenCloning() {
    return this._whenCloning;
  }

  set whenCloning(value) {
    this._whenCloning = value;
  }
  get whenClicked() {
    return this._whenClicked;
  }

  set whenClicked(value) {
    this._whenClicked = value;
  }

  ////////// Getter & Setter //////////

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }


  getIdentifier(){
    return this.identifier;
  }

  setIdentifier(id){
    this.identifier = id;
  }

  getCanvas() {
    return this._canvas;
  }

  setCanvas(canvas) {
    this._canvas = canvas;
  }

  getImage() {
    return this._image;
  }

  setImage(image) {
    this._image = image;
  }

  getCostume(num) {
    return this._imageSrc[num];
  }

  getCostumeLength(){
    return this._imageSrc.length;
  }

  setCostume(imageSrc) {
    this._imageSrc.push(imageSrc);
  }

  getCurrentCostumeSrc() {
    return this._currentCostumeSrc;
  }

  setCurrentCostumeSrc(num) {
    this._currentCostumeSrc = num;
  }

  getImageData() {
    return this._imageData;
  }

  setImageData(imageData) {
    this._imageData = imageData;
  }

  getPosition() {
    return this._position.clone();
  }

  setPosition(position) {
    this._position = position.clone();
  }

  getSize() {
    return this._size.clone();
  }

  setSize(size) {
    this._size = size.clone();
  }

  getAngle() {
    return this._direction.clone();
  }

  setAngle(direction) {
    this._direction = direction.clone();
  }

  getSpeechBubble() {
    return this._speechBubble;
  }

  setSpeechBubble(speechBubble) {
    this._speechBubble = speechBubble;
  }

  getJsCode() {
    return this._jsCode;
  }

  setJsCode(jsCode) {
    this._jsCode = jsCode;
  }

  getXml() {
    return this._xml;
  }

  setXml(xml) {
    this._xml = xml.trim();
  }

  getImageFilename() {
    return decodeURI(this.getImageSource().substring(
        this.getImageSource().lastIndexOf('/') + 1));
  }

  // --- More ---

  getContext() {
    return this.getCanvas().getContext();
  }

  getImageSource() {
    return this.getImage().src;
  }

  getCostumeSource(num) {
    return this.getCostume(num);
  }

  setCostumeSource(num, src) {
    this._imageSrc[num] = src;
  }

  getX() {
    return this.getPosition().getX();
  }

  setX(x) {
    this._position.setX(x);
  }

  getY() {
    return this.getPosition().getY();
  }

  setY(y) {
    this._position.setY(y);
  }

  getWidth() {
    return this.getSize().getWidth();
  }

  setWidth(width) {
    this._size.setWidth(width);
  }

  getHeight() {
    return this.getSize().getHeight();
  }

  setHeight(height) {
    this._size.setHeight(height);
  }

  getPixelsOfRgb(rgb, withGap = false) {
    let foundPixels = [];

    const canvas = document.createElement('canvas');
    const context = canvas.getContext("2d");
    canvas.width = this.getWidth();
    canvas.height = this.getHeight();
    context.drawImage(this.getImage(), 0, 0, this.getWidth(), this.getHeight());
    const data = context.getImageData(0, 0, this.getWidth(),
        this.getHeight()).data;

    let i = 0;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++, i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        if (a === 0) {
          continue;
        }

        if ((rgb === null || rgb.a === 0) ||
            (r === rgb.r && g === rgb.g && b === rgb.b)) {
          if (withGap) {
            foundPixels.push(new Point(x + this.getX(), y + this.getY()));
          } else {
            foundPixels.push(new Point(x, y));
          }
        }
      }
    }

    return foundPixels;
  }

  getPixelsOfAnyColor(withGap = false) {
    return this.getPixelsOfRgb(null, withGap);
  }

  ////////// Class Methods //////////

  resetXml() {
    this.setXml("<xml xmlns='http://www.w3.org/1999/xhtml'></xml>");
  }

  clearSpeechBubble() {
    this.setSpeechBubble(null);
  }

  printProperties() {
    console.log("x : ", this.getPosition().getX());
    console.log("y : ", this.getPosition().getY());
    console.log("height : ", this.getSize().getHeight());
    console.log("width : ", this.getSize().getWidth());
  }

  render() {
    this.getCanvas().getContext().drawImage(
        this.getImage(), this.getX(), this.getY(), this.getWidth(),
        this.getHeight()
    );

    if (this.getSpeechBubble()) {
      this.getSpeechBubble().render();
    }
  }

  moveSteps(step) {
    let newPosition = this.getPosition().offsetByAngle(this.getAngle(), step);
    this.setPosition(newPosition);
  }

  turnRight(angle) {
    const newAngle = this.getAngle().plus(angle);
    //console.log(newAngle, angle)
    this.setAngle(newAngle);
  }

  turnLeft(angle) {
    const newAngle = this.getAngle().minus(angle);
    this.setAngle(newAngle);
  }

  // ex : new Degree(180);
  changeDirection(angle) {
    this.setAngle(angle);
  }

  wait(sec) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(true);
      }, sec * 1000);
    });
  }

  goToPoint(x, y) {
    this.setPosition(new Point(x, y));
  }

  goToRandomPosition() {
    const max = {
      width: this.getCanvas().getWidth() - this.getWidth(),
      height: this.getCanvas().getHeight() - this.getHeight()
    };

    let point = new Point();
    point.setRandomX(max.width);
    point.setRandomY(max.height);
    this.setPosition(point);
  }

  goToMousePosition() {
    let mousePosition = this.getCanvas().getHandler().getMousePosition();
    let newPosition = mousePosition.offset(
        new Point(-this.getWidth() / 2, -this.getHeight() / 2));
    //console.log(mousePosition, -this.getWidth() / 2, -this.getHeight() / 2)
    this.setPosition(newPosition);
  }

  glideToMousePosition(second) {
    //this.goToMousePosition();
    setTimeout(this.goToMousePosition.bind(this), second * 1000);
  }

  say(text) {
    this.setSpeechBubble(new SpeechBubble(this, text));
  }

  isTouchingColorHex(lookupHex) {
    function hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    if (hexToRgb(lookupHex)) {
      return CanvasUtil.isOverlayingColor(this.getCanvas(), this,
          hexToRgb(lookupHex));
    } else {
      return false;
    }
  }

  isColorTouchingColorHex(baseHex, lookupHex) {
    function hexToRgba(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: parseInt(result[4], 16)
      } : null;
    }

    if (hexToRgba(baseHex) && hexToRgba(lookupHex)) {
      return CanvasUtil.isColorOverlayingColor(this.getCanvas(), this,
          hexToRgba(baseHex),
          hexToRgba(lookupHex));
    } else {
      return false;
    }
  }

  isTouchingSprite(spriteName) {
    const sprite = this.getCanvas().getSpriteByName(spriteName);
    return CanvasUtil.isSpriteTouchingSprite(this.getCanvas(), this, sprite);
  }

  nextCostume(){
    alert("nextCostume() called");
    this.setCurrentCostumeSrc(this.getCurrentCostumeSrc() + 1);
    var nextCostumeNum = this.getCurrentCostumeSrc();
    if((nextCostumeNum % this.getCostumeLength()) == 0){
      nextCostumeNum %= this.getCostumeLength();
      this.setCurrentCostumeSrc(0);
    }
    alert(this._name + "" + this.getCurrentCostumeSrc() + "and " + nextCostumeNum + " " + this.getCostume(nextCostumeNum));
    this._image.src = this.getCostume(nextCostumeNum);
  }

  switchCostume(spriteNum){
    this._image.src = this.getCostume(spriteNum);
  }
}
