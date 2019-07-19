class Radian {
  constructor(radian) {
    this.setRadian(radian);
  }

  ////////// Getter & Setter //////////

  getRadian() {
    return this._radian;
  }

  setRadian(radian) {
    this._radian = radian % (2 * Math.PI);
  }

  ////////// Class Methods //////////

  toDegree() {
    return new Degree(this.getRadian() * (180 / Math.PI));
  }

  plus(radian) {
    this.setRadian(this.getRadian() + radian);
  }

  minus(radian) {
    this.setRadian(this.getRadian() - radian);
  }
}
