// let canvas = document.getElementById("myCanvas");
// canvas.width = 500;
// canvas.height = 300;
// let context = canvas.getContext("2d");

// function clearCanvas() {
//   context.clearRect(0, 0, canvas.width, canvas.height);
// }


class Canvas {
  constructor(target, elementId, order = 0, width = 500, height = 300) {
    this.injectHtml(elementId, target);

    this.elementId = elementId;
    this.order = order;
    this.width = width;
    this.height = height;
  }

  injectHtml(elementId, target) {
    let newCanvas = document.createElement("canvas");
    newCanvas.id = elementId;

    document.getElementById(target).appendChild(newCanvas);
  }

  get elementId() {
    return this._elementId;
  }

  set elementId(value) {
    this._elementId = value;
  }

  get order() {
    return this._order;
  }

  set order(value) {
    this._order = value;
    this.getCanvas().style.zIndex = this._order;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = (value > 0) ? value : 0;
    this.getCanvas().width = this._width;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = (value > 0) ? value : 0;
    this.getCanvas().height = this._height;
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

