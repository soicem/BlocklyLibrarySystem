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

goog.provide('Blockly.Blocks.controls');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.defineBlocksWithJsonArray([
  {
    "type": "sprite_wait",
    "message0": "%{BKY_SPRITE_WAIT_MSG}",
    "args0": [
      {
        "type": "input_value",
        "name": "SEC"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 40,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_forever",
    "message0": "%{BKY_SPRITE_FOREVER_MSG}",
    "args0": [
      {
        "type": "input_statement",
        "name": "STATEMENT"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 40,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_cloneStarted",
    "message0": "%{BKY_SPRITE_CLONESTARTED_MSG}",
    "nextStatement": null,
    "colour": 40,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_createClone",
    "message0": "%{BKY_SPRITE_CREATECLONE_MSG}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OPTION",
        "options": [
          [
            "%{BKY_SPRITE_MYSELF}",
            "ME"
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 40,
    "tooltip": "",
    "helpUrl": ""
  }
]);


Blockly.Blocks['sprite_repeat'] = {
  init: function () {
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("repeat");
    this.appendStatementInput("STATEMENT")
    .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(40);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_if'] = {
  init: function () {
    this.appendValueInput("COND")
    .setCheck(null)
    .appendField("if");
    this.appendDummyInput()
    .appendField("then");
    this.appendStatementInput("STATEMENT")
    .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(40);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_ifElse'] = {
  init: function () {
    this.appendValueInput("COND")
    .setCheck(null)
    .appendField("if");
    this.appendDummyInput()
    .appendField("then");
    this.appendStatementInput("STATEMENT")
    .setCheck(null);
    this.appendDummyInput()
    .appendField("else");
    this.appendStatementInput("ELSE_STATEMENT")
    .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(40);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_waitTill'] = {
  init: function () {
    this.appendValueInput("COND")
    .setCheck(null)
    .appendField("wait until");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(40);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_repeatTill'] = {
  init: function () {
    this.appendValueInput("COND")
    .setCheck(null)
    .appendField("repeat until");
    this.appendStatementInput("STATEMENT")
    .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(40);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_stop'] = {
  init: function () {
    this.appendDummyInput()
    .appendField("stop")
    .appendField(new Blockly.FieldDropdown(
        [["all", "ALL"], ["this script", "THIS"],
          ["other scripts in sprite", "OTHER"]]), "OPTION");
    this.setPreviousStatement(true, null);
    this.setColour(40);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_deleteClone'] = {
  init: function () {
    this.appendDummyInput()
    .appendField("delete this clone");
    this.setPreviousStatement(true, null);
    this.setColour(40);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

