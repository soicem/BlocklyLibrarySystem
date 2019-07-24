class Sprite {
  constructor(canvas, image, imageData, position, size, angle) {
    this.setCanvas(canvas);
    this.setImage(image);
    this.setImageData(imageData);
    this.setPosition(position);
    this.setSize(size);
    this.setAngle(angle);

    this.setJsCode("");
    this.setXml("");
  }

  initImage() {
    this.getImage().addEventListener("load", () => {
      //this.draw();
    }, false);
  }

  ////////// Getter & Setter //////////

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
    return this._position;
  }

  setPosition(position) {
    this._position = position;
  }

  getSize() {
    return this._size;
  }

  setSize(size) {
    this._size = size;
  }

  getAngle() {
    return this._direction;
  }

  setAngle(direction) {
    this._direction = direction;
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

  // --- More ---

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

  getPixelsOfRgb(rgb) {
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
          foundPixels.push(new Point(x, y));
        }
      }
    }

    return foundPixels;
  }

  getPixelsOfAnyColor() {
    return this.getPixelsOfRgb(null);
  }

  ////////// Class Methods //////////

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
  }

  moveSteps(step) {
    this.getPosition().offsetByAngle(this.getAngle(), step);
  }

  turnRight(degree) {
    this.getAngle().plus(degree);
  }

  turnLeft(degree) {
    this.getAngle().minus(degree);
  }

  changeDirection(degree) {
    this.setAngle(new Degree(degree));
  }

  positionRandomly() {
    this.getPosition().setRandomX(
        this.getCanvas().width - this.getSize().getWidth());
    this.getPosition().setRandomY(
        this.getCanvas().height - this.getSize().getHeight());
  }

  goToPoint(x, y) {
    this.getPosition().setXY(x, y);
  }

  say(text) {
    //ToDo
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
      return this.getCanvas().isOverlayingColor(this, this.hexToRgb(lookupHex));
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
      return this.getCanvas().isColorOverlayingColor(this, hexToRgba(baseHex),
          hexToRgba(lookupHex));
    } else {
      return false;
    }
  }
}
