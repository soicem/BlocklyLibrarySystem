// let canvas = document.getElementById("myCanvas");
// canvas.width = 500;
// canvas.height = 300;
// let context = canvas.getContext("2d");

// function clearCanvas() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
// }


class Canvas {
  constructor(elementId, width = 300, height = 150) {
    this.elementId = elementId;
    this.width = width;
    this.height = height;
  }

  get elementId() {
    return this._elementId;
  }

  set elementId(value) {
    this._elementId = value;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = (value > 0) ? value : 0;
    this.getCanvas().width = value;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = (value > 0) ? value : 0;
    this.getCanvas().height = value;
  }

  getCanvas() {
    return document.getElementById(this.elementId);
  }

  getContext() {
    return this.getCanvas().getContext("2d");
  }

  clear() {
    this.getContext().clearRect(0, 0, this.width, this.height);
  }
}

