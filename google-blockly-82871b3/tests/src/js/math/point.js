class Point {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x = 0, y = 0) {
    this.setXY(x, y);
  }

  ////////// Getter & Setter //////////

  /**
   * @returns {number}
   */
  get x() {
    return this._x;
  }

  /**
   * @param {number} x
   */
  set x(x) {
    this._x = x;
  }

  /**
   * @returns {number}
   */
  get y() {
    return this._y;
  }

  /**
   * @param {number} y
   */
  set y(y) {
    this._y = y;
  }

  // --- More ---

  /**
   * @param {number} x
   * @param {number} y
   */
  setXY(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * @param {number} max
   * @param {number} min
   */
  setRandomX(max, min = 0) {
    this.x = Math.round(Math.random() * (max - min) + min);
  }

  /**
   * @param {number} max
   * @param {number} min
   */
  setRandomY(max, min = 0) {
    this.y = Math.round(Math.random() * (max - min) + min);
  }

  /**
   * @param {number} max
   * @param {number} min
   */
  setRandomXY(max, min = 0) {
    this.setRandomX(max, min);
    this.setRandomY(max, min);
  }

  /**
   * @param {Point} point
   * @returns {Point}
   */
  getAbsoluteOffsetTo(point) {
    const x = Math.abs(point.x - this.x);
    const y = Math.abs(point.y() - this.y());
    return new Point(x, y);
  }

  /**
   * @param {Point} point
   * @returns {Point}
   */
  getOffsetTo(point) {
    const x = point.x - this.x;
    const y = point.y - this.y;
    return new Point(x, y);
  }

  /**
   * @param {Point} point
   * @returns {Point}
   */
  getOffsetFrom(point) {
    return point.getOffsetTo(this);
  }

  ////////// Class Methods //////////

  /**
   * @returns {Point}
   */
  clone() {
    return new Point(this.x, this.y);
  }

  /**
   * @param {Point} other
   * @returns {boolean}
   */
  equals(other) {
    return this.x === other.x && this.y === other.y;
  }

  /**
   * @param {Point} other
   * @returns {boolean}
   */
  greaterThan(other) {
    return (this.y === other.y && this.x > other.x)
        || this.y > other.y;
  }

  /**
   * @param {Point} other
   * @returns {boolean}
   */
  lessThan(other) {
    return (this.y === other.y && this.x < other.x)
        || this.y < other.y;
  }

  /**
   * @param {Point} other
   * @returns {Point}
   */
  offset(other) {
    return new Point(this.x + other.x, this.y + other.y);
  }

  /**
   * @param {Angle} angle
   * @param {number} distance
   * @returns {Point}
   */
  offsetByAngle(angle, distance) {
    let xOffset = Math.round(distance * Math.cos(angle.getRadian()));
    let yOffset = Math.round(distance * Math.sin(angle.getRadian()));

    return this.offset(new Point(xOffset, yOffset));
  }
}
