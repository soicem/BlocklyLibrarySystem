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

goog.provide('Blockly.Blocks.events');

goog.require('Blockly.Blocks');
goog.require('Blockly');

const keyList = [
  ["%{BKY_SPRITE_ANY}","ANY"],
  ["%{BKY_SPRITE_SPACE}","SPACE"],
  ["%{BKY_SPRITE_UP_ARROW}","UP"],
  ["%{BKY_SPRITE_DOWN_ARROW}","DOWN"],
  ["%{BKY_SPRITE_RIGHT_ARROW}","RIGHT"],
  ["%{BKY_SPRITE_LEFT_ARROW}","LEFT"],
  ["a","A"],
  ["b","B"],
  ["c","C"],
  ["d","D"],
  ["e","E"],
  ["f","F"],
  ["g","G"],
  ["h","H"],
  ["i","I"],
  ["j","J"],
  ["k","K"],
  ["l","L"],
  ["m","M"],
  ["n","N"],
  ["o","O"],
  ["p","P"],
  ["q","Q"],
  ["r","R"],
  ["s","S"],
  ["t","T"],
  ["u","U"],
  ["v","V"],
  ["w","W"],
  ["x","X"],
  ["y","Y"],
  ["z","Z"],
  ["0","ZERO"],
  ["1","ONE"],
  ["2","TWO"],
  ["3","THREE"],
  ["4","FOUR"],
  ["5","FIVE"],
  ["6","SIX"],
  ["7","SEVEN"],
  ["8","EIGHT"],
  ["9","NINE"]
];

Blockly.defineBlocksWithJsonArray([
  {
    "type": "sprite_flagClicked",
    "message0": "%{BKY_SPRITE_FLAGCLICKED_MSG}",
    "args0": [
      {
        "type": "field_image",
        "src": "https://scratch.mit.edu/static/assets/2e0c4790f8f9cf28e3c346b9cef0fcb6.svg",
        "width": 15,
        "height": 15,
        "alt": "*",
        "flipRtl": false
      }
    ],
    "inputsInline": true,
    "nextStatement": null,
    "colour": 60,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_keyPressed",
    "message0": "%{BKY_SPRITE_KEYPRESSED_MSG}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "KEY",
        "options": keyList
      }
    ],
    "inputsInline": true,
    "nextStatement": null,
    "colour": 60,
    "tooltip": "",
    "helpUrl": ""
  }
]);

Blockly.Blocks['sprite_spriteClicked'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("when this sprite clicked");
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_backdropSwitched'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("when backdrop switches to")
    .appendField(new Blockly.FieldDropdown([["backdrop1","BACKDROP1"]]), "BACKDROP");
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_loudnessCondition'] = {
  init: function() {
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("when loudness")
    .appendField(new Blockly.FieldDropdown([[">","GTR"], [">=","GTE"], ["=","EQU"], ["<=","LSE"], ["<","LSS"]]), "COND");
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_timerCondition'] = {
  init: function() {
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("when timer")
    .appendField(new Blockly.FieldDropdown([[">","GTR"], [">=","GTE"], ["=","EQU"], ["<=","LSE"], ["<","LSS"]]), "COND");
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_messageReceived'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("when I receive")
    .appendField(new Blockly.FieldDropdown([["message1","MESSAGE1"]]), "MESSAGE");
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_messageBroadcast'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("broadcast")
    .appendField(new Blockly.FieldDropdown([["message1","MESSAGE1"]]), "MESSAGE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_messageBroadcastWait'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("broadcast")
    .appendField(new Blockly.FieldDropdown([["message1","MESSAGE1"]]), "MESSAGE")
    .appendField("wait");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};












