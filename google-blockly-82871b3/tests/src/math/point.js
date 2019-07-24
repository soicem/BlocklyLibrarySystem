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

  setRandomX(max, min = 0) {
    this.setX(Math.random() * (max - min) + min);
  }

  setRandomY(max, min = 0) {
    this.setY(Math.random() * (max - min) + min);
  }

  getAbsoluteOffsetTo(point) {
    const x = Math.abs(point.getX() - this.getX());
    const y = Math.abs(point.getY() - this.getY());
    return new Point(x, y);
  }

  getOffsetTo(point) {
    const x = point.getX() - this.getX();
    const y = point.getY() - this.getY();
    return new Point(x, y);
  }

  getOffsetFrom(point) {
    return point.getOffsetTo(this);
  }

  ////////// Class Methods //////////

  clone() {
    return new Point(this.getX(), this.getY());
  }

  offset(other) {
    this.setXY(this.getX() + other.getX(), this.getY() + other.getY());
    return this;
  }

  offsetByAngle(angle, distance) {
    let xOffset = Math.round(distance * Math.cos(angle.getRadian()));
    let yOffset = Math.round(distance * Math.sin(angle.getRadian()));

    return this.offset(new Point(xOffset, yOffset));
  }
}
