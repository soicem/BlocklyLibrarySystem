/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for list blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.import');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['import_return'] = function (block) {
  return [getFunctionCall(block), Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['import_noReturn'] = function (block) {
  return getFunctionCall(block) + ";\n";
};

function getFunctionCall(block) {
  let funcName = block.getFieldValue("FUNC_FIELD").replace(" ", "_");
  let args = [];

  for (let i = 0; i < block.argsCount_; i++) {
    let noConnectionValue = "null";
    args[i] = Blockly.JavaScript.valueToCode(block, "ARG" + i,
        Blockly.JavaScript.ORDER_ATOMIC) || noConnectionValue;
  }

  const code = funcName + "(" + args.join(", ") + ")";
  return code;
}
