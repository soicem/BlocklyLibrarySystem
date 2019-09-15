class Sprite {
  /**
   * @param {string} name
   * @param {Canvas} canvas
   * @param {string} imageSrc
   * @param {Point} position
   * @param {Size} size
   * @param {Angle} angle
   * @param {[boolean,]} isClone
   */
  constructor(name, canvas, imageSrc, position, size, angle, isClone = [false,]) {
    this._isClone = isClone;
    this._cloneChilds = [];
    this._isContinue = true;
    this._isHalting = false;
    this._imageSrc = [];
    this.name = name; // 이름
    this.canvas = canvas;
    this.image = new Image();
    this.setCostume(imageSrc);
    this.setCurrentCostumeSrc(0);
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

  /**
   * @returns {[boolean,]}
   */
  get isClone() {
    return this._isClone;
  }

  /**
   * @param {[boolean,]} value
   */
  set isClone(value) {
    this._isClone = value;
  }

  /**
   * @returns {Sprite[]}
   */
  get cloneChilds() {
    return this._cloneChilds;
  }

  /**
   * @param {Sprite[]} value
   */
  set cloneChilds(value) {
    this._cloneChilds.push(value);
  }

  /**
   * @returns {boolean}
   */
  get isContinue() {
    return this._isContinue;
  }

  /**
   * @param {boolean} value
   */
  set isContinue(value) {
    this._isContinue = value;
  }

  /**
   * @returns {boolean}
   */
  get isHalting() {
    return this._isHalting;
  }

  /**
   * @param {boolean} value
   */
  set isHalting(value) {
    this._isHalting = value;
  }

  /**
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * @param {string} value
   */
  set name(value) {
    this._name = value;
  }

  /**
   * @returns {string[]}
   */
  get whenCloning() {
    return this._whenCloning;
  }

  /**
   * @param {string[]} value
   */
  set whenCloning(value) {
    this._whenCloning = value;
  }

  /**
   * @returns {string[]}
   */
  get whenClicked() {
    return this._whenClicked;
  }

  /**
   * @param {string[]} value
   */
  set whenClicked(value) {
    this._whenClicked = value;
  }

  getIdentifier(){
    return this.identifier;
  }

  setIdentifier(id){
    this.identifier = id;
  }

  /**
   * @returns {Canvas}
   */
  get canvas() {
    return this._canvas;
  }

  /**
   * @param {Canvas} canvas
   */
  set canvas(canvas) {
    this._canvas = canvas;
  }

  /**
   * @returns {HTMLImageElement}
   */
  get image() {
    return this._image;
  }

  /**
   * @param {HTMLImageElement} image
   */
  set image(image) {
    this._image = image;
  }

  /**
   * @param {number} num
   * @returns {string}
   */
  getCostume(num) {
    return this._imageSrc[num];
  }

  /**
   * @returns {number}
   */
  getCostumeLength(){
    return this._imageSrc.length;
  }

  /**
   * @param {string} imageSrc
   */
  setCostume(imageSrc) {
    this._imageSrc.push(imageSrc);
  }

  deleteCostume(num){
    this._imageSrc.splice(num, 1);
  }

  /**
   * @returns {number}
   */

  getCurrentCostumeSrc() {
    return this._currentCostumeSrc;
  }

  /**
   * @param {number} num
   */
  setCurrentCostumeSrc(num) {
    this._currentCostumeSrc = num;
    this.image.src = this._imageSrc[num];
  }

  /**
   * @returns {Point}
   */
  get position() {
    return this._position.clone();
  }

  /**
   * @param {Point} position
   */
  set position(position) {
    this._position = position.clone();
  }

  /**
   * @returns {Size}
   */
  get size() {
    return this._size.clone();
  }

  /**
   * @param {Size} size
   */
  set size(size) {
    this._size = size.clone();
  }

  /**
   * @returns {Angle}
   */
  get angle() {
    return this._direction.clone();
  }

  /**
   * @param {Angle} direction
   */
  set angle(direction) {
    this._direction = direction.clone();
  }

  /**
   * @returns {SpeechBubble}
   */
  get speechBubble() {
    return this._speechBubble;
  }

  /**
   * @param {SpeechBubble} speechBubble
   */
  set speechBubble(speechBubble) {
    this._speechBubble = speechBubble;
  }

  /**
   * @returns {string}
   */
  get jsCode() {
    return this._jsCode;
  }

  /**
   * @param {string} jsCode
   */
  set jsCode(jsCode) {
    this._jsCode = jsCode;
  }

  /**
   * @returns {string}
   */
  get xml() {
    return this._xml;
  }

  /**
   * @param {string} xml
   */
  set xml(xml) {
    this._xml = xml.trim();
  }

  /**
   * @returns {string}
   */
  getImageFilename() {
    return decodeURI(this.getImageSource().substring(
        this.getImageSource().lastIndexOf('/') + 1));
  }

  // --- More ---

  /**
   * @returns {HTMLElement}
   */
  getContext() {
    return this.canvas.context;
  }

  /**
   * @returns {string}
   */
  getImageSource() {
    return this.image.src;
  }

  /**
   * @param {number} num
   * @returns {string}
   */
  getCostumeSource(num) {
    return this.getCostume(num);
  }

  /**
   * @param {number} num
   * @param {string} src
   */
  setCostumeSource(num, src) {
    this._imageSrc[num] = src;
  }

  /**
   * @returns {number}
   */
  get x() {
    return this.position.x;
  }

  /**
   * @param {number} x
   */
  set x(x) {
    this._position.x = x;
  }

  /**
   * @returns {number}
   */
  get y() {
    return this.position.y;
  }

  /**
   * @param {number} y
   */
  set y(y) {
    this._position.y = y;
  }

  /**
   * @returns {number}
   */
  get width() {
    return this.size.width;
  }

  /**
   * @param {number} width
   */
  set width(width) {
    this._size.width = width;
  }

  /**
   * @returns {number}
   */
  get height() {
    return this.size.height;
  }

  /**
   * @param {number} height
   */
  set height(height) {
    this._size.height = height;
  }

  /**
   * @param {{r:number,g:number,b:number}|null} rgb When null is given, there's no color filter
   * @param {boolean} withGap
   * @returns {Point[]}
   */
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

        if ((rgb === null && a !== 0) ||
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

  /**
   * @param {boolean} withGap
   * @returns {Point[]}
   */
  getPixelsOfAnyColor(withGap = false) {
    return this.getPixelsOfRgb(null, withGap);
  }

  ////////// Class Methods //////////

  /**
   * Resets xml string to default content
   */
  resetXml() {
    this.xml = "<xml xmlns='http://www.w3.org/1999/xhtml'></xml>";
  }

  /**
   * Clears speech bubble
   */
  clearSpeechBubble() {
    this.speechBubble = null;
  }

  /**
   * Prints log about this object
   */
  printProperties() {
    console.log("x : ", this.position.x);
    console.log("y : ", this.position.y);
    console.log("height : ", this.size.height);
    console.log("width : ", this.size.width);
  }

  /**
   * Renders this object into the canvas
   */
  render() {
    this.canvas.context.drawImage(
        this.image, this.x, this.y, this.width,
        this.height
    );

    if (this.speechBubble) {
      this.speechBubble.render();
    }
  }

  /**
   * @param {number} step
   */
  moveSteps(step) {
    let newPosition = this.position.offsetByAngle(this.angle, step);
    this.position = newPosition;
  }

  /**
   * @param {Angle} angle
   */
  turnRight(angle) {
    const newAngle = this.angle.plus(angle);
    //console.log(newAngle, angle)
    this.angle = newAngle;
  }

  /**
   * @param {Angle} angle
   */
  turnLeft(angle) {
    const newAngle = this.angle.minus(angle);
    this.angle = newAngle;
  }

  /**
   * @param {Angle} angle
   */
  // ex : new Degree(180);
  changeDirection(angle) {
    this.angle = angle;
  }

  /**
   * @param {number} sec
   * @returns {Promise<unknown>}
   */
  wait(sec) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve(true);
      }, sec * 1000);
    });
  }

  /**
   * @param {number} x
   * @param {number} y
   */
  goToPoint(x, y) {
    this.position = new Point(x, y);
  }

  /**
   * Moves this object to a random position
   */
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

  /**
   * Moves this object to a position of the mouse
   */
  goToMousePosition() {
    let mousePosition = this.canvas.handler.mousePosition;
    let newPosition = mousePosition.offset(
        new Point(-this.width / 2, -this.height / 2));
    //console.log(mousePosition, -this.width / 2, -this.height / 2)
    this.position = newPosition;
  }

  /**
   * @param {number} second
   */
  glideToMousePosition(second) {
    //this.goToMousePosition();
    setTimeout(this.goToMousePosition.bind(this), second * 1000);
  }

  /**
   * @param {string} text
   */
  say(text) {
    if (text.trim() === "") {
      this.clearSpeechBubble();
    } else {
      this.speechBubble = new SpeechBubble(this, text);
    }
  }

  /**
   * @param {string} lookupHex
   * @returns {boolean}
   */
  isTouchingColorHex(lookupHex) {
    /**
     * @param {string} hex
     * @returns {{r:number,g:number,b:number}}
     */
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

  /**
   * @param {string} baseHex
   * @param {string} lookupHex
   * @returns {boolean}
   */
  isColorTouchingColorHex(baseHex, lookupHex) {
    /**
     * @param {string} hex
     * @returns {{r:number,g:number,b:number,a:number}}
     */
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

  /**
   * @param {string} spriteName
   * @returns {boolean}
   */
  isTouchingSprite(spriteName) {
    const sprite = this.canvas.getSpriteByName(spriteName);
    return CanvasUtil.isSpriteTouchingSprite(this.canvas, this, sprite);
  }

  /**
   * Switches this object's costume to a next
   */
  nextCostume(){
    this.setCurrentCostumeSrc(this.getCurrentCostumeSrc() + 1);
    let nextCostumeNum = this.getCurrentCostumeSrc();
    if((nextCostumeNum % this.getCostumeLength()) === 0){
      nextCostumeNum %= this.getCostumeLength();
      this.setCurrentCostumeSrc(0);
    }
    this._image.src = this.getCostume(nextCostumeNum);
  }

  /**
   * @param {number} spriteNum
   */
  switchCostume(spriteNum){
    this._image.src = this.getCostume(spriteNum);
  }
}
