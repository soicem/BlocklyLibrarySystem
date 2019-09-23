function drawengine(targetCanvas, tarageCtx,  targetBufCanvas, targetBufctx, cmdList) {
    console.log("drawengine()");

    cmdList.forEach(function(e) {
        // console.log(e);
        // console.log(e.length);
        if (e.length > 0) {
            var cmd = e.split(' ');
            // console.log(cmd);
            processCmd(cmd, targetBufctx);
        }
    });

    tarageCtx.clearRect(0, 0, targetCanvas.width, targetCanvas.height);
    tarageCtx.drawImage(targetBufCanvas, 0, 0);
}

var drawCmdTable = {
    color:processColor,
    pencil_begin:processPencil,
    pencil_end:processPencil,
    line:processLine,
    circle:processCircle,
    rect:processRect,
    square:processRect,
    tri:processTri
}

var enginePos = {
    color: "red",
    filled: false,
}

function processCmd(cmd, targetBufctx) {
    console.log("processCmd: " + cmd[0]);
    drawCmdTable[cmd[0]](cmd, targetBufctx);   
}

function processColor(cmd, targetBufctx) {
    console.log("processColor");
    enginePos.color = cmd[1];
}

function processPencil(cmd, targetBufctx) {
    console.log("processPencil");
}

function processLine(cmd, targetBufctx) {
    console.log("processLine");
    targetBufctx.beginPath();
    targetBufctx.strokeStyle = enginePos.color;

    var X1 = {
        X:parseInt(cmd[1]),
        Y:parseInt(cmd[2])
    }
    
    var X2= {
        X:parseInt(cmd[3]),
        Y:parseInt(cmd[4])   
    }

    targetBufctx.moveTo(X1.X, X1.Y);
    targetBufctx.lineTo(X2.X, X2.Y);
    targetBufctx.stroke();

    targetBufctx.closePath();
}

function processCircle(cmd, targetBufctx) {
    console.log("processCircle");

    targetBufctx.beginPath();
    targetBufctx.strokeStyle = enginePos.color;

    var filled = (cmd[4] == 'F') ? true : false;

    var circle = {
        X: parseInt(cmd[1]),
        Y: parseInt(cmd[2]),
        R: parseInt(cmd[3])
    };

    targetBufctx.arc(circle.X, circle.Y, circle.R, 0, Math.PI * 2);

    if (filled) {
        targetBufctx.fillStyle = enginePos.color;
        targetBufctx.fill();
    } 

    targetBufctx.closePath();
    targetBufctx.stroke();
}

function processRect(cmd, targetBufctx) {
    console.log("processRect");

    targetBufctx.beginPath();
    targetBufctx.strokeStyle = enginePos.color;

    var X1 = {
        X:parseInt(cmd[1]),
        Y:parseInt(cmd[2])
    }
    
    var X2= {
        X:parseInt(cmd[3]),
        Y:parseInt(cmd[4])   
    }

    var filled = (cmd[5] == 'F') ? true : false;

    var box = {
        W: X2.X - X1.X,
        H: X2.Y - X1.Y
    };
    
    if (filled) {
        targetBufctx.fillStyle = enginePos.color;
        targetBufctx.fillRect(X1.X, X1.Y, box.W, box.H);
    } else {
        targetBufctx.strokeRect(X1.X, X1.Y, box.W, box.H);
    }

    targetBufctx.closePath();
}

function processTri(cmd, targetBufctx) {
    console.log("processTri");

    targetBufctx.beginPath();
    targetBufctx.strokeStyle = enginePos.color;

    var filled = (cmd[7] == 'F') ? true : false;

    var X1 = {
        X:parseInt(cmd[1]),
        Y:parseInt(cmd[2])
    }
    
    var X2= {
        X:parseInt(cmd[3]),
        Y:parseInt(cmd[4])   
    }

    var X3= {
        X:parseInt(cmd[5]),
        Y:parseInt(cmd[6])   
    }

    targetBufctx.moveTo(X1.X, X1.Y);
    targetBufctx.lineTo(X2.X, X2.Y);
    targetBufctx.lineTo(X3.X, X3.Y);
    targetBufctx.lineTo(X1.X, X1.Y);
    targetBufctx.stroke();

    if (filled) {
        targetBufctx.fillStyle = enginePos.color;
        targetBufctx.fill();
      } 

    targetBufctx.closePath();
}
