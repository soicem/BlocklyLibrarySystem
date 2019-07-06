class ImageSprite {
  constructor(manager, canvas, imageSrc, x = 0, y = 0, width = 50, height = 50,
              direction = 0) {

    this.manager = manager;
    this.imageSrc = imageSrc;
    this.code = "";
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.direction = direction;
    this.init();
  }

  init() {
    this.imageObj = new Image();

    this.imageObj.addEventListener("load", () => {
      this.draw();
    }, false);

    this.imageObj.src = this.imageSrc;
    console.log(this.imageObj.src);
  }

  printProperties() {
    console.log("x : ", this.x);
    console.log("y : ", this.y);
    console.log("height : ", this.height);
    console.log("width : ", this.width);
  }

  get manager() {
    return this._manager;
  }

  set manager(value) {
    this._manager = value;
  }

  get imageSrc() {
    return this._image;
  }

  set imageSrc(value) {
    this._image = value;
  }

  get imageObj() {
    return this._imageObj;
  }

  set imageObj(value) {
    this._imageObj = value;
  }

  get code() {
    return this._code;
  }

  set code(value) {
    this._code = value;
  }

  get canvas() {
    return this._canvas;
  }

  set canvas(value) {
    this._canvas = value;
  }

  get x() {
    return this._x;
  }

  set x(value) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value) {
    this._y = value;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = (value > 0) ? value : 0;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = (value > 0) ? value : 0;
  }

  get direction() {
    return this._direction;
  }

  set direction(value) {
    this._direction = value % 360;
  }

  get jsCode() {
    return this._code;
  }

  set jsCode(value) {
    this._code = value;
  }

  moveSteps(step) {
    function toRadians(angle) {
      return angle * (Math.PI / 180);
    }

    console.log("direction : ", this.direction);
    console.log("step : ", step);
    let x = step *  Math.floor(Math.cos(toRadians(this.direction)));
    let y = step *  Math.floor(Math.sin(toRadians(this.direction)));
    console.log("a : ", x);
    console.log("b : ", y);
    this.x += x;
    this.y += y;
    console.log("to a : ", this.x);
    console.log("to b : ", this.y);

    this.update();
  }

  turn(degree) {
    this.direction += degree;
  }

  turnRight(degree) {
    this.turn(degree);
  }

  turnLeft(degree) {
    this.turn(-degree);
  }

  setDirection(degree) {
    this.direction = degree;
  }

  positionRandomly() {
    this.x = Math.random() * (this.canvas.width - this.width);
    this.y = Math.random() * (this.canvas.height - this.height);

    this.update();
  }

  positionToMouse() {
    //ToDo: add mousemove event handler to track its position

    this.update();
  }

  setXY(x, y) {
    this.x = x;
    this.y = y;

    this.update();
  }

  say(text) {
    let bubble = new SpeechBubble(this);
    bubble.draw(100, 30, 5, text);
  }

  isTouchingColor(r, g, b) {
    let isTouching = false;
    let data = this.manager.getOverlayingDataOf(this);

    for (let i = 0; i < data.length; i += 4) {
      const dataR = data[i];
      const dataG = data[i + 1];
      const dataB = data[i + 2];
      const dataA = data[i + 3];

      if (dataR === r && dataG === g && dataB === b && dataA !== 0) {
        isTouching = true;
        break;
      }
    }

    return isTouching;
  }

  isTouchingColorHex(hex) {
    function hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }

    let rgb = hexToRgb(hex);
    if (rgb) {
      return this.isTouchingColor(rgb["r"], rgb["g"], rgb["b"]);
    } else {
      return false;
    }
  }

  executeJS(code) {
    // built-in 함수에 'this.'를 붙여줘서 유효성 체크를 하는 함수
    function validationCheck(jsCode) {
      var a = jsCode.split("\n");
      var v;
      var ret = "";
      for (v in a) {
        ret += a[v].replace(/\@\@/g, "this_.") + "\n";
      }
      return ret;
    }

    code = validationCheck(code);
    console.log(code);
    console.log("in executeJS");
    this.printProperties();

    let this_ = this;
    eval(code);

    //this.moveSteps(10);

    this.printProperties();
    //console.log(this.image);
    //this.draw();
  }

  clear() {
    console.log("clear");
    this.canvas.clear();
  }

  draw() {
    console.log("draw");
    this.canvas.getContext().drawImage(this.imageObj, this.x, this.y,
        this.width, this.height);
  }

  update() {
    this.clear();
    this.draw();
  }
}
