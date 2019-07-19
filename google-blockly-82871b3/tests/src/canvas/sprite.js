class Sprite {
  constructor(canvas, image, position, size, direction) {
    this.setCanvas(canvas);
    this.setImage(image);
    this.setPosition(position);
    this.setSize(size);
    this.setDirection(direction);

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

  getDirection() {
    return this._direction;
  }

  setDirection(direction) {
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

  ////////// Class Methods //////////

  printProperties() {
    console.log("x : ", this.getPosition().getX());
    console.log("y : ", this.getPosition().getY());
    console.log("height : ", this.getSize().getHeight());
    console.log("width : ", this.getSize().getWidth());
  }

  render() {
    this.getCanvas().getContext().drawImage(
        this.getImage(), this.getX(), this.getY(), this.getWidth(), this.getHeight()
    );
  }

  moveSteps(step) {
    this.getPosition().offsetByRadian(this.getDirection().toRadian(), step);
  }

  turnRight(degree) {
    this.getDirection().plus(degree);
  }

  turnLeft(degree) {
    this.getDirection().minus(degree);
  }

  changeDirection(degree) {
    this.getDirection().setRadian(degree);
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

}
