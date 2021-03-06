/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Generating JavaScript for list blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.JavaScript.controls');

goog.require('Blockly.JavaScript');


Blockly.JavaScript['sprite_cloneStarted'] = function (block) {
    let value_content = Blockly.JavaScript.valueToCode(block, 'CONTENT',
        Blockly.JavaScript.ORDER_ATOMIC);

    return "cloning;\n";
};

Blockly.JavaScript['sprite_createClone'] = function (block) {
    let value_content = Blockly.JavaScript.valueToCode(block, 'CONTENT',
        Blockly.JavaScript.ORDER_ATOMIC);

    return "createClone();\n";
};

Blockly.JavaScript['sprite_forever'] = function(block) {
    let statements_statement = Blockly.JavaScript.statementToCode(block, 'STATEMENT');
    return "while(1) {" + statements_statement + "};\n";
};

Blockly.JavaScript['sprite_wait'] = function(block) {
    let value_x = Blockly.JavaScript.valueToCode(block, 'SEC',
        Blockly.JavaScript.ORDER_ATOMIC);

    return "wait(" + value_x + ");\n";
};

// [["all","ALL"], ["this script","THIS"], ["other scripts in sprite","OTHER"]]), "OPTION"
Blockly.JavaScript['sprite_stop'] = function(block) {
    const OPTIONS = {
        ALL: "allStop",
        THIS: "this script",
        OTHER: "other scripts in sprite"
    };
    let dropdown_where = block.getFieldValue('OPTION');
    let funcName = OPTIONS[dropdown_where];

    return funcName + "();\n";
};