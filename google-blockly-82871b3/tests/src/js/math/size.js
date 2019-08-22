class Size {
  constructor(width = 1, height = 1) {
    this.setWidth(width);
    this.setHeight(height);
  }

  ////////// Getter & Setter //////////

  getWidth() {
    return this._width;
  }

  setWidth(width) {
    if (width <= 0) {
      throw new IllegalArgumentException(
          "Width cannot be zero or negative");
    }

    this._width = width;
  }

  getHeight() {
    return this._height;
  }

  setHeight(height) {
    if (height <= 0) {
      throw new IllegalArgumentException(
          "Height cannot be zero or negative");
    }

    this._height = height;
  }

  ////////// Class Methods //////////

  clone() {
    return new Size(this.getWidth(), this.getHeight());
  }

}
