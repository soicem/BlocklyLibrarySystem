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

goog.provide('Blockly.Blocks.operators');

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks['sprite_operator'] = {
  init: function() {
    this.appendValueInput("VALUE1")
    .setCheck(null);
    this.appendValueInput("VALUE2")
    .setCheck(null)
    .appendField(new Blockly.FieldDropdown([["+","ADD"], ["-","SUBTRACT"], ["*","MULTIPLY"], ["/","DIVIDE"], ["mod","MODULUS"]]), "OPTION");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_getRandom'] = {
  init: function() {
    this.appendValueInput("MIN")
    .setCheck(null)
    .appendField("pick random from");
    this.appendValueInput("MAX")
    .setCheck(null)
    .appendField("to");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_conditionalOperator'] = {
  init: function() {
    this.appendValueInput("VALUE1")
    .setCheck(null);
    this.appendValueInput("VALUE2")
    .setCheck(null)
    .appendField(new Blockly.FieldDropdown([[">","GRT"], [">=","GRE"], ["=","EQU"], ["<=","LSE"], ["<","LSS"], ["and","AND"], ["or","OR"]]), "OPTION");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_notOperator'] = {
  init: function() {
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("not");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_join'] = {
  init: function() {
    this.appendValueInput("VALUE1")
    .setCheck(null)
    .appendField("join");
    this.appendValueInput("VALUE2")
    .setCheck(null)
    .appendField("with");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_letterAt'] = {
  init: function() {
    this.appendValueInput("INDEX")
    .setCheck(null)
    .appendField("letter");
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("of");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_length'] = {
  init: function() {
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("length of");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_contains'] = {
  init: function() {
    this.appendValueInput("VALUE")
    .setCheck(null);
    this.appendValueInput("LOOKUP")
    .setCheck(null)
    .appendField("contains");
    this.appendDummyInput()
    .appendField("?");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_unaryOperator'] = {
  init: function() {
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField(new Blockly.FieldDropdown([["round","ROUND"], ["abs","ABS"], ["floor","FLOOR"], ["ceiling","CEILING"], ["sqrt","SQRT"], ["sin","SIN"], ["cos","COS"], ["tan","TAN"], ["asin","ASIN"], ["acos","ACOS"], ["atan","ATAN"], ["ln","LN"], ["log","LOG"], ["e ^","E"], ["10 ^","E10"]]), "OPTION");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


