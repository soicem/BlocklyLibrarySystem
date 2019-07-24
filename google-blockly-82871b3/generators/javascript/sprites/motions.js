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

goog.provide('Blockly.JavaScript.motions');

goog.require('Blockly.JavaScript');


Blockly.JavaScript["sprite_moveSteps"] = function (block) {
  let steps = Blockly.JavaScript.valueToCode(block, "STEPS",
      Blockly.JavaScript.ORDER_ATOMIC);
  return "moveSteps(" + steps + ");\n";
};

Blockly.JavaScript['sprite_turnAngle'] = function (block) {
  let DIRECTIONS = {
    RIGHT: "turnRight",
    LEFT: "turnLeft"
  };
  let dropdown_dir = block.getFieldValue('DIR');
  let funcName = DIRECTIONS[dropdown_dir];
  let value_degree = Blockly.JavaScript.valueToCode(block, 'DEGREE',
      Blockly.JavaScript.ORDER_ATOMIC);
  return funcName + "(" + value_degree + ");\n";
};

Blockly.JavaScript['sprite_goTo'] = function (block) {
  let WHERES = {
    RANDOM: "positionRandomly",
    MOUSE: "positionToMouse"
  };
  let dropdown_where = block.getFieldValue('WHERE');
  let funcName = WHERES[dropdown_where];
  return funcName + "();\n";
};

Blockly.JavaScript['sprite_goToPoint'] = function (block) {
  let value_x = Blockly.JavaScript.valueToCode(block, 'X',
      Blockly.JavaScript.ORDER_ATOMIC);
  let value_y = Blockly.JavaScript.valueToCode(block, 'Y',
      Blockly.JavaScript.ORDER_ATOMIC);
  return "setXY(" + value_x + ", " + value_y + ");\n";
};

Blockly.JavaScript['sprite_pointTo'] = function (block) {
  let value_dir = Blockly.JavaScript.valueToCode(block, 'DIR',
      Blockly.JavaScript.ORDER_ATOMIC);
  return "setDirection(" + value_dir + ");\n";
};

Blockly.JavaScript['sprite_gotoPoint'] = function (block) {
  let value_x = Blockly.JavaScript.valueToCode(block, 'X',
      Blockly.JavaScript.ORDER_ATOMIC);
  let value_y = Blockly.JavaScript.valueToCode(block, 'Y',
      Blockly.JavaScript.ORDER_ATOMIC);

  return "setXY(" + value_x + ", " + value_y + ");\n";
};

Blockly.JavaScript['sprite_getXY'] = function (block) {
  let OPTIONS = {
    X: "sprite_getX()",
    Y: "sprite_getY()"
  };
  let dropdown_xy = block.getFieldValue('XY');
  let funcName = OPTIONS[dropdown_xy];
  let code = funcName + "";

  return [code, Blockly.JavaScript.ORDER_NONE];
};
