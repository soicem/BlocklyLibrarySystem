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

const operators = [
  ["+", "ADD"],
  ["-", "SUBTRACT"],
  ["*", "MULTIPLY"],
  ["/", "DIVIDE"],
  ["mod", "MODULUS"]
];

const conditionalOptions = [
  [">", "GRT"],
  [">=", "GTE"],
  ["=", "EQU"],
  ["!=", "NEQ"],
  ["<=", "LTE"],
  ["<", "LST"],
  ["%{BKY_SPRITE_AND}", "AND"],
  ["%{BKY_SPRITE_OR}", "OR"]
];

Blockly.defineBlocksWithJsonArray([
  {
    "type": "sprite_operator",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE1"
      },
      {
        "type": "field_dropdown",
        "name": "OPTION",
        "options": operators
      },
      {
        "type": "input_value",
        "name": "VALUE2"
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_getRandom",
    "message0": "%{BKY_SPRITE_GETRANDOM_MSG}",
    "args0": [
      {
        "type": "input_value",
        "name": "MIN"
      },
      {
        "type": "input_value",
        "name": "MAX"
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_conditionalOperator",
    "message0": "%1 %2 %3",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE1"
      },
      {
        "type": "field_dropdown",
        "name": "OPTION",
        "options": conditionalOptions
      },
      {
        "type": "input_value",
        "name": "VALUE2"
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_notOperator",
    "message0": "%{BKY_SPRITE_NOTOPERATOR_MSG}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 120,
    "tooltip": "",
    "helpUrl": ""
  }
]);

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


