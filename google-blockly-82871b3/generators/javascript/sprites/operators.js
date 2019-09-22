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

goog.provide('Blockly.JavaScript.operators');

goog.require('Blockly.JavaScript');

/**
 * @param {Blockly.Block} block
 * @param {Object<string, [string,number]>} options
 * @returns {[string, *]}
 */
function operatorBlocks(block, options) {
  console.log(block.getFieldValue("OPTION"))
  const option = options[block.getFieldValue("OPTION")];
  const operator = option[0];
  const order = option[1];
  const value1 = Blockly.JavaScript.valueToCode(block, "VALUE1", order) || "0";
  const value2 = Blockly.JavaScript.valueToCode(block, "VALUE2", order) || "0";
  const code = `${value1} ${operator} ${value2}`;

  return [code, order];
}

/**
 * @param {Blockly.Block} block
 * @returns {[string, number]}
 */
Blockly.JavaScript['sprite_operator'] = function(block) {
  const OPTIONS = {
    "ADD": ["+", Blockly.JavaScript.ORDER_ADDITION],
    "SUBTRACT": ["-", Blockly.JavaScript.ORDER_SUBTRACTION],
    "MULTIPLY": ["*", Blockly.JavaScript.ORDER_MULTIPLICATION],
    "DIVIDE": ["/", Blockly.JavaScript.ORDER_DIVISION],
    "MODULUS": ["%", Blockly.JavaScript.ORDER_MODULUS]
  };
  return operatorBlocks(block, OPTIONS);
};

/**
 * @param {Blockly.Block} block
 * @return {[string, number]}
 */
Blockly.JavaScript["sprite_getRandom"] = function (block) {
  const min = Blockly.JavaScript.valueToCode(block, "MIN", Blockly.JavaScript.ORDER_ATOMIC)
  const max = Blockly.JavaScript.valueToCode(block, "MAX", Blockly.JavaScript.ORDER_ATOMIC);
  const code = `parseInt((${max} - ${min}) * Math.random() + ${min})`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};

/**
 * @param {Blockly.Block} block
 * @returns {[string, number]}
 */
Blockly.JavaScript['sprite_conditionalOperator'] = function(block) {
  const OPTIONS = {
    'GRT': ['>', Blockly.JavaScript.ORDER_RELATIONAL],
    'GTE': ['>=', Blockly.JavaScript.ORDER_RELATIONAL],
    'EQU': ['==', Blockly.JavaScript.ORDER_EQUALITY],
    'NEQ': ['!=', Blockly.JavaScript.ORDER_EQUALITY],
    'LTE': ['<=', Blockly.JavaScript.ORDER_RELATIONAL],
    'LST': ['<', Blockly.JavaScript.ORDER_RELATIONAL],
    'AND': ['&&', Blockly.JavaScript.ORDER_LOGICAL_AND],
    'OR': ['||', Blockly.JavaScript.ORDER_LOGICAL_OR]
  };
  return operatorBlocks(block, OPTIONS);
};

/**
 * @param {Blockly.Block} block
 * @returns {[string, number]}
 */
Blockly.JavaScript["sprite_notOperator"] = function(block) {
  const order = Blockly.JavaScript.ORDER_LOGICAL_NOT;
  const condition = Blockly.JavaScript.valueToCode(block, "VALUE", order) || "false";
  const code = `!${condition}`;
  return [code, order];
};
