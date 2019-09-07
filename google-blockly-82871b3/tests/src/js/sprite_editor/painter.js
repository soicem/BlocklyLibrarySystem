var cvs;
var canvas;

var bufCanvas;
var bufCtx;

var commandHistory = [];
var redoHistory = [];

var paintMode = [
  "point",
  "line",
  "circle",
  "filledcircle",
  "square",
  "filledsquare",
  "rect",
  "filledrect",
  "tri",
  "filledtri",
  "pencil_begin",
  "pencil_end"
];

var toolTable = {
  pencil: 0,
  line: 1,
  circle: 2,
  filledcircle: 3,
  square: 4,
  filledsquare: 5,
  rect: 6,
  filledrect: 7,
  tri: 8,
  filledtri: 9
};

var pointShape = {
  mouseDown: pointMouseDown,
  mouseMove: pointMouseMove,
  mouseUp: pointMouseUp
};

var shapeList = [pointShape];

var paintMouseDownAction = {
  point: pointMouseDown,
  line: lineMouseDown,
  circle: circleMouseDown,
  filledcircle: circleMouseDown,
  square: squareMouseDown,
  filledsquare: squareMouseDown,
  rect: rectMouseDown,
  filledrect: rectMouseDown,
  tri: triMouseDown,
  filledtri: triMouseDown,
};

var paintMouseUpAction = {
  point: pointMouseUp,
  line: lineMouseUp,
  circle: circleMouseUp,
  filledcircle: circleMouseUp,
  square: squareMouseUp,
  filledsquare: squareMouseUp,
  rect: rectMouseUp,
  filledrect: rectMouseUp,
  tri: triMouseUp,
  filledtri: triMouseUp
};

var paintMouseMoveAction = {
  point: pointMouseMove,
  line: lineMouseMove,
  circle: circleMouseMove,
  filledcircle: circleMouseMove,
  square: squareMouseMove,
  filledsquare: squareMouseMove,
  rect: rectMouseMove,
  filledrect: rectMouseMove,
  tri: triMouseMove,
  filledtri: triMouseMove
};

var pos = {
  isDraw: false,
  color: "black",
  colorIdx: 0,
  drawMode: 0,
  filled: false,
  mouseDownAction: paintMouseDownAction[paintMode[0]],
  mouseUpAction: paintMouseUpAction[paintMode[0]],
  mouseMoveAction: paintMouseMoveAction[paintMode[0]],
  x: 0,
  y: 0,
  update: function (drawMode) {
    this.drawMode = drawMode;
    this.mouseDownAction = paintMouseDownAction[paintMode[drawMode]];
    this.mouseUpAction = paintMouseUpAction[paintMode[drawMode]];
    this.mouseMoveAction = paintMouseMoveAction[paintMode[drawMode]];
  }
};

function point() {
  return {
    X: 0,
    Y: 0
  };
}

function drawCommand() {
  return {
    mode: paintMode[0],
    color: "white",
    filled: false,
    X1: point(),
    X2: point(),
    X3: point(),
    R: 0,
    lines: [],
    toCommand: function () {
      //console.log("toCommand");
      var newCommand = this.mode + " ";
      var isFilled = this.filled == true ? 'F' : 'E';
      switch (this.mode) {
        case "color":
          newCommand += this.color;
          break;
        case "pencil_begin":
        case "pencil_end":
          break;
        case "point":
        case "line":
          newCommand +=
            this.X1.X +
            " " +
            this.X1.Y +
            " " +
            this.X2.X +
            " " +
            this.X2.Y;
          break;
        case "circle":
          newCommand +=
            this.X1.X +
            " " +
            this.X1.Y +
            " " +
            this.R +
            " " +
            isFilled;
          break;
        case "square":
        case "rect":
          newCommand +=
            this.X1.X +
            " " +
            this.X1.Y +
            " " +
            this.X2.X +
            " " +
            this.X2.Y +
            " " +
            isFilled;
          break;
        case "tri":
          newCommand +=
            this.X1.X +
            " " +
            this.X1.Y +
            " " +
            this.X2.X +
            " " +
            this.X2.Y +
            " " +
            this.X3.X +
            " " +
            this.X3.Y +
            " " +
            isFilled;
          break;
        default:
          break;
      }

      console.log("toCommand: " + newCommand);
      return newCommand;
    }
  };
}

function getMousePosition(event) {
  var x = event.pageX - canvas.offsetLeft;
  var y = event.pageY - canvas.offsetTop;
  return { X: x, Y: y };
}

function mouseListener(event) {
  switch (event.type) {
    case "mousedown":
      if (!pos.isDraw) {
        pos.mouseDownAction(event);
      }
      break;
    case "mousemove":
      if (pos.isDraw) {
        pos.mouseMoveAction(event);
      }
      break;
    case "mouseup":
    case "mouseout":
      if (pos.isDraw) {
        pos.mouseUpAction(event);
      }
      break;
  }
}

function selectColor(choosedColor) {
  console.log("selectColor:" + choosedColor);
  var colorTableIdx = {
    red: 0,
    orange: 1,
    yellow: 2,
    green: 3,
    blue: 4,
    lightblue: 5,
    lightgreen: 6,
    brown: 7,
    purple: 8,
    pink: 9,
    gray: 10,
    lightgray: 11,
    black: 12,
    white: 13
  };
  pos.color = choosedColor;
  pos.colorIdx = colorTableIdx[choosedColor];

  var newColor = drawCommand();
  newColor.mode = "color";
  newColor.color = choosedColor;
  commandHistory.push(newColor.toCommand());
  addHistory(newColor.toCommand());
}

function selectTool(choosedTool) {
  console.log(choosedTool);
  if (choosedTool.indexOf("filled") != -1) {
    pos.filled = true;
  } else {
    pos.filled = false;
  }
  pos.update(toolTable[choosedTool]);
}

function pointMouseDown(event) {
  if (pos.isDraw) {
    return;
  }
  pos.isDraw = true;
  cvs.beginPath();
  cvs.strokeStyle = pos.color;
  var startPos = getMousePosition(event);
  cvs.moveTo(startPos.X, startPos.Y);
  cvs.stroke();
  pos.X = startPos.X;
  pos.Y = startPos.Y;

  var newPoint = drawCommand();
  newPoint.mode = "pencil_begin";
  commandHistory.push(newPoint.toCommand());
  addHistory(newPoint.toCommand());
}

function pointMouseMove(event) {
  var currentPos = getMousePosition(event);

  cvs.lineTo(currentPos.X, currentPos.Y);
  cvs.stroke();

  var newPoint = drawCommand();
  newPoint.mode = "line";
  newPoint.X1 = { X: pos.X, Y: pos.Y };
  newPoint.X2 = { X: currentPos.X, Y: currentPos.Y };
  commandHistory.push(newPoint.toCommand());
  addHistory(newPoint.toCommand());

  pos.X = currentPos.X;
  pos.Y = currentPos.Y;
}

function pointMouseUp(event) {
  if (!pos.isDraw) {
    return;
  }

  pos.isDraw = false;
  cvs.closePath();

  var newPoint = drawCommand();
  newPoint.mode = "pencil_end";
  commandHistory.push(newPoint.toCommand());
  addHistory(newPoint.toCommand());
}

function lineMouseDown(event) {
  console.log("lineMouseDown");
  if (pos.isDraw) {
    return;
  }
  bufCtx.drawImage(canvas, 0, 0);
  var startPos = getMousePosition(event);
  pos.X = startPos.X;
  pos.Y = startPos.Y;
  pos.isDraw = true;
}

function lineMouseMove(event) {
  console.log("lineMouseMove");
  var currentPos = getMousePosition(event);
  cvs.beginPath();
  // Need a delay
  cvs.clearRect(0, 0, canvas.width, canvas.height);
  cvs.drawImage(bufCanvas, 0, 0);

  cvs.strokeStyle = pos.color;
  cvs.moveTo(pos.X, pos.Y);
  cvs.lineTo(currentPos.X, currentPos.Y);
  cvs.closePath();
  cvs.stroke();
}

function lineMouseUp(event) {
  if (!pos.isDraw) {
    return;
  }
  console.log("lineMouseUp");
  var currentPos = getMousePosition(event);
  bufCtx.beginPath();
  bufCtx.strokeStyle = pos.color;
  bufCtx.moveTo(pos.X, pos.Y);
  bufCtx.lineTo(currentPos.X, currentPos.Y);
  bufCtx.closePath();
  bufCtx.stroke();
  cvs.drawImage(bufCanvas, 0, 0);

  var newLine = drawCommand();
  newLine.mode = "line";
  newLine.X1 = { X: pos.X, Y: pos.Y };
  newLine.X2 = { X: currentPos.X, Y: currentPos.Y };
  commandHistory.push(newLine.toCommand());
  addHistory(newLine.toCommand());

  pos.isDraw = false;
}

function circleMouseDown(event) {
  console.log("circleMouseDown");
  if (pos.isDraw) {
    return;
  }
  bufCtx.drawImage(canvas, 0, 0);
  pos.isDraw = true;
  var startPos = getMousePosition(event);
  pos.X = startPos.X;
  pos.Y = startPos.Y;
}

function circleMouseMove(event) {
  console.log("circleMouseMove");
  var currentPos = getMousePosition(event);
  cvs.beginPath();

  cvs.clearRect(0, 0, canvas.width, canvas.height);
  cvs.drawImage(bufCanvas, 0, 0);
  cvs.strokeStyle = "black";

  var circle = {
    X: Math.round((pos.X + currentPos.X) / 2),
    Y: Math.round((pos.Y + currentPos.Y) / 2),
    R: Math.round(Math.abs(currentPos.Y - pos.Y) / 2)
  };

  cvs.arc(circle.X, circle.Y, circle.R, 0, Math.PI * 2);

  if (pos.filled) {
    cvs.fillStyle = pos.color;
    cvs.fill();
  }

  cvs.closePath();
  cvs.stroke();
  cvs.strokeStyle = pos.color;
}

function circleMouseUp(event) {
  if (pos.isDraw) {
    console.log("lineMouseUp");
    var currentPos = getMousePosition(event);
    bufCtx.beginPath();
    bufCtx.strokeStyle = pos.color;
    var circle = {
      X: Math.round((pos.X + currentPos.X) / 2),
      Y: Math.round((pos.Y + currentPos.Y) / 2),
      R: Math.round(Math.abs(currentPos.Y - pos.Y) / 2)
    };

    bufCtx.arc(circle.X, circle.Y, circle.R, 0, Math.PI * 2);

    if (pos.filled) {
      bufCtx.fillStyle = pos.color;
      bufCtx.fill();
    }

    bufCtx.closePath();
    bufCtx.stroke();

    cvs.clearRect(0, 0, canvas.width, canvas.height);
    cvs.drawImage(bufCanvas, 0, 0);

    var newCircle = drawCommand();
    newCircle.mode = "circle";
    newCircle.filled = pos.filled;
    newCircle.X1 = { X: circle.X, Y: circle.Y };
    newCircle.R = circle.R;
    commandHistory.push(newCircle.toCommand());
    addHistory(newCircle.toCommand());

    pos.isDraw = false;
  }
}

function squareMouseDown(event) {
  console.log("rectMouseDown");
  if (pos.isDraw) {
    return;
  }
  bufCtx.drawImage(canvas, 0, 0);
  pos.isDraw = true;
  var startPos = getMousePosition(event);
  pos.X = startPos.X;
  pos.Y = startPos.Y;
}

function squareMouseMove(event) {
  console.log("rectMouseMove");
  var currentPos = getMousePosition(event);
  cvs.beginPath();

  cvs.clearRect(0, 0, canvas.width, canvas.height);
  cvs.drawImage(bufCanvas, 0, 0);
  cvs.strokeStyle = "black";

  var box = {
    W: currentPos.Y - pos.Y,
    H: currentPos.Y - pos.Y
  };

  if (pos.filled) {
    cvs.fillStyle = pos.color;
    cvs.fillRect(pos.X, pos.Y, box.W, box.H);
  }

  cvs.strokeRect(pos.X, pos.Y, box.W, box.H);
  cvs.closePath();
  cvs.stroke();
  cvs.strokeStyle = pos.color;
}

function squareMouseUp(event) {
  if (pos.isDraw) {
    console.log("lineMouseUp");
    var currentPos = getMousePosition(event);
    bufCtx.beginPath();
    bufCtx.strokeStyle = pos.color;
    var box = {
      W: currentPos.Y - pos.Y,
      H: currentPos.Y - pos.Y
    };
    if (pos.filled) {
      bufCtx.fillStyle = pos.color;
      bufCtx.fillRect(pos.X, pos.Y, box.W, box.H);
    } else {
      bufCtx.strokeRect(pos.X, pos.Y, box.W, box.H);
    }
    bufCtx.closePath();
    bufCtx.stroke();

    cvs.clearRect(0, 0, canvas.width, canvas.height);
    cvs.drawImage(bufCanvas, 0, 0);

    var newSqure = drawCommand();
    newSqure.mode = "square";
    newSqure.filled = pos.filled;
    newSqure.X1 = { X: pos.X, Y: pos.Y };
    newSqure.X2 = { X: (pos.X + box.H), Y: currentPos.Y };
    commandHistory.push(newSqure.toCommand());
    addHistory(newSqure.toCommand());

    pos.isDraw = false;
  }
}

function rectMouseDown(event) {
  console.log("rectMouseDown");
  if (pos.isDraw) {
    return;
  }
  bufCtx.drawImage(canvas, 0, 0);
  pos.isDraw = true;
  var startPos = getMousePosition(event);
  pos.X = startPos.X;
  pos.Y = startPos.Y;
}

function rectMouseMove(event) {
  console.log("rectMouseMove");
  var currentPos = getMousePosition(event);
  cvs.beginPath();

  cvs.clearRect(0, 0, canvas.width, canvas.height);
  cvs.drawImage(bufCanvas, 0, 0);

  cvs.strokeStyle = "black";
  var box = {
    W: currentPos.X - pos.X,
    H: currentPos.Y - pos.Y
  };

  cvs.strokeRect(pos.X, pos.Y, box.W, box.H);

  if (pos.filled) {
    cvs.fillStyle = pos.color;
    cvs.fillRect(pos.X, pos.Y, box.W, box.H);
  }

  cvs.stroke();
  cvs.closePath();
  cvs.strokeStyle = pos.color;
}

function rectMouseUp(event) {
  if (pos.isDraw) {
    console.log("lineMouseUp");
    var currentPos = getMousePosition(event);
    bufCtx.beginPath();
    bufCtx.strokeStyle = pos.color;
    var box = {
      W: currentPos.X - pos.X,
      H: currentPos.Y - pos.Y
    };
    if (pos.filled) {
      bufCtx.fillStyle = pos.color;
      bufCtx.fillRect(pos.X, pos.Y, box.W, box.H);
    } else {
      bufCtx.strokeRect(pos.X, pos.Y, box.W, box.H);
    }
    bufCtx.closePath();
    bufCtx.stroke();

    cvs.clearRect(0, 0, canvas.width, canvas.height);
    cvs.drawImage(bufCanvas, 0, 0);

    var newRect = drawCommand();
    newRect.mode = "rect";
    newRect.filled = pos.filled;
    newRect.X1 = { X: pos.X, Y: pos.Y };
    newRect.X2 = { X: currentPos.X, Y: currentPos.Y };
    commandHistory.push(newRect.toCommand());
    addHistory(newRect.toCommand());

    pos.isDraw = false;
  }
}

function triMouseDown(event) {
  console.log("triMouseDown");
  if (pos.isDraw) {
    return;
  }
  bufCtx.drawImage(canvas, 0, 0);
  pos.isDraw = true;
  var startPos = getMousePosition(event);
  pos.X = startPos.X;
  pos.Y = startPos.Y;
}

function triMouseMove(event) {
  console.log("triMouseMove");
  var currentPos = getMousePosition(event);

  cvs.clearRect(0, 0, canvas.width, canvas.height);
  cvs.drawImage(bufCanvas, 0, 0);

  var tri = {
    W: currentPos.X - pos.X,
    H: currentPos.Y - pos.Y,
    P: {
      X: pos.X * 2 - currentPos.X,
      Y: currentPos.Y
    }
  };

  cvs.beginPath();
  cvs.strokeStyle = "black";

  cvs.moveTo(pos.X, pos.Y);
  cvs.lineTo(currentPos.X, currentPos.Y);
  cvs.lineTo(tri.P.X, tri.P.Y);
  cvs.lineTo(pos.X, pos.Y);
  cvs.stroke();

  if (pos.filled) {
    cvs.fillStyle = pos.color;
    cvs.fill();
  }

  cvs.closePath();
  cvs.strokeStyle = pos.color;
}

function triMouseUp(event) {
  if (!pos.isDraw) {
      return;
  }
    console.log("triMouseUp");
    var currentPos = getMousePosition(event);

    var tri = {
      W: currentPos.X - pos.X,
      H: currentPos.Y - pos.Y,
      P: {
        X: pos.X * 2 - currentPos.X,
        Y: currentPos.Y
      }
    };

    bufCtx.beginPath();
    bufCtx.strokeStyle = pos.color;

    bufCtx.moveTo(pos.X, pos.Y);
    bufCtx.lineTo(currentPos.X, currentPos.Y);
    bufCtx.lineTo(tri.P.X, tri.P.Y);
    bufCtx.lineTo(pos.X, pos.Y);
    bufCtx.stroke();

    if (pos.filled) {
      bufCtx.fillStyle = pos.color;
      bufCtx.fill();
    }

    cvs.clearRect(0, 0, canvas.width, canvas.height);
    cvs.drawImage(bufCanvas, 0, 0);

    var newTriangle = drawCommand();
    newTriangle.mode = "tri";
    newTriangle.filled = pos.filled;
    newTriangle.X1 = { X: pos.X, Y: pos.Y };
    newTriangle.X2 = { X: currentPos.X, Y: currentPos.Y };
    newTriangle.X3 = { X: tri.P.X, Y: tri.P.Y };
    commandHistory.push(newTriangle.toCommand());
    addHistory(newTriangle.toCommand());

    pos.isDraw = false;
}

function saveImage(imageName) {
  if (imageName.length == 0) {
    imageName = "image";
  }
  imageName += ".png";
  var saveedImage = document.getElementById("saveImage");
  var image = document
    .getElementById("spriteCanvas")
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
  saveedImage.setAttribute("download", imageName);
  saveedImage.setAttribute("href", image);
}

function addHistory(cmd) {
  var history = document.getElementById("history").value;
  history += cmd.trim() + "\n";
  //console.log(history);
  document.getElementById("history").value = history;
}

function clearCanvas() {
  console.log("clearCanvas()");
  cvs.clearRect(0, 0, canvas.width, canvas.height);
  bufCtx.clearRect(0, 0, canvas.width, canvas.height);
}

function initHistory() {
  commandHistory = [];
  redoHistory = [];

  document.getElementById("history").value = "";

  var newColor = drawCommand();
  newColor.mode = "color";
  newColor.color = "black";
  commandHistory.push(newColor.toCommand());
  addHistory(newColor.toCommand());
}

function showHistory() {
  console.log("showHistory()");
  document.getElementById("history").style.display = "block";
}

function undo() {
  console.log("undo");

  if (commandHistory.length <= 1) {
    return;
  }

  var lastCommand = commandHistory.pop();
  redoHistory.push(lastCommand);

  if (lastCommand.trim() == "pencil_end") {
    console.log("Start remove pencil group");
    while (commandHistory.length > 1) {
       lastCommand = commandHistory.pop();
       lastCommand = lastCommand.trim();
       if (lastCommand.length == 0) {
         continue;
       }
       redoHistory.push(lastCommand);
       if (lastCommand.trim() == "pencil_begin") {
         break;
       }
    } 
  }

  var history = "";

  commandHistory.forEach(function (e) {
    history += e + "\n";
  });

  document.getElementById("history").value = history;
  clearCanvas();
  drawengine(canvas, cvs, bufCanvas, bufCtx, commandHistory);
}

function redo() {
  console.log("redo");

  if (redoHistory.length == 0) {
    return;
  }

  var lastCommand = redoHistory.pop();
  commandHistory.push(lastCommand);
  addHistory(lastCommand);

  if (lastCommand.trim() == "pencil_begin") {
    console.log("Start add pencil group");
    var history = "";
    while (redoHistory.length > 0) {
       lastCommand = redoHistory.pop();
       if (lastCommand.length == 0) {
          continue;
       }
       history += lastCommand.trim() + "\n";
       commandHistory.push(lastCommand);
       if (lastCommand.trim() == "pencil_end") {
         break;
       }
    } 
    addHistory(history);
  }

  clearCanvas();
  drawengine(canvas, cvs, bufCanvas, bufCtx, commandHistory);
}

function initPage() {
  console.log("initPage()");

  clearCanvas();
  initHistory();
}

function clearCostumeGallery(){
  a = document.getElementById("costumeGallery");
  a.innerHTML = "";
  initPage();
}

function reDrawCanvas() {
  console.log("reDrawCanvas");
  clearCanvas();
  commandHistory = [];

  commandHistory = document.getElementById("history").value.split('\n');
  // console.log(commandHistory)

  drawengine(canvas, cvs, bufCanvas, bufCtx, commandHistory);
}

function onLoadPage() {
  canvas = document.getElementById("spriteCanvas");
  cvs = canvas.getContext("2d");
  canvas.width = 500;
  canvas.height = 500;
  bufCanvas = document.createElement("canvas");
  bufCanvas.width = canvas.width;
  bufCanvas.height = canvas.height;
  bufCtx = bufCanvas.getContext("2d");

  canvas.addEventListener("mousedown", mouseListener);
  canvas.addEventListener("mousemove", mouseListener);
  canvas.addEventListener("mouseout", mouseListener);
  canvas.addEventListener("mouseup", mouseListener);

  initPage();
}