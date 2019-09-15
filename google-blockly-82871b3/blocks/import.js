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


Blockly.defineBlocksWithJsonArray([
  {
    "type": "import_header",
    "message0": "%{BKY_IMPORT_HEADER_MSG}",
    "nextStatement": "LibraryImport",
    "colour": "#b38600",
    "tooltip": "",
    "helpUrl": ""
  }
]);

Blockly.Blocks['import_statement'] = {
  libraryName_: '',
  librarySrc_: '',
  readOnly_: false,

  init: function() {
    this.appendDummyInput("LINE1")
    .appendField("Library");
    this.appendDummyInput("LINE2")
    .appendField("from")
    .appendField(new Blockly.FieldTextInput("url"), "URL");
    this.setPreviousStatement(true, "LibraryImport");
    this.setNextStatement(true, "LibraryImport");
    this.setColour("#e3ac00");
    this.setTooltip("");
    this.setHelpUrl("");
  },

  mutationToDom: function() {
    let container = document.createElement("mutation");
    container.setAttribute("lib", this.libraryName_);
    container.setAttribute("src", this.librarySrc_);
    container.setAttribute("readOnly", this.readOnly_);

    return container;
  },

  domToMutation: function(xmlElement) {
    this.libraryName_ = xmlElement.getAttribute("lib");
    this.librarySrc_ = xmlElement.getAttribute("src");
    this.readOnly_ = xmlElement.getAttribute("readOnly");

    this.updateShape_();
  },

  resetShape_: function() {
    this.removeInput("LINE1");
    this.removeInput("LINE2");
  },

  updateShape_: function() {
    this.resetShape_();

    this.appendDummyInput("LINE1")
    .appendField(this.libraryName_);
    if (this.readOnly_ !== "true") {
      this.appendDummyInput("LINE2")
      .appendField("from")
      .appendField(new Blockly.FieldTextInput(this.librarySrc_), "URL");
    }
  }
};

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
  namespaceName_: '',
  libraryName_: '',
  funcName_: '',
  argsCount_: 0,
  argsName_: [],
  implementXml_: null,

  init: function() {
    this.appendDummyInput("FUNC")
        .appendField("", "FUNC_FIELD");
    this.setOutput(true, null);
    this.setColour("#e3ac00");
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

    container.setAttribute("ns", this.namespaceName_);
    container.setAttribute("lib", this.libraryName_);
    container.setAttribute("func", this.funcName_);
    if (this.argsCount_ > 0) {
      container.setAttribute("args", this.argsCount_);
    }

    for (let i = 0; i < this.argsCount_; i++) {
      let argsContainer = document.createElement("arg");
      argsContainer.setAttribute("name", this.argsName_[i]);
      container.appendChild(argsContainer);
    }

    if (this.implementXml_) {
      let implementContainer = document.createElement("implement");
      implementContainer.appendChild(this.implementXml_.cloneNode(true));
      container.appendChild(implementContainer);
    }

    return container;
  },

  domToMutation: function(xmlElement) {
    this.namespaceName_ = xmlElement.getAttribute("ns");
    this.libraryName_ = xmlElement.getAttribute("lib");
    this.funcName_ = xmlElement.getAttribute("func");
    this.argsCount_ = parseInt(xmlElement.getAttribute("args"), 10) || 0;

    this.argsName_ = [];
    for (let i = 0; i < this.argsCount_; i++) {
      this.argsName_[i] = (xmlElement.getElementsByTagName(
          "arg")[i].getAttribute("name"));
    }

    this.implementXml_ = xmlElement.querySelector("implement > xml") || null;

    this.updateShape_();
  },

  decompose: function(workspace) {
    if (this.implementXml_) {
      Blockly.Xml.domToWorkspace(this.implementXml_, workspace);
      this.setAllBlocksEditable_(workspace, false);
      return workspace.getBlocksByType("procedures_defreturn")[0];
    }
  },

  compose: function(containerBlock) {},

  setAllBlocksEditable_: function (workspace, editable) {
    let blocks = workspace.getAllBlocks();
    blocks.forEach((block) => {
      block.setEditable(editable);
    });
  },

  updateShape_: function() {
    this.resetShape_();

    this.getField("FUNC_FIELD").setText(`${this.namespaceName_}.${this.libraryName_}.${this.funcName_}`);

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
    this.getField("FUNC_FIELD").setText("NS.Lib.Func");

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

Blockly.Blocks['import_noReturn'] = {
  namespaceName_: '',
  libraryName_: '',
  funcName_: '',
  argsCount_: 0,
  argsName_: [],
  implementXml_: null,

  init: function() {
    this.appendDummyInput("FUNC")
        .appendField("", "FUNC_FIELD");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#e3ac00");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setMutator(new Blockly.Mutator([null]));

    this.argsCount_ = 0;
    this.argsName_ = [];
    this.funcName_ = '';

    this.resetShape_();
  },

  mutationToDom: Blockly.Blocks["import_return"].mutationToDom,

  domToMutation: Blockly.Blocks["import_return"].domToMutation,

  decompose: function(workspace) {
    if (this.implementXml_) {
      Blockly.Xml.domToWorkspace(this.implementXml_, workspace);
      this.setAllBlocksEditable_(workspace, false);
      return workspace.getBlocksByType("procedures_defnoreturn")[0];
    }
  },

  setAllBlocksEditable_: Blockly.Blocks["import_return"].setAllBlocksEditable_,

  compose: Blockly.Blocks["import_return"].compose,

  updateShape_: Blockly.Blocks["import_return"].updateShape_,

  resetShape_: Blockly.Blocks["import_return"].resetShape_
};
