/**
 * In canvas, y-axis is flip upside-down.
 *
 *             270
 *             |
 *    180 --- + --- 0/360
 *           |
 *          90
 */

class Degree extends Angle {
  constructor(degree) {
    super(degree);
  }

  ////////// Getter & Setter //////////

  // --- More ---

  getFullAngle() {
    return 360;
  }

  getDegree() {
    return super.getAngle();
  }

  getRadian() {
    return super.getAngle() * Math.PI / 180;
  }

  ////////// Class Methods //////////

  toDegree() {
    return this;
  }

  toRadian() {
    return new Radian(this.getRadian());
  }

}
