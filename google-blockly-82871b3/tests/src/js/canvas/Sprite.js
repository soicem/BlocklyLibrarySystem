class Sprite {
  constructor(canvas, image, imageData, position, size, angle, name, isClone=[false,]) {
    this._isClone = isClone;
    this._cloneChilds = [];
    this._isContinue = true;
    this._isHalting = false;
    this._name = name; // 이름
    this._imageSrc = [];
    this.setCostume(image.src);
    this.setCurrentCostumeSrc(0);
    this.canvas = canvas;
    this.image = image;
    this.imageData = imageData;
    this.position = position;
    this.size = size;
    this.angle = angle;
    this.speechBubble = null;
    this.jsCode = "";
    this.resetXml();


    /* Event 별 코드 저장을 위함 (ex : whenFlagClicked)*/
    /* 특정 이벤트를 여러번 작성 가능*/
    this._whenClicked = [];
    this._whenCloning = [];
  }

  ////////// Getter & Setter //////////

  get isClone() {
    return this._isClone;
  }

  set isClone(value) {
    this._isClone = value;
  }

  get cloneChilds() {
    return this._cloneChilds;
  }

  set cloneChilds(value) {
    this._cloneChilds.push(value);
  }

  get isContinue() {
    return this._isContinue;
  }

  set isContinue(value) {
    this._isContinue = value;
  }

  get isHalting() {
    return this._isHalting;
  }

  set isHalting(value) {
    this._isHalting = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
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

  getIdentifier(){
    return this.identifier;
  }

  setIdentifier(id){
    this.identifier = id;
  }

  get canvas() {
    return this._canvas;
  }

  set canvas(canvas) {
    this._canvas = canvas;
  }

  get image() {
    return this._image;
  }

  set image(image) {
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

  deleteCostume(num){
    this._imageSrc.splice(num, 1);
  }

  getCurrentCostumeSrc() {
    return this._currentCostumeSrc;
  }

  setCurrentCostumeSrc(num) {
    this._currentCostumeSrc = num;
  }

  get imageData() {
    return this._imageData;
  }

  set imageData(imageData) {
    this._imageData = imageData;
  }

  get position() {
    return this._position.clone();
  }

  set position(position) {
    this._position = position.clone();
  }

  get size() {
    return this._size.clone();
  }

  set size(size) {
    this._size = size.clone();
  }

  get angle() {
    return this._direction.clone();
  }

  set angle(direction) {
    this._direction = direction.clone();
  }

  get speechBubble() {
    return this._speechBubble;
  }

  set speechBubble(speechBubble) {
    this._speechBubble = speechBubble;
  }

  get jsCode() {
    return this._jsCode;
  }

  set jsCode(jsCode) {
    this._jsCode = jsCode;
  }

  get xml() {
    return this._xml;
  }

  set xml(xml) {
    this._xml = xml.trim();
  }

  getImageFilename() {
    return decodeURI(this.getImageSource().substring(
        this.getImageSource().lastIndexOf('/') + 1));
  }

  // --- More ---

  getContext() {
    return this.canvas.context;
  }

  getImageSource() {
    return this.image.src;
  }

  getCostumeSource(num) {
    return this.getCostume(num);
  }

  setCostumeSource(num, src) {
    this._imageSrc[num] = src;
  }

  get x() {
    return this.position.x;
  }

  set x(x) {
    this._position.x = x;
  }

  get y() {
    return this.position.y;
  }

  set y(y) {
    this._position.y = y;
  }

  get width() {
    return this.size.width;
  }

  set width(width) {
    this._size.width = width;
  }

  get height() {
    return this.size.height;
  }

  set height(height) {
    this._size.height = height;
  }

  getPixelsOfRgb(rgb, withGap = false) {
    let foundPixels = [];

    const canvas = document.createElement('canvas');
    const context = canvas.getContext("2d");
    canvas.width = this.width;
    canvas.height = this.height;
    context.drawImage(this.image, 0, 0, this.width, this.height);
    const data = context.getImageData(0, 0, this.width,
        this.height).data;

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
            foundPixels.push(new Point(x + this.x, y + this.y));
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
    this.xml = "<xml xmlns='http://www.w3.org/1999/xhtml'></xml>";
  }

  clearSpeechBubble() {
    this.speechBubble = null;
  }

  printProperties() {
    console.log("x : ", this.position.x);
    console.log("y : ", this.position.y);
    console.log("height : ", this.size.height);
    console.log("width : ", this.size.width);
  }

  render() {
    this.canvas.context.drawImage(
        this.image, this.x, this.y, this.width,
        this.height
    );

    if (this.speechBubble) {
      this.speechBubble.render();
    }
  }

  moveSteps(step) {
    let newPosition = this.position.offsetByAngle(this.angle, step);
    this.position = newPosition;
  }

  turnRight(angle) {
    const newAngle = this.angle.plus(angle);
    //console.log(newAngle, angle)
    this.angle = newAngle;
  }

  turnLeft(angle) {
    const newAngle = this.angle.minus(angle);
    this.angle = newAngle;
  }

  // ex : new Degree(180);
  changeDirection(angle) {
    this.angle = angle;
  }

  wait(sec) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(true);
      }, sec * 1000);
    });
  }

  goToPoint(x, y) {
    this.position = new Point(x, y);
  }

  goToRandomPosition() {
    const max = {
      width: this.canvas.width - this.width,
      height: this.canvas.height - this.height
    };

    let point = new Point();
    point.setRandomX(max.width);
    point.setRandomY(max.height);
    this.position = point;
  }

  goToMousePosition() {
    let mousePosition = this.canvas.handler.mousePosition;
    let newPosition = mousePosition.offset(
        new Point(-this.width / 2, -this.height / 2));
    //console.log(mousePosition, -this.width / 2, -this.height / 2)
    this.position = newPosition;
  }

  glideToMousePosition(second) {
    //this.goToMousePosition();
    setTimeout(this.goToMousePosition.bind(this), second * 1000);
  }

  say(text) {
    this.speechBubble = new SpeechBubble(this, text);
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
      return CanvasUtil.isOverlayingColor(this.canvas, this,
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
      return CanvasUtil.isColorOverlayingColor(this.canvas, this,
          hexToRgba(baseHex),
          hexToRgba(lookupHex));
    } else {
      return false;
    }
  }

  isTouchingSprite(spriteName) {
    const sprite = this.canvas.getSpriteByName(spriteName);
    return CanvasUtil.isSpriteTouchingSprite(this.canvas, this, sprite);
  }

  nextCostume(){
    this.setCurrentCostumeSrc(this.getCurrentCostumeSrc() + 1);
    var nextCostumeNum = this.getCurrentCostumeSrc();
    if((nextCostumeNum % this.getCostumeLength()) == 0){
      nextCostumeNum %= this.getCostumeLength();
      this.setCurrentCostumeSrc(0);
    }
    this._image.src = this.getCostume(nextCostumeNum);
  }

  switchCostume(spriteNum){
    this._image.src = this.getCostume(spriteNum);
  }
}
