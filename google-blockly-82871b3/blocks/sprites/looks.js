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

Blockly.defineBlocksWithJsonArray([
  {
    "type": "sprite_say",
    "message0": "%{BKY_SPRITE_SAY_MSG}",
    "args0": [
      {
        "type": "input_value",
        "name": "CONTENT"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_sayTill",
    "message0": "%{BKY_SPRITE_SAYTILL_MSG}",
    "args0": [
      {
        "type": "input_value",
        "name": "CONTENT"
      },
      {
        "type": "input_value",
        "name": "SEC"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_think",
    "message0": "%{BKY_SPRITE_THINK_MSG}",
    "args0": [
      {
        "type": "input_value",
        "name": "CONTENT"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_thinkTill",
    "message0": "%{BKY_SPRITE_THINKTILL_MSG}",
    "args0": [
      {
        "type": "input_value",
        "name": "CONTENT"
      },
      {
        "type": "input_value",
        "name": "SEC"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_nextCostume",
    "message0": "%{BKY_SPRITE_NEXTCOSTUME_MSG}",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_switchCostume",
    "message0": "%{BKY_SPRITE_SWITCHCOSTUME_MSG}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "COSTUME",
        "options": [
          [
            "costume1",
            "COSTUME1"
          ],
          [
            "costume2",
            "COSTUME2"
          ]
        ]
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_nextBackdrop",
    "message0": "%{BKY_SPRITE_NEXTBACKDROP_MSG}",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_switchBackdrop",
    "message0": "%{BKY_SPRITE_SWITCHBACKDROP_MSG}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "BACKDROP",
        "options": [
          [
            "backdrop1",
            "BACKDROP1"
          ],
          [
            "backdrop2",
            "BACKDROP2"
          ]
        ]
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_changeSize",
    "message0": "%{BKY_SPRITE_CHANGESIZE_MSG}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_setSize",
    "message0": "%{BKY_SPRITE_SETSIZE_MSG}",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_changeEffect",
    "message0": "%{BKY_SPRITE_CHANGEEFFECT_MSG_PREFIX}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "EFFECT",
        "options": [
          [
            "color",
            "COLOR"
          ],
          [
            "fisheye",
            "FISHEYE"
          ],
          [
            "whirl",
            "WHIRL"
          ],
          [
            "pixelate",
            "PIXELATE"
          ],
          [
            "mosaic",
            "MOSAIC"
          ],
          [
            "brightness",
            "BRIGHTNESS"
          ],
          [
            "ghost",
            "GHOST"
          ]
        ]
      }
    ],
    "message1": "%{BKY_SPRITE_CHANGEEFFECT_MSG}",
    "args1": [
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_setEffect",
    "message0": "%{BKY_SPRITE_SETEFFECT_MSG_PREFIX}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "EFFECT",
        "options": [
          [
            "color",
            "COLOR"
          ],
          [
            "fisheye",
            "FISHEYE"
          ],
          [
            "whirl",
            "WHIRL"
          ],
          [
            "pixelate",
            "PIXELATE"
          ],
          [
            "mosaic",
            "MOSAIC"
          ],
          [
            "brightness",
            "BRIGHTNESS"
          ],
          [
            "ghost",
            "GHOST"
          ]
        ]
      }
    ],
    message1: "%{BKY_SPRITE_SETEFFECT_MSG}",
    args1: [
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_clearEffect",
    "message0": "%{BKY_SPRITE_CLEAREFFECT_MSG}",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_show",
    "message0": "%{BKY_SPRITE_SHOW}",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_hide",
    "message0": "%{BKY_SPRITE_HIDE}",
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_setLayer",
    "message0": "%{BKY_SPRITE_SETLAYER_MSG}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ORDER",
        "options": [
          [
            "%{BKY_SPRITE_FRONT}",
            "FRONT"
          ],
          [
            "%{BKY_SPRITE_BACK}",
            "BACK"
          ]
        ]
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_changeLayer",
    "message0": "%{BKY_SPRITE_CHANGELAYER_MSG}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "ORDER",
        "options": [
          [
            "%{BKY_SPRITE_FORWARD}",
            "FORWARD"
          ],
          [
            "%{BKY_SPRITE_BACKWARD}",
            "BACKWARD"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "COUNT"
      }
    ],
    "inputsInline": true,
    "previousStatement": null,
    "nextStatement": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_getCostume",
    "message0": "%{BKY_SPRITE_GETCOSTUME_MSG}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OPTION",
        "options": [
          [
            "%{BKY_SPRITE_NUMBER}",
            "NUMBER"
          ],
          [
            "%{BKY_SPRITE_NAME}",
            "NAME"
          ]
        ]
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_getBackdrop",
    "message0": "%{BKY_SPRITE_GETBACKDROP_MSG}",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "OPTION",
        "options": [
          [
            "%{BKY_SPRITE_NUMBER}",
            "NUMBER"
          ],
          [
            "%{BKY_SPRITE_NAME}",
            "NAME"
          ]
        ]
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  },
  {
    "type": "sprite_getSize",
    "message0": "%{BKY_SPRITE_SIZE}",
    "inputsInline": true,
    "output": null,
    "colour": 255,
    "tooltip": "",
    "helpUrl": ""
  }
]);
