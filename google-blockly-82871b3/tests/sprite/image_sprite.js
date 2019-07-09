class ImageSprite {
  constructor(manager, canvas, imageSrc, x = 0, y = 0, width = 50, height = 50,
      direction = 0) {
    this.timerCnt = 0;
    this.manager = manager;
    this.imageSrc = imageSrc;
    this.code = "";
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.initX = 0;
    this.initY = 0;
    this.width = width;
    this.height = height;
    this.commands = [];
    this.nextCommand = "";
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

  get initY() {
    return this._initY;
  }

  set initY(value) {
    this._initY = value;
  }

  get initX() {
    return this._initX;
  }

  set initX(value) {
    this._initX = value;
  }

  get nextCommand() {
    return this._nextCommand;
  }

  set nextCommand(value) {
    this._nextCommand = value;
  }

  get commands() {
    return this._commands;
  }

  set commands(value) {
    this._commands = value;
  }

  get timerCnt() {
    return this._timerCnt;
  }

  set timerCnt(value) {
    this._timerCnt = value;
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

  _update() {
    //this.canvas.clear();
    //this.canvas.getContext().drawImage(this.imageObj, this.x, this.y, this.width, this.height);
  }

  _moveSteps(step) {
    function _update() {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          this_.canvas.clear();
          this_.canvas.getContext().drawImage(this_.imageObj, x_, y_,
              width_, height_);
          this_.nextCommand = this_.commands.shift();
          //console.log(this_.nextCommand.replace("this_", "this"));
          resolve("anything");
        }, 10);
      });
    }

    function toRadians(angle) {
      return angle * (Math.PI / 180);
    }

    //console.log("direction : ", this.direction);
    let x = step * Math.round(Math.cos(toRadians(this.direction)));
    let y = step * Math.round(Math.sin(toRadians(this.direction)));

    /*let x = step *  Math.round(Math.cos(toRadians(this.direction)));
    let y = step *  Math.round(Math.sin(toRadians(this.direction)));*/

    /*console.log("step : ", step);
    console.log("a : ", x);
    console.log("b : ", y);*/
    this.x += x;
    this.y += y;
    /*console.log("x : ", this.x);
    console.log("y : ", this.y);*/

    let this_ = this;
    let x_ = this.x;
    let y_ = this.y;
    let width_ = this.width;
    let height_ = this.height;
    _update()
    .then(
        function (result) {
          if (this_.nextCommand != "") {
            console.log("next command");
            console.log(this_.nextCommand);
            eval(this_.nextCommand);
          }
        }
    );
    //setTimeout(_update, this.timerCnt * 5);
  }

  moveSteps(step) {
    function toRadians(angle) {
      return angle * (Math.PI / 180);
    }

    //console.log("direction : ", this.direction);
    let x = step * Math.round(Math.cos(toRadians(this.direction)));
    let y = step * Math.round(Math.sin(toRadians(this.direction)));

    /*let x = step *  Math.round(Math.cos(toRadians(this.direction)));
    let y = step *  Math.round(Math.sin(toRadians(this.direction)));*/

    /*console.log("step : ", step);
    console.log("a : ", x);
    console.log("b : ", y);*/
    this.x += x;
    this.y += y;
    /*console.log("x : ", this.x);
    console.log("y : ", this.y);*/

    let this_ = this;
    let x_ = this.x;
    let y_ = this.y;
    let width_ = this.width;
    let height_ = this.height;
    //this.timerCnt++;
    this.commands.push("this_._moveSteps(" + step + ")");
    //this._update();
    //setTimeout(_update, this.timerCnt * 5);
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

  _setDirection(degree) {
    this.direction = degree;
    this.nextCommand = this.commands.shift();

    let this_ = this;
    eval(this.nextCommand);
  }

  setDirection(degree) {
    this.direction = degree;
    this.commands.push("this_._setDirection(" + degree + ")");
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
    function _update() {
      this_.canvas.clear();
      this_.canvas.getContext().drawImage(this_.imageObj, x_, y_,
          width_, height_);
    }

    this.initX = x;
    this.initY = y;

    this.x = x;
    this.y = y;

    let this_ = this;
    let x_ = this.x;
    let y_ = this.y;
    let width_ = this.width;
    let height_ = this.height;
    this.timerCnt++;
    setTimeout(_update, this.timerCnt * 5);
  }

  _say(text) {
    function _update() {
      bubble.draw(100, 30, 5, text);
    }

    let bubble = new SpeechBubble(this);
    console.log("bubble");
    this.nextCommand = this.commands.shift();
    _update();
    eval(this.nextCommand);

  }

  say(text) {
    this.commands.push("this_._say(" + "\"" + text + "\"" + ")");
  }

  /**
   * Return if given RGB color is detected on overlaying area of this sprite
   * @param {!red} int The binary value of red
   * @param {!green} int The binary value of green
   * @param {!blue} int The binary value of blue
   * @return {!bool} The result of whether given RGB color was detected
   */
  isTouchingColor(red, green, blue) {
    let isTouching = false;
    let data = this.manager.getOverlayingDataOf(this);

    // go through each pixel data of overlaying data
    for (let i = 0; i < data.length; i += 4) {
      const dataR = data[i] || 0; // Red
      const dataG = data[i + 1] || 0; // Green
      const dataB = data[i + 2] || 0; // Blue
      const dataA = data[i + 3] || 0; // Alpha

      let isPixelVisible = (dataA !== 0);
      let isLookupColor = (dataR === red && dataG === green && dataB === blue);
      if (isPixelVisible && isLookupColor) {
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

    code = validationCheck(this.code + "\n" + code);
    console.log(code);
    console.log("in executeJS");
    this.printProperties();

    this.timerCnt = 0;
    let this_ = this;
    eval(code);
    console.log(this.commands);
    this.nextCommand = this.commands.shift();
    this.x = this.initX;
    this.y = this.initY;
    eval(this.nextCommand);
    //this.commands = [];
    //this.moveSteps(10);

    //this.printProperties();
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
