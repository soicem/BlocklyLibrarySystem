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

Blockly.defineBlocksWithJsonArray([
  {
    "type": "sprite_moveSteps",
    "message0": "%{BKY_SPRITE_MOVESTEPS_MSG}",
    "args0": [
      {
        "type": "input_value",
        "name": "STEPS"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_turnAngle",
    "message0": "%{BKY_SPRITE_TURNANGLE_MSG}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DIR",
        "options": [
          [
            {
              "src": "http://downloadicons.net/sites/default/files/rotate-clockwise-arrow-icon-63159.png",
              "width": 15,
              "height": 15,
              "alt": "*"
            },
            "RIGHT"
          ],
          [
            {
              "src": "http://downloadicons.net/sites/default/files/360-degree-counterclockwise-rotation-arrow-icon-63158.png",
              "width": 15,
              "height": 15,
              "alt": "*"
            },
            "LEFT"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "DEGREE"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_goTo",
    "message0": "%{BKY_SPRITE_GOTO_MSG}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "WHERE",
        "options": [
          [
            "%{BKY_SPRITE_RANDOM_POSITION}",
            "RANDOM"
          ],
          [
            "%{BKY_SPRITE_MOUSE_POSITION}",
            "MOUSE"
          ]
        ]
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_goToPoint",
    "message0": "%{BKY_SPRITE_GOTOPOINT_MSG_PREFIX}",
    "message1": "%{BKY_SPRITE_GOTOPOINT_MSG}",
    "args1": [
      {
        "type": "input_value",
        "name": "X"
      },
      {
        "type": "input_value",
        "name": "Y"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_glideTo",
    "message0": "%{BKY_SPRITE_GLIDETO_MSG}",
    "args0": [
      {
        "type": "input_value",
        "name": "SEC"
      },
      {
        "type": "field_dropdown",
        "name": "WHERE",
        "options": [
          [
            "%{BKY_SPRITE_RANDOM_POSITION}",
            "RANDOM"
          ],
          [
            "%{BKY_SPRITE_MOUSE_POSITION}",
            "MOUSE"
          ]
        ]
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_glideToPoint",
    "message0": "%{BKY_SPRITE_GLIDETOPOINT_MSG}",
    "args0": [
      {
        "type": "input_value",
        "name": "SEC"
      },
      {
        "type": "input_value",
        "name": "X"
      },
      {
        "type": "input_value",
        "name": "Y"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_pointTo",
    "message0": "%{BKY_SPRITE_POINTTO_MSG}",
    "args0": [
      {
        "type": "input_value",
        "name": "DIR"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_pointToward",
    "message0": "%{BKY_SPRITE_POINTTOWARD_MSG}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "DEST",
        "options": [
          [
            "%{BKY_SPRITE_MOUSE_POSITION}",
            "MOUSE"
          ]
        ]
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_changeXY",
    "message0": "%{BKY_SPRITE_CHANGEXY_MSG}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "XY",
        "options": [
          [
            "x",
            "X"
          ],
          [
            "y",
            "Y"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_setXY",
    "message0": "%{BKY_SPRITE_SETXY_MSG}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "XY",
        "options": [
          [
            "x",
            "X"
          ],
          [
            "y",
            "Y"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_getXY",
    "message0": "%{BKY_SPRITE_GETXY_MSG}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "XY",
        "options": [
          [
            "x",
            "X"
          ],
          [
            "y",
            "Y"
          ]
        ]
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 225,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_getDir",
    "message0": "%{BKY_SPRITE_GETDIR_MSG}",
    "inputsInline": true,
    "output": null,
    "colour": 225,
    "tooltip": "",
    "helpUrl": ""
  }
]);

Blockly.Blocks['sprite_getDir'] = {
  init: function () {
    this.appendDummyInput()
    .appendField("direction");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(225);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_edgeBounce'] = {
  init: function () {
    this.appendDummyInput()
    .appendField("bounce if on edge");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(225);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['sprite_rotationStyle'] = {
  init: function () {
    this.appendDummyInput()
    .appendField("set rotation style:")
    .appendField(new Blockly.FieldDropdown(
        [["all around", "ALL"], ["left-right", "LEFTRIGHT"],
          ["do not rotate", "NONE"]]), "STYLE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(225);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};
