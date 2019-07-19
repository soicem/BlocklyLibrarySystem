class Radian extends Angle {
  constructor(radian) {
    super(radian);
  }

  ////////// Getter & Setter //////////

  // --- More ---

  getFullAngle() {
    return 2 * Math.PI;
  }

  getRadian() {
    return super.getAngle();
  }

  getDegree() {
    return super.getAngle() * 180 / Math.PI;
  }

  ////////// Class Methods //////////

  toRadian() {
    return this;
  }

  toDegree() {
    return new Degree(this.getDegree());
  }
}
