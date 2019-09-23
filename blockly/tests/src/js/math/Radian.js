class Radian extends Angle {
  /**
   * @param {number} radian
   */
  constructor(radian) {
    super(radian);
  }

  ////////// Getter & Setter //////////

  // --- More ---

  /**
   * @Override
   * @returns {number}
   */
  getFullAngle() {
    return 2 * Math.PI;
  }

  /**
   * @Override
   * @returns {number}
   */
  getRadian() {
    return super.angle;
  }

  /**
   * @Override
   * @returns {number}
   */
  getDegree() {
    return super.angle * 180 / Math.PI;
  }

  ////////// Class Methods //////////

  /**
   * @Override
   * @returns {Radian}
   */
  clone() {
    return new Radian(this.getRadian());
  }

  /**
   * @Override
   * @returns {Radian}
   */
  toRadian() {
    return this;
  }

  /**
   * @Override
   * @returns {Degree}
   */
  toDegree() {
    return new Degree(this.getDegree());
  }

  /**
   * @Override
   * @param {Angle} angle
   * @return {Radian}
   */
  plus(angle) {
    const newAngle = this.angle + angle.getRadian();
    return this.angle = newAngle
  }

  /**
   * @Override
   * @param {Angle} angle
   * @return {Radian}
   */
  minus(angle) {
    const newAngle = this.angle - angle.getRadian();
    return this.angle = newAngle
  }
}
