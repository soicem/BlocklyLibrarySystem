/**
 * @param {string} namespaceName
 * @param {string} libraryName
 */
Blockly.Workspace.prototype.getLibraryBlocks = function(namespaceName, libraryName) {
  let blocks = this.getBlocksByType("import_return");
  blocks = blocks.concat(this.getBlocksByType("import_noReturn"));
  blocks = blocks.filter(block => {
    return block.namespaceName_ === namespaceName && block.library_.name === libraryName;
  });

  return blocks;
};

/**
 * @param {Library} library
 * @param {ToolboxManager} toolboxManager
 */
Blockly.Workspace.prototype.updateLibraryBlocks = function (library, toolboxManager) {
  const libraryFullName = `${library.info.author}.${library.info.name}`;
  let blocks = this.getLibraryBlocks(library.info.author, library.info.name);
  blocks.forEach((oldBlock) => {
    const newBlockXml = toolboxManager.getLibraryBlock(libraryFullName, oldBlock.func_.name);
    if (!newBlockXml) return;
    const newBlock = Blockly.Xml.domToBlock(newBlockXml, this);
    if (!newBlock) return;

    oldBlock.swapBlockWith(newBlock);
  });
};

Blockly.Workspace.prototype.refresh = function () {
  this.clear();
  const xmlString = myCanvas.getCurrentSprite().xml;

  if (xmlString !== "") {
    const xml = Blockly.Xml.textToDom(xmlString);
    Blockly.Xml.domToWorkspace(xml, this);
  }
};
