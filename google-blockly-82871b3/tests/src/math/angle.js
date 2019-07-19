/**
 * Use as if it's an abstract class
 */

class Angle {
  constructor(angle) {
    if (new.target === Angle) {
      throw new AbstractClassConstructException("Cannot construct abstract instances directly");
    }

    this.setAngle(angle);
  }

  ////////// Getter & Setter //////////

  getAngle() {
    return this._angle;
  }

  setAngle(angle) {
    this._angle = angle % this.getFullAngle();
  }

  // --- More ---

  getFullAngle() {
    throw new AbstractMethodCallException("Cannot call abstract method directly");
  }

  getRadian() {
    throw new AbstractMethodCallException("Cannot call abstract method directly");
  }

  getDegree() {
    throw new AbstractMethodCallException("Cannot call abstract method directly");
  }

  toRadian() {
    throw new AbstractMethodCallException("Cannot call abstract method directly");
  }

  toDegree() {
    throw new AbstractMethodCallException("Cannot call abstract method directly");
  }

  /////////// Class Methods ///////////

  plus(value) {
    this.setAngle(this.getAngle() + value);
  }

  minus(value) {
    this.setAngle(this.getAngle() - value);
  }
}
