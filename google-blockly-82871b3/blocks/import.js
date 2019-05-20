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

goog.provide('Blockly.Blocks.import');

goog.require('Blockly.Blocks');
goog.require('Blockly');

// Blockly.defineBlocksWithJsonArray([  // BEGIN JSON EXTRACT
//   {
//     "type": "import_return",
//     "message0": "library function",
//     "inputsInline": true,
//     "output": null,
//     "colour": 0,
//     "tooltip": "",
//     "helpUrl": "",
//     "mutator": "import_return_mutator"
//   },
//   {
//     "type": "import_statement",
//     "message0": "library function",
//     "inputsInline": true,
//     "previousStatement": null,
//     "nextStatement": null,
//     "colour": 0,
//     "tooltip": "",
//     "helpUrl": ""
//   }
// ]);  // END JSON EXTRACT (Do not delete this comment.)


Blockly.Blocks['inline_configure'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("inline")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "INLINE_FIELD");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['import_return'] = {
  argsCount_: 0,
  argsName_: [],
  funcName_: '',

  init: function() {
    this.appendDummyInput("FUNC")
        .appendField("", "FUNC_FIELD");
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(0);
    this.setTooltip("");
    this.setHelpUrl("");
    this.setMutator(new Blockly.Mutator([null]));

    this.argsCount_ = 0;
    this.argsName_ = [];
    this.funcName_ = '';

    this.resetShape_();
  },

  mutationToDom: function() {
    let container = document.createElement("mutation");

    container.setAttribute("func", this.funcName_);
    if (!this.argsCount_ > 0) {
      container.setAttribute("args", this.argsCount_);
    }
    if (!this.getInputsInline()) {
      container.setAttribute("inline", this.getInputsInline());
    }

    for (let i = 0; i < this.argsCount_; i++) {
      let argsContainer = document.createElement("arg");
      argsContainer.setAttribute("name", this.argsName_[i]);
      container.appendChild(argsContainer);
    }

    return container;
  },

  domToMutation: function(xmlElement) {
    this.funcName_ = xmlElement.getAttribute("func");
    this.argsCount_ = parseInt(xmlElement.getAttribute("args"), 10) || 0;
    this.argsName_ = [];

    for (let i = 0; i < this.argsCount_; i++) {
      this.argsName_[i] = (xmlElement.getElementsByTagName("arg")[i].getAttribute("name"));
    }

    let inlineAttribute = xmlElement.getAttribute("inline");
    let defaultInline = this.getInputsInline();
    let inline = (inlineAttribute && inlineAttribute.toLowerCase() == "true") || defaultInline;
    this.updateShape_(inline);
  },

  decompose: function(workspace) {
    let containerBlock = workspace.newBlock('inline_configure');
    containerBlock.initSvg();

    containerBlock.setFieldValue(this.getInputsInline(),"INLINE_FIELD");

    return containerBlock;
  },

  compose: function(containerBlock) {
    let inline = containerBlock.getFieldValue("INLINE_FIELD").toLowerCase() == "true";
    this.setInputsInline(inline);
  },

  updateShape_: function(inline) {
    this.resetShape_();

    this.setInputsInline(inline);
    this.getField("FUNC_FIELD").setText(this.funcName_);

    if (this.argsCount_ > 0) {
      this.getInput("FUNC").appendField("with", "WITH_FIELD");
    }

    for (let i = 0; i < this.argsCount_; i++) {
      let input = this.appendValueInput("ARG" + i);
      let field = input.appendField(this.argsName_[i]);
      field.setAlign(Blockly.ALIGN_RIGHT);
    }
  },

  resetShape_: function() {
    this.getField("FUNC_FIELD").setText("function");

    if (this.getField("WITH_FIELD")) {
      this.removeField("WITH_FIELD");
    }

    let i = 0;
    while (this.getInput("ARG" + i)) {
      this.removeInput("ARG" + i);
      i++;
    }
  }
};

// Blockly.Constants.Text.IMPORT_RETURN_MUTATOR_MIXIN = {
  // /**
  //  * Create XML to represent number of text inputs.
  //  * @return {!Element} XML storage element.
  //  * @this Blockly.Block
  //  */
  // mutationToDom: function() {
  //   var container = document.createElement('mutation');
  //   container.setAttribute('args', this.argsCount_);
  //
  //   //var argsContainer = document.createElement('')
  //
  //   return container;
  // },
  // /**
  //  * Parse XML to restore the text inputs.
  //  * @param {!Element} xmlElement XML storage element.
  //  * @this Blockly.Block
  //  */
  // domToMutation: function(xmlElement) {
  //   this.argsCount_ = parseInt(xmlElement.getAttribute('args'), 10);
  //   //this.updateShape_();
  // },
  // /**
  //  * Populate the mutator's dialog with this block's components.
  //  * @param {!Blockly.Workspace} workspace Mutator's workspace.
  //  * @return {!Blockly.Block} Root block in mutator.
  //  * @this Blockly.Block
  //  */
  // decompose: function(workspace) {
  //   var containerBlock = workspace.newBlock('text_create_join_container');
  //   containerBlock.initSvg();
  //   var connection = containerBlock.getInput('STACK').connection;
  //   for (var i = 0; i < this.argsCount_; i++) {
  //     var itemBlock = workspace.newBlock('text_create_join_item');
  //     itemBlock.initSvg();
  //     connection.connect(itemBlock.previousConnection);
  //     connection = itemBlock.nextConnection;
  //   }
  //   return containerBlock;
  // },
  // /**
  //  * Reconfigure this block based on the mutator dialog's components.
  //  * @param {!Blockly.Block} containerBlock Root block in mutator.
  //  * @this Blockly.Block
  //  */
  // compose: function(containerBlock) {
  //   var itemBlock = containerBlock.getInputTargetBlock('STACK');
  //   // Count number of inputs.
  //   var connections = [];
  //   while (itemBlock) {
  //     connections.push(itemBlock.valueConnection_);
  //     itemBlock = itemBlock.nextConnection &&
  //         itemBlock.nextConnection.targetBlock();
  //   }
  //   // Disconnect any children that don't belong.
  //   for (var i = 0; i < this.argsCount_; i++) {
  //     var connection = this.getInput('ADD' + i).connection.targetConnection;
  //     if (connection && connections.indexOf(connection) == -1) {
  //       connection.disconnect();
  //     }
  //   }
  //   this.argsCount_ = connections.length;
  //   //this.updateShape_();
  //   // Reconnect any child blocks.
  //   for (var i = 0; i < this.argsCount_; i++) {
  //     Blockly.Mutator.reconnect(connections[i], this, 'ADD' + i);
  //   }
  // },
  // /**
  //  * Store pointers to any connected child blocks.
  //  * @param {!Blockly.Block} containerBlock Root block in mutator.
  //  * @this Blockly.Block
  //  */
  // saveConnections: function(containerBlock) {
  //   var itemBlock = containerBlock.getInputTargetBlock('STACK');
  //   var i = 0;
  //   while (itemBlock) {
  //     var input = this.getInput('ADD' + i);
  //     itemBlock.valueConnection_ = input && input.connection.targetConnection;
  //     i++;
  //     itemBlock = itemBlock.nextConnection &&
  //         itemBlock.nextConnection.targetBlock();
  //   }
  // },
  // /**
  //  * Modify this block to have the correct number of inputs.
  //  * @private
  //  * @this Blockly.Block
  //  */
  // updateShape_: function() {
  //   if (this.argsCount_ && this.getInput('EMPTY')) {
  //     this.removeInput('EMPTY');
  //   } else if (!this.argsCount_ && !this.getInput('EMPTY')) {
  //     this.appendDummyInput('EMPTY')
  //         .appendField(this.newQuote_(true))
  //         .appendField(this.newQuote_(false));
  //   }
  //   // Add new inputs.
  //   for (var i = 0; i < this.argsCount_; i++) {
  //     if (!this.getInput('ADD' + i)) {
  //       var input = this.appendValueInput('ADD' + i);
  //       if (i == 0) {
  //         input.appendField(Blockly.Msg['TEXT_JOIN_TITLE_CREATEWITH']);
  //       }
  //     }
  //   }
  //   // Remove deleted inputs.
  //   while (this.getInput('ADD' + i)) {
  //     this.removeInput('ADD' + i);
  //     i++;
  //   }
  // }
// };

// /**
//  * Performs final setup of a text_join block.
//  * @this Blockly.Block
//  */
// Blockly.Constants.Text.IMPORT_RETURN_EXTENSION = function() {
//   // Add the quote mixin for the argsCount_ = 0 case.
//   this.mixin(Blockly.Constants.Text.QUOTE_IMAGE_MIXIN);
//   // Initialize the mutator values.
//   this.argsCount_ = 2;
//   this.updateShape_();
//   // Configure the mutator UI.
//   this.setMutator(new Blockly.Mutator(['text_create_join_item']));
// };

// Blockly.Extensions.registerMutator('import_return_mutator',
//     Blockly.Constants.   .IMPORT_RETURN_MUTATOR_MIXIN,
//     null, null);
//Blockly.Constants.Text.IMPORT_RETURN_EXTENSION
