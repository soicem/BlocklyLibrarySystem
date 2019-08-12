class Sprite {
  constructor(canvas, image, imageData, position, size, angle) {
    this.identifier = 0; // 일반 스프라이트(Default) : 0, 클론 : 1

    this.setCanvas(canvas);
    this.setImage(image);
    this.setImageData(imageData);
    this.setPosition(position);
    this.setSize(size);
    this.setAngle(angle);
    this.setSpeechBubble(null);
    this.setJsCode("");
    this.resetXml();


    // Event Stacks
    /* 특정 이벤트를 여러번 스크립트에 지정할 수 있으므로 Stack으로 구현*/
    this.whenClicked = [];
    this.whenCloning = [];
  }

  /* Event 별 코드 저장을 위함 (ex : whenFlagClicked)*/

  getWhenClickedCode(){
    return this.whenClicked; // It is a stack
  }

  setWhenClicked(code){
    this.whenClicked.push(code);
  }

  getWhenCloning(){
    return this.whenCloning; // It is a stack
  }

  setWhenCloning(code){
    this.whenCloning.push(code);
  }

  ////////// Getter & Setter //////////

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

  getX() {
    return this.getPosition().getX();
  }

  getY() {
    return this.getPosition().getY();
  }

  getWidth() {
    return this.getSize().getWidth();
  }

  getHeight() {
    return this.getSize().getHeight();
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
    this.setAngle(newAngle);
  }

  turnLeft(angle) {
    const newAngle = this.getAngle().minus(angle);
    this.setAngle(newAngle);
  }

  changeDirection(angle) {
    this.setAngle(angle);
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
    this.setPosition(newPosition);
  }

  glideToMousePosition(second) {
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
}
