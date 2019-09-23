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
  /**
   * @param {number} degree
   */
  constructor(degree) {
    super(degree);
  }

  ////////// Getter & Setter //////////

  // --- More ---

  /**
   * @Override
   * @returns {number}
   */
  getFullAngle() {
    return 360;
  }

  /**
   * @Override
   * @returns {number}
   */
  getDegree() {
    return super.angle;
  }

  /**
   * @Override
   * @returns {number}
   */
  getRadian() {
    return super.angle * Math.PI / 180;
  }

  ////////// Class Methods //////////

  /**
   * @Override
   * @returns {Degree}
   */
  clone() {
    return new Degree(this.getDegree());
  }

  /**
   * @Override
   * @returns {Degree}
   */
  toDegree() {
    return this;
  }

  /**
   * @Override
   * @returns {Radian}
   */
  toRadian() {
    return new Radian(this.getRadian());
  }

  /**
   * @Override
   * @param {Angle} angle
   * @returns {Degree}
   */
  plus(angle) {
    const newAngle = this.angle + angle.getDegree();
    // 기존 코드 return this.angle = newAngle : 반환값이 없음
    this.angle = newAngle;
    return this; // 수정 (2019-08-17) by soicem
  }

  /**
   * @Override
   * @param {Angle} angle
   * @returns {Degree}
   */
  minus(angle) {
    const newAngle = this.angle - angle.getDegree();
    this.angle = newAngle // 반환값이 없음
    return this;
  }
}
