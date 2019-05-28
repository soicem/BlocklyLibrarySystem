Blockly.Python['import_return'] = function (block) {
  let funcName = block.getFieldValue("FUNC_FIELD").replace(" ", "_");
  let args = [];

  for (let i = 0; i < block.argsCount_; i++) {
    let noConnectionValue = "None";
    args[i] = Blockly.Python.valueToCode(block, "ARG" + i,
        Blockly.Python.ORDER_ATOMIC) || noConnectionValue;
  }

  let code = funcName + "(" + args.join(", ") + ")";
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
}

Blockly.Python['import_statement'] = function (block) {
  let funcName = block.getFieldValue("FUNC_FIELD").replace(" ", "_");
  let args = [];

  for (let i = 0; i < block.argsCount_; i++) {
    let noConnectionValue = "None";
    args[i] = Blockly.Python.valueToCode(block, "ARG" + i,
        Blockly.Python.ORDER_ATOMIC) || noConnectionValue;
  }

  let code = funcName + "(" + args.join(", ") + ")\n";
  return code;
}