class Sprite {
  constructor(canvas, x, y, width, height, direction) {
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.direction = direction;
  }

  get canvas() {
    return this._canvas;
  }

  set canvas(value) {
    this._canvas = value;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = (value > 0) ? value : 0;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = (value > 0) ? value : 0;
  }

  get direction() {
    return this._direction;
  }

  set direction(value) {
    this._direction = value % 360;
  }

  draw() {
  }

  moveSteps(step) {
    function toRadians(angle) {
      return angle * (Math.PI / 180);
    }

    let x = step * Math.cos(toRadians(this.direction));
    let y = step * Math.sin(toRadians(this.direction));

    this.x += x;
    this.y += y;
  }

  turn(degree) {
    this.direction += degree;
  }

  turnRight(degree) {
    this.turn(degree);
  }

  turnLeft(degree) {
    this.turn(-degree);
  }

  positionRandomly() {
    this.x = Math.random() * (this.canvas.width - this.width);
    this.y = Math.random() * (this.canvas.height - this.height);
  }

  positionToMouse() {
    //ToDo: add mousemove event handler to track its position
  }
}

