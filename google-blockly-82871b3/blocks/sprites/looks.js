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

goog.provide('Blockly.Blocks.looks');

goog.require('Blockly.Blocks');
goog.require('Blockly');


Blockly.Blocks['sprite_say'] = {
  init: function() {
    this.appendValueInput("CONTENT")
    .setCheck(null)
    .appendField("say");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_sayTill'] = {
  init: function() {
    this.appendValueInput("CONTENT")
    .setCheck(null)
    .appendField("say");
    this.appendValueInput("SEC")
    .setCheck(null)
    .appendField("for");
    this.appendDummyInput()
    .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_think'] = {
  init: function() {
    this.appendValueInput("CONTENT")
    .setCheck(null)
    .appendField("think");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_thinkTill'] = {
  init: function() {
    this.appendValueInput("CONTENT")
    .setCheck(null)
    .appendField("think");
    this.appendValueInput("SEC")
    .setCheck(null)
    .appendField("for");
    this.appendDummyInput()
    .appendField("seconds");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_nextCostume'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("next costume");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_switchCostume'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("switch costume to")
    .appendField(new Blockly.FieldDropdown([["costume1","COSTUME1"], ["costume2","COSTUME2"]]), "COSTUME");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_nextBackdrop'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("next backdrop");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_switchBackdrop'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("switch backdrop to")
    .appendField(new Blockly.FieldDropdown([["backdrop1","BACKDROP1"], ["backdrop2","BACKDROP2"]]), "BACKDROP");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_changeSize'] = {
  init: function() {
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("change size by");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_setSize'] = {
  init: function() {
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("set size to");
    this.appendDummyInput()
    .appendField("%");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_changeEffect'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("change")
    .appendField(new Blockly.FieldDropdown([["color","COLOR"], ["fisheye","FISHEYE"], ["whirl","WHIRL"], ["pixelate","PIXELATE"], ["mosaic","MOSAIC"], ["brightness","BRIGHTNESS"], ["ghost","GHOST"]]), "EFFECT");
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("effect by");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_setEffect'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("set")
    .appendField(new Blockly.FieldDropdown([["color","COLOR"], ["fisheye","FISHEYE"], ["whirl","WHIRL"], ["pixelate","PIXELATE"], ["mosaic","MOSAIC"], ["brightness","BRIGHTNESS"], ["ghost","GHOST"]]), "EFFECT");
    this.appendValueInput("VALUE")
    .setCheck(null)
    .appendField("effect to");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_clearEffect'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("clear graphic effects");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_show'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("show");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_hide'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("hide");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_setLayer'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("go to")
    .appendField(new Blockly.FieldDropdown([["front","FRONT"], ["back","BACK"]]), "ORDER")
    .appendField("layer");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_changeLayer'] = {
  init: function() {
    this.appendValueInput("COUNT")
    .setCheck(null)
    .appendField("go")
    .appendField(new Blockly.FieldDropdown([["forward","FORWARD"], ["backward","BACKWARD"]]), "ORDER");
    this.appendDummyInput()
    .appendField("layers");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_getCostume'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("costume")
    .appendField(new Blockly.FieldDropdown([["number","NUMBER"], ["name","NAME"]]), "OPTION");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_getBackdrop'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("costume")
    .appendField(new Blockly.FieldDropdown([["number","NUMBER"], ["name","NAME"]]), "OPTION");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_getSize'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("size");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(255);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
