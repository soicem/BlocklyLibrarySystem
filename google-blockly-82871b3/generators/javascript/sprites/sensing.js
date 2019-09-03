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

goog.provide('Blockly.JavaScript.sensing');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['sprite_touchingColor'] = function(block) {
  let colour_color = block.getFieldValue('COLOR');
  let code = "isTouchingColorHex('" + colour_color + "')";

  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sprite_touching'] = function(block) {
  const OPTIONS = {
    MOUSE: "touching_mouse",
    EDGE: "touching_edge"
  };
  let dropdown_option = block.getFieldValue('OPTION');
  let funcName = OPTIONS[dropdown_option];

  if (funcName === undefined) {
    return ["isTouchingSprite(\"" + dropdown_option + "\")", Blockly.JavaScript.ORDER_NONE];
  } else {
    return [funcName + "()", Blockly.JavaScript.ORDER_NONE];
  }
};

Blockly.JavaScript['sprite_keyPress'] = function(block) {
    const OPTIONS = {
        UP: "up_arrow",
        DOWN: "down_arrow",
        LEFT : "left_arrow",
        RIGHT : "right_arrow"
    };
    let dropdown_option = block.getFieldValue('KEY');
    let funcName = OPTIONS[dropdown_option];

    return [funcName + "()", Blockly.JavaScript.ORDER_NONE];
};

Blockly.JavaScript['sprite_getMouseXY'] = function(block) {
  const OPTIONS = {
    X: "getMouseX",
    Y: "getMouseY",
  };
  const dropdown_xy = block.getFieldValue('XY');
  const code = `${OPTIONS[dropdown_xy]}()`;
  return [code, Blockly.JavaScript.ORDER_NONE];
};
