/**
 * @license
 * Visual Blocks Editor
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
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.motions');

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks['sprite_moveSteps'] = {
  init: function() {
    this.appendValueInput("STEPS")
    .setCheck(null)
    .appendField("move");
    this.appendDummyInput()
    .appendField("steps");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_turnAngle'] = {
  init: function () {
    this.appendValueInput("DEGREE")
    .setCheck(null)
    .appendField("turn")
    .appendField(new Blockly.FieldDropdown([[{
      "src": "http://downloadicons.net/sites/default/files/rotate-clockwise-arrow-icon-63159.png",
      "width": 15,
      "height": 15,
      "alt": "*"
    }, "RIGHT"], [{
      "src": "http://downloadicons.net/sites/default/files/360-degree-counterclockwise-rotation-arrow-icon-63158.png",
      "width": 15,
      "height": 15,
      "alt": "*"
    }, "LEFT"]]), "DIR");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_goTo'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("go to")
    .appendField(new Blockly.FieldDropdown([["random position","RANDOM"], ["mouse position","MOUSE"]]), "WHERE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_goToPoint'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("go to");
    this.appendValueInput("X")
    .setCheck(null)
    .appendField("x:");
    this.appendValueInput("Y")
    .setCheck(null)
    .appendField("y:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_glideTo'] = {
  init: function() {
    this.appendValueInput("SEC")
    .setCheck(null)
    .appendField("glide");
    this.appendDummyInput()
    .appendField("secs to")
    .appendField(new Blockly.FieldDropdown([["random position","RANDOM"], ["mouse position","MOUSE"]]), "WHERE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_glideToPoint'] = {
  init: function() {
    this.appendValueInput("SEC")
    .setCheck(null)
    .appendField("glide");
    this.appendValueInput("X")
    .setCheck(null)
    .appendField("secs to")
    .appendField("x:");
    this.appendValueInput("Y")
    .setCheck(null)
    .appendField("y:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_pointTo'] = {
  init: function() {
    this.appendValueInput("DIR")
    .setCheck(null)
    .appendField("point in direction");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_pointToward'] = {
  init: function() {
    this.appendValueInput("DIR")
    .setCheck(null)
    .appendField("point towards")
    .appendField(new Blockly.FieldDropdown([["mouse position","MOUSE"]]), "DESTINATION");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_changeXY'] = {
  init: function() {
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("change")
    .appendField(new Blockly.FieldDropdown([["x","X"], ["y","Y"]]), "XY")
    .appendField("by");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_setXY'] = {
  init: function() {
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("set")
    .appendField(new Blockly.FieldDropdown([["x","X"], ["y","Y"]]), "XY")
    .appendField("to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_getXY'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown([["x","X"], ["y","Y"]]), "XY")
    .appendField("position");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_getDir'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("direction");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_edgeBounce'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("bounce if on edge");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_rotationStyle'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("set rotation style:")
    .appendField(new Blockly.FieldDropdown([["all around","ALL"], ["left-right","LEFTRIGHT"], ["do not rotate","NONE"]]), "STYLE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
