class Size {
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width = 1, height = 1) {
    this._width = width;
    this._height = height;
  }

  ////////// Getter & Setter //////////

  /**
   * @returns {number}
   */
  get width() {
    return this._width;
  }

  /**
   * @param {number} width
   */
  set width(width) {
    if (width <= 0) {
      throw new IllegalArgumentException(
          "Width cannot be zero or negative");
    }

    this._width = width;
  }

  /**
   * @returns {number}
   */
  get height() {
    return this._height;
  }

  /**
   * @param {number} height
   */
  set height(height) {
    if (height <= 0) {
      throw new IllegalArgumentException(
          "Height cannot be zero or negative");
    }

    this._height = height;
  }

  ////////// Class Methods //////////

  /**
   * @returns {Size}
   */
  clone() {
    return new Size(this.width, this.height);
  }

}
