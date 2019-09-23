/**
 * Use as if it's an abstract class
 */

class Angle {
  /**
   * @param {number} angle
   */
  constructor(angle) {
    if (new.target === Angle) {
      throw new AbstractClassConstructException(
          "Cannot construct abstract instances directly");
    }

    this.angle = angle;
  }

  ////////// Getter & Setter //////////

  /**
   * @returns {number}
   */
  get angle() {
    return this._angle;
  }

  /**
   * @param {number} angle
   */
  set angle(angle) {
    this._angle = angle % this.getFullAngle();
  }

  // --- More ---
  /**
   * returns angle number that's a full round of selected angle unit
   * @return {number}
   */
  getFullAngle() {
    throw new AbstractMethodCallException(
        "Cannot call abstract method directly");
  }

  /**
   * get angle in radian unit
   * @return {number}
   */
  getRadian() {
    throw new AbstractMethodCallException(
        "Cannot call abstract method directly");
  }

  /**
   * get angle in degree unit
   * @return {number}
   */
  getDegree() {
    throw new AbstractMethodCallException(
        "Cannot call abstract method directly");
  }

  /////////// Class Methods ///////////

  /**
   * clones current angle object
   * @return {Radian|Degree}
   */
  clone() {
    throw new AbstractMethodCallException(
        "Cannot call abstract method directly");
  }

  /**
   * get radian object according to this angle value
   * @return {Radian}
   */
  toRadian() {
    throw new AbstractMethodCallException(
        "Cannot call abstract method directly");
  }

  /**
   * get degree object according to this angle value
   * @return {Degree}
   */
  toDegree() {
    throw new AbstractMethodCallException(
        "Cannot call abstract method directly");
  }

  /**
   * @param {Angle} angle
   * @return {Radian|Degree}
   */
  plus(angle) {
    throw new AbstractMethodCallException(
        "Cannot call abstract method directly");
  }

  /**
   * @param {Angle} angle
   * @return {Radian|Degree}
   */
  minus(angle) {
    throw new AbstractMethodCallException(
        "Cannot call abstract method directly");
  }

}
