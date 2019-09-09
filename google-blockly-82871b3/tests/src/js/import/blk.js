
function isNullEmptyUndefined(target) {
  return (target === undefined || target === null || target === "");
}

function addToSpriteGallery(name, source) {
  if (!isNullEmptyUndefined(source)) {
    let base = "data:image/png;base64," + source;
    let a = '<div class="spriteImg\" id="' + name
        + '" onclick="myCanvas.setCurrentSprite(\'' + name + '\')">' +
        '<img src="' + base + '" alt="">' +
        '<div class="desc">' + name.split(".")[0] + '</div>' +
        '</div>';

    document.getElementById("spriteGallery").innerHTML += a;
  }
}

function addToStageGallery(name, source) {
  if (!isNullEmptyUndefined(source)) {
    let base = "data:image/png;base64," + source;
    let a = '<div class="stage\" id="' + name
        + '" onclick="myCanvas.setCurrentSprite(\'' + name + '\')">' +
        '<img src="' + base + '" alt="">' +
        '<div class="desc">' + name.split(".")[0] + '</div>' +
        '</div>';

    document.getElementById("stageGallery").innerHTML += a;
  }
}

function importImage(file) {
  let splitFilename = (file.name).split('/');
  let fullName = splitFilename[1];
  let pictureName = fullName.split('.')[0];

  return file.async('base64').then(fileData => {
    if (!isNullEmptyUndefined(fullName)) {
      addToSpriteGallery(pictureName, fileData);
      myCanvas.addSprite(pictureName, fileData, fullName);
    }
  }).catch(
      console.log.bind(console)
  );
}

function importBackImage(file) {
  let splitFilename = (file.name).split('/');
  let fullName = splitFilename[1];
  let pictureName = fullName.split('.')[0];

  return file.async('base64').then(fileData => {
    if (!isNullEmptyUndefined(fullName)) {
      addToStageGallery(pictureName, fileData);
      myCanvas.addStage(pictureName, fileData, fullName);
    }
  }).catch(
      console.log.bind(console)
  );
}

function importXml(file, tmpXml) {
  let xmlName = file.name.substring(0, (file.name).indexOf(".xml"));

  return file.async('text').then(fileData => {
    if (myCanvas.getSpriteByName(xmlName) === undefined) {
      // if (xmlName !== "") {
      tmpXml[xmlName] = fileData;
      // }
    } else {
      myCanvas.getSpriteByName(xmlName).xml = fileData;
    }
  }).catch(
      console.log.bind(console)
  )
}

function importLibraryXml(file, workspace) {
  return file.async('text').then(fileData => {
    myImport(workspace, fileData)
  }).catch(
      console.log.bind(console)
  );
}

function importJs(file, tmpJs) {
  let jsName = file.name.substring(0, (file.name).indexOf(".js"));

  return file.async('text').then(fileData => {
    if (myCanvas.getSpriteByName(jsName) === undefined) {
      // if (jsName !== "") {
      tmpJs[jsName] = fileData;
      // }
    } else {
      myCanvas.getSpriteByName(jsName).jsCode = fileData;
    }
  }).catch(
      console.log.bind(console)
  )
}

function importLib(file) {
  return file.async('text').then(fileData => {
    myCanvas.libCode = fileData
  }).catch(
      console.log.bind(console)
  );
}

function getPromiseAccordingToFile(file, promises, tmpXml, tmpJs) {
  if (file.name.indexOf("backImage/") !== -1) {
    return importBackImage(file);
  } else if (file.name.indexOf("images/") !== -1) {
    return importImage(file);
  } else if (file.name.indexOf(".xml") !== -1) {
    return importXml(file, tmpXml);
  } else if ((file.name.indexOf('.js') !== -1) && (file.name.indexOf('.json') === -1)) {
    return importJs(file, tmpJs);
  } else if (file.name.indexOf('.lib') !== -1) {
    return importLib(file);
  }
}

function lazyEvaluateJs(tmpJs) {
  let isEmpty = Object.keys(tmpJs).length;
  let matching;

  if (isEmpty > 0) {
    matching = Object.keys(tmpJs);
    matching.forEach(data => {
      myCanvas.getSpriteByName(data).jsCode = tmpJs[data];
    });
  }
}

function lazyEvaluateXml(tmpXml) {
  if (Object.keys(tmpXml).length > 0) {
    let match = Object.keys(tmpXml);
    match.forEach(data => myCanvas.getSpriteByName(data).xml = tmpXml[data]);
  }
}

function lazyEvaluate(tmpJs, tmpXml, workspace) {
  lazyEvaluateJs(tmpJs);
  lazyEvaluateXml(tmpXml);
  switchWorkspaceTo(myCanvas.getCurrentSprite(), workspace);
}

function importProjFile(fileInputElement, workspace) {
  let files = fileInputElement.files[0]; // FileList object
  let reader = new FileReader();

  reader.onload = (function () {
    return async function (evt) {
      let proj = await JSZip.loadAsync(evt.target.result);

      const promises = [];
      let tmpJs = {};
      let tmpXml = {};

      // 1. make Promise of each operation for each files in proj (not actually executing)
      // 2. and then push it to promises array
      proj.forEach((relativePath, file) => {
        promises.push(getPromiseAccordingToFile(file, promises, tmpXml, tmpJs));
      });

      // 1. run all pre-processed promises
      // 2. if there's any post-process steps, proceed them
      Promise.all(promises).then(() => {
        lazyEvaluate(tmpJs, tmpXml, workspace)
      }).catch(
          console.log.bind(console)
      );
    };
  })(files);

  reader.readAsArrayBuffer(files);
  console.log(myCanvas.spritesOrder);
}

function extractAccordingToFile(file, workspace) {
  if (file.name.indexOf(".xml") !== -1) {
    importLibraryXml(file, workspace)
  } else if (file.name.indexOf(".lib") !== -1) {
    importLib(file);
  }
}

function importBlkFile(fileInputElement, workspace) {
  let files = fileInputElement.files[0]; // FileList object
  let reader = new FileReader();

  reader.onload = (function () {
    return async function (evt) {
      const blk = await JSZip.loadAsync(evt.target.result);

      blk.forEach((relativePath, file) => {
        extractAccordingToFile(file, workspace);
      });
    };
  })(files);

  reader.readAsArrayBuffer(files);
  console.log(myCanvas.spritesOrder);
}
