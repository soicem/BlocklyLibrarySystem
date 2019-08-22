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

  //@Override
  getFullAngle() {
    return 360;
  }

  //@Override
  getDegree() {
    return super.getAngle();
  }

  //@Override
  getRadian() {
    return super.getAngle() * Math.PI / 180;
  }

  ////////// Class Methods //////////

  //@Override
  clone() {
    return new Degree(this.getDegree());
  }

  //@Override
  toDegree() {
    return this;
  }

  //@Override
  toRadian() {
    return new Radian(this.getRadian());
  }

  //@Override
  plus(angle) {
    const newAngle = this.getAngle() + angle.getDegree();
    // 기존 코드 return this.setAngle(newAngle); : 반환값이 없음
    this.setAngle(newAngle);
    return this; // 수정 (2019-08-17) by soicem
  }

  //@Override
  minus(angle) {
    const newAngle = this.getAngle() - angle.getDegree();
    this.setAngle(newAngle); // 반환값이 없음
    return this;
  }
}
