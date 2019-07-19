/**
 * In canvas, y-axis is flip upside-down.
 *
 *             270
 *             |
 *    180 --- + --- 0/360
 *           |
 *          90
 */

class Degree {
  constructor(degree) {
    this.setDegree(degree);
  }

  ////////// Getter & Setter //////////

  getDegree() {
    return this._degree;
  }

  setDegree(degree) {
    this._degree = degree % 360;
  }

  ////////// Class Methods //////////

  toRadian() {
    return new Radian(this.getDegree() * (Math.PI / 180));
  }

  plus(degree) {
    this.setDegree(this.getDegree() + degree);
  }

  minus(degree) {
    this.setDegree(this.getDegree() - degree);
  }
}
