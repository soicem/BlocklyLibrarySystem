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
    this.setX(Math.round(Math.random() * (max - min) + min));
  }

  setRandomY(max, min = 0) {
    this.setY(Math.round(Math.random() * (max - min) + min));
  }

  setRandomXY(max, min = 0) {
    this.setRandomX(max, min);
    this.setRandomY(max, min);
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

  equals(other) {
    return this.getX() === other.getX() && this.getY() === other.getY();
  }

  greaterThan(other) {
    return (this.getY() === other.getY() && this.getX() > other.getX())
        || this.getY() > other.getY();
  }

  lessThan(other) {
    return (this.getY() === other.getY() && this.getX() < other.getX())
        || this.getY() < other.getY();
  }

  offset(other) {
    return new Point(this.getX() + other.getX(), this.getY() + other.getY());
  }

  offsetByAngle(angle, distance) {
    let xOffset = Math.round(distance * Math.cos(angle.getRadian()));
    let yOffset = Math.round(distance * Math.sin(angle.getRadian()));

    return this.offset(new Point(xOffset, yOffset));
  }
}
