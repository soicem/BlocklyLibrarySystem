class Radian extends Angle {
  constructor(radian) {
    super(radian);
  }

  ////////// Getter & Setter //////////

  // --- More ---

  //@Override
  getFullAngle() {
    return 2 * Math.PI;
  }

  //@Override
  getRadian() {
    return super.getAngle();
  }

  //@Override
  getDegree() {
    return super.getAngle() * 180 / Math.PI;
  }

  ////////// Class Methods //////////

  //@Override
  clone() {
    return new Radian(this.getRadian());
  }

  //@Override
  toRadian() {
    return this;
  }

  //@Override
  toDegree() {
    return new Degree(this.getDegree());
  }

  //@Override
  plus(angle) {
    const newAngle = this.getAngle() + angle.getRadian();
    return this.setAngle(newAngle);
  }

  //@Override
  minus(angle) {
    const newAngle = this.getAngle() - angle.getRadian();
    return this.setAngle(newAngle);
  }
}
