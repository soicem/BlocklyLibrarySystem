class ImageSprite {
  constructor(canvas, image, x, y, width, height, direction) {
    this.image = image;
    this._code = "";
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.direction = direction;
    this.init();
  }

  printProperties(){
    console.log("x : " ,this.x)
    console.log("y : ", this.y)
    console.log("height : ", this.height)
    console.log("width : ", this.width);
  }

  get imageObj() {
    return this._imageObj;
  }

  set imageObj(value) {
    this._imageObj = value;
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

  moveSteps(step) {
    function toRadians(angle) {
      return angle * (Math.PI / 180);
    }
    console.log("direction : ", this.direction);
    console.log(step)
    let x = step * Math.cos(toRadians(this.direction));
    let y = step * Math.sin(toRadians(this.direction));
    console.log("a : " ,x)
    console.log("b : ", y);
    this.x += x;
    this.y += y;
    console.log("a : " ,this.x)
    console.log("b : ", this.y);

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

  positionRandomly() {
    this.x = Math.random() * (this.canvas.width - this.width);
    this.y = Math.random() * (this.canvas.height - this.height);
  }

  positionToMouse() {
    //ToDo: add mousemove event handler to track its position
  }

  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
  }

  get jsCode(){
    return this._code;
  }
  set jsCode(value){
    this._code = value;
  }

  // implement abstruct function from Sprite

  executeJS(code){
    // built-in 함수에 'this.'를 붙여줘서 유효성 체크를 하는 함수
    function validationCheck(jsCode){
      var a = jsCode.split("\n")
      var v;
      var ret = ""
      for(v in a){
        ret += a[v].replace("-", "this.") ;
      }
      return ret;
    }
    code = validationCheck(code)
    console.log(code);
    console.log("in executeJS")
    this.printProperties()

    eval(code);

    //this.moveSteps(10);

    this.printProperties();
    //console.log(this.image);
    //this.draw();
  }

  init() {
    this.imageObj = new Image();
    this.imageObj.addEventListener("load", () => {
      this.draw();
    }, false);
    this.imageObj.src = this.image;
    console.log(this.imageObj.src);
  }

  draw() {
    this.canvas.getContext().drawImage(this.imageObj, this.x, this.y,
        this.width,
        this.height);
  }
}
