/**
 * @param {Blockly.Block} newBlock
 */
Blockly.Block.prototype.swapBlockWith = function (newBlock) {
  const nextBlock = this.nextConnection.targetBlock();
  if (nextBlock) {
    newBlock.nextConnection.connect(nextBlock.previousConnection);
  }
  newBlock.previousConnection.connect(this.nextConnection);
  this.dispose(true);
};
