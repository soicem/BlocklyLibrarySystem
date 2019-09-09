
function updateCurrentSpriteXml(workspace) {
  let xml = Blockly.Xml.workspaceToDom(workspace);
  let xmlText = Blockly.Xml.domToPrettyText(xml);
  myCanvas.getCurrentSprite().setXml(xmlText);
}

function exportImage(sprite) {
  ImgToBLK(sprite.getImageFilename(), sprite.getImageData());
}

function exportBackImage(sprite) {
  BackImgToBLK(sprite.getImageFilename(), sprite.getImageData());
}

function exportXml(sprite) {
  const filename = sprite.name + ".xml";
  FileToBLK(filename, sprite.getXml(), false);
}

function exportJs(sprite) {
  const filename = sprite.name + ".js";
  FileToBLK(filename, sprite.getJsCode(), false);
}

function exportLib(libraryCode) {
  const filename = "library.lib";
  FileToBLK(filename, libraryCode, true);
}

function exportStage(stage) {
  if (stage) {
    exportBackImage(stage);
    exportXml(stage);
    exportJs(stage);
  }
}

function exportSprite(sprite) {
  if (sprite) {
    exportImage(sprite);
    exportXml(sprite);
    exportJs(sprite);
  }
}

function exportProjFile(filename, ext, workspace) {
  updateCurrentSpriteXml(workspace);

  exportStage(myCanvas.spritesOrder[0]);
  for (let i = 1; i < myCanvas.spritesOrder.length; i++) {
    const sprite = myCanvas.spritesOrder[i];
    if (sprite.isClone[0]) continue;
    exportSprite(sprite);
  }
  exportLib(myCanvas.libCode);

  CreateBLK(filename, ext);
}

// also used in import\blk
function switchWorkspaceTo(sprite, workspace) {
  let dom = Blockly.Xml.textToDom(sprite.getXml());
  blockWorkspace.clear();
  Blockly.Xml.domToWorkspace(dom, workspace);
}

function generateLibraryCode(workspace) {
  let libraryCode = "";

  for (let i = 1; i < myCanvas.spritesOrder.length; i++) {
    const sprite = myCanvas.spritesOrder[i];

    if (sprite) {
      switchWorkspaceTo(myCanvas.getSpriteByName(sprite.name), workspace);
      const workspaceCode = Blockly['JavaScript'].workspaceToCode(workspace);
      if (workspaceCode) libraryCode += workspaceCode;
    }
  }
  switchWorkspaceTo(myCanvas.getCurrentSprite(), workspace);

  return libraryCode;
}

function exportBlkFile(filename, ext, workspace) {
  updateCurrentSpriteXml(workspace);

  for (let i = 1; i < myCanvas.spritesOrder.length; i++) {
    const sprite = myCanvas.spritesOrder[i];
    if (sprite.isClone[0]) continue;
    exportXml(sprite);
  }
  exportLib(generateLibraryCode(workspace));

  CreateBLK(filename, ext);
}
