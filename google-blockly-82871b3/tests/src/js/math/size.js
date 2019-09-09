class Size {
  constructor(width = 1, height = 1) {
    this._width = width;
    this._height = height;
  }

  ////////// Getter & Setter //////////

  get width() {
    return this._width;
  }

  set width(width) {
    if (width <= 0) {
      throw new IllegalArgumentException(
          "Width cannot be zero or negative");
    }

    this._width = width;
  }

  get height() {
    return this._height;
  }

  set height(height) {
    if (height <= 0) {
      throw new IllegalArgumentException(
          "Height cannot be zero or negative");
    }

    this._height = height;
  }

  ////////// Class Methods //////////

  clone() {
    return new Size(this.width, this.height);
  }

}
