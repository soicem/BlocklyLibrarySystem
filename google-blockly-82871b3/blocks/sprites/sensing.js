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

goog.provide('Blockly.Blocks.sensing');

goog.require('Blockly.Blocks');
goog.require('Blockly');

Blockly.defineBlocksWithJsonArray([
  {
    "type": "sprite_touching",
    "message0": "touching %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OPTION",
        "options": [
          [
            "mouse pointer",
            "MOUSE"
          ],
          [
            "edge",
            "EDGE"
          ]
        ]
      }
    ],
    "extensions": ["testingExtension"],
    "inputsInline": true,
    "output": null,
    "colour": 190,
    "tooltip": "",
    "helpUrl": ""
  }
  ]);

Blockly.Extensions.register('testingExtension', function () {
      let options = [
        ["mouse pointer", "MOUSE"],
        ["edge", "EDGE"]
      ];

      if (myCanvas !== undefined && myCanvas !== null) {
        for (let i = 1; i < myCanvas.getSpritesOrder().length; i++) {
          let sprite = myCanvas.getSpritesOrder()[i];
          let spriteName = sprite.name;

          if (sprite.isClone[0]) continue;

          options.push([spriteName, spriteName]);
        }
      }

      let dropdown = new Blockly.FieldDropdown(options);

      this.inputList[0].removeField("OPTION");
      this.inputList[0].appendField(dropdown, 'OPTION')
    }
);

Blockly.Blocks['sprite_touchingColor'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("touching color")
    .appendField(new Blockly.FieldColour("#0000ff"), "COLOR");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_colorTouchingColor'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldColour("#0000ff"), "COLOR1")
    .appendField("is touching")
    .appendField(new Blockly.FieldColour("#ff0000"), "COLOR2");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_distanceTo'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("distance to")
    .appendField(new Blockly.FieldDropdown([["mouse pointer","MOUSE"]]), "OPTION");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_askWait'] = {
  init: function() {
    this.appendValueInput("MESSAGE")
    .setCheck(null)
    .appendField("ask");
    this.appendDummyInput()
    .appendField("and wait");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_answer'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("answer");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_keyPress'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("key")
    .appendField(new Blockly.FieldDropdown([
      ["any","ANY"],
      ["space","SPACE"],
      ["up_arrow","UP"],
      ["down_arrow","DOWN"],
      ["right_arrow","RIGHT"],
      ["left_arrow","LEFT"],
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
    ]), "KEY")
    .appendField("pressed?");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_mouseDown'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("mouse down?");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_getMouseXY'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("mouse")
    .appendField(new Blockly.FieldDropdown([["x","X"], ["y","Y"]]), "XY");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_setDragMode'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("set drag mode:")
    .appendField(new Blockly.FieldDropdown([["draggable","DRAGGABLE"], ["not draggable","NOT_DRAGGABLE"]]), "OPTION");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_getLoudness'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("loudness");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_getTimer'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("timer");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_resetTimer'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("reset timer");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_getStage'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown([["backdrop #","BACKDROP_NUM"], ["backdrop name","BACKDROP_NAME"], ["volume","VOLUME"], ["my variable","VARIABLE"]]), "SRC")
    .appendField("of")
    .appendField(new Blockly.FieldDropdown([["stage","STAGE"]]), "OPTION");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_getDate'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("current")
    .appendField(new Blockly.FieldDropdown([["date","DATE"], ["year","YEAR"], ["month","MONTH"], ["day of week","DAY"], ["hour","HOUR"], ["minute","MINUTE"], ["second","SECOND"]]), "OPTION");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_getSince'] = {
  init: function() {
    this.appendDummyInput()
    .appendField(new Blockly.FieldDropdown([["years","YEAR"], ["months","MONTH"], ["days","DAY"]]), "OPTION")
    .appendField("since 2000");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_getUsername'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("username");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(190);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
