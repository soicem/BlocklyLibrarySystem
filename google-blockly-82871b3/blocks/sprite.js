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

goog.provide('Blockly.Blocks.sprite');

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks['sprite_flag_clicked'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("when")
    .appendField(new Blockly.FieldImage("https://scratch.mit.edu/static/assets/2e0c4790f8f9cf28e3c346b9cef0fcb6.svg", 15, 15, "*"))
    .appendField("clicked");
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_go_to'] = {
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

Blockly.Blocks['sprite_move'] = {
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

Blockly.Blocks['sprite_direction'] = {
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

Blockly.Blocks['sprite_say'] = {
  init: function() {
    this.appendValueInput("SAY")
    .setCheck(null)
    .appendField("say");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_sense_touch'] = {
  init: function() {
    this.appendValueInput("SPRITE")
    .setCheck(null)
    .appendField("touching");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_forever'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("forever");
    this.appendStatementInput("STATEMENTS")
    .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_empty_list'] = {
  init: function() {
    this.appendValueInput("VARIABLE")
    .setCheck("Array")
    .appendField("empty all of");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_touch_color'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("touching color")
    .appendField(new Blockly.FieldColour("#0000ff"), "COLOR");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
