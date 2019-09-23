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

goog.provide('Blockly.Blocks.sounds');

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks['sprite_playSound'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("play sound")
    .appendField(new Blockly.FieldDropdown([["Meow","MEOW"]]), "SOUND")
    .appendField("until done");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(305);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_startSound'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("start sound")
    .appendField(new Blockly.FieldDropdown([["Meow","MEOW"]]), "SOUND");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(305);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_stopSound'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("stop all sounds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(305);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_changeSoundEffect'] = {
  init: function() {
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("change")
    .appendField(new Blockly.FieldDropdown([["pitch","PITCH"], ["pan left/right","PAN"]]), "OPTION")
    .appendField("effect by");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(305);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_setSoundEffect'] = {
  init: function() {
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("set")
    .appendField(new Blockly.FieldDropdown([["pitch","PITCH"], ["pan left/right","PAN"]]), "OPTION")
    .appendField("effect to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(305);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_clearSoundEffect'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("clear sound effects");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(305);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_changeVolume'] = {
  init: function() {
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("change volume by");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(305);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_setVolume'] = {
  init: function() {
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("set volume to");
    this.appendDummyInput()
    .appendField("%");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(305);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_getVolume'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("volume");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(305);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
