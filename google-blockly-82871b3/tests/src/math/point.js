class Point {
  constructor(x = 0, y = 0) {
    this.setXY(x, y);
  }

  ////////// Getter & Setter //////////

  getX() {
    return this._x;
  }

  setX(x) {
    this._x = x;
  }

  getY() {
    return this._y;
  }

  setY(y) {
    this._y = y;
  }

  // --- More ---

  setXY(x, y) {
    this.setX(x);
    this.setY(y);
  }

  ////////// Class Methods //////////

  setRandomX(max, min = 0) {
    this.setX(Math.random() * (max - min) + min);
  }

  setRandomY(max, min = 0) {
    this.setY(Math.random() * (max - min) + min);
  }

  offset(x, y) {
    this.setX(this.getX() + x);
    this.setY(this.getY() + y);
  }

  offsetByAngle(angle, distance) {
    let xOffset = Math.round(distance * Math.cos(angle.getRadian()));
    let yOffset = Math.round(distance * Math.sin(angle.getRadian()));

    this.offset(xOffset, yOffset);
  }
}
