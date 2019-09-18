/**
 * @param {string} namespaceName
 * @param {string} libraryName
 */
Blockly.Workspace.prototype.getLibraryBlocks = function(namespaceName, libraryName) {
  let blocks = this.getBlocksByType("import_return");
  blocks = blocks.concat(this.getBlocksByType("import_noReturn"));
  blocks = blocks.filter(block => {
    return block.namespaceName_ === namespaceName && block.libraryName_ === libraryName;
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

  for (let i = 0; i < blocks.length; i++) {
    const oldBlock = blocks[i];
    const newBlockXml = toolboxManager.getLibraryBlock(libraryFullName, oldBlock.funcName_);
    if (!newBlockXml) continue;
    const newBlock = Blockly.Xml.domToBlock(newBlockXml, this);

    oldBlock.swapBlockWith(newBlock);
  }
};
