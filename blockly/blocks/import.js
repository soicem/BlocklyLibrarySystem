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

Blockly.Blocks["import_statement"] = {
  libraryName_: "",
  librarySrc_: "(url link)",
  readOnly_: false,

  init: function() {
    this.appendDummyInput("LINE1")
    .appendField("Library");
    this.appendDummyInput("LINE2")
    .appendField("from")
    .appendField(new Blockly.FieldTextInput(this.librarySrc_), "SRC");
    this.setPreviousStatement(true, "LibraryImport");
    this.setNextStatement(true, "LibraryImport");
    this.setColour("#e3ac00");
    this.setTooltip("");
    this.setHelpUrl("");

    this.setOnChange((event) => {
      if (this.getField("SRC")) {
        this.librarySrc_ = this.getFieldValue("SRC");
      }
    });
  },

  mutationToDom: function() {
    let container = document.createElement("mutation");
    container.setAttribute("lib", this.libraryName_);
    container.setAttribute("src", this.librarySrc_);
    container.setAttribute("readonly", this.readOnly_);

    return container;
  },

  domToMutation: function(xmlElement) {
    this.libraryName_ = xmlElement.getAttribute("lib");
    this.librarySrc_ = xmlElement.getAttribute("src");
    this.readOnly_ = xmlElement.getAttribute("readonly") === "true" || false;

    this.updateShape_();
  },

  resetShape_: function() {
    this.removeInput("LINE1", true);
    this.removeInput("LINE2", true);
  },

  updateShape_: function() {
    this.resetShape_();

    this.appendDummyInput("LINE1")
    .appendField(this.libraryName_);
    if (!this.readOnly_) {
      this.appendDummyInput("LINE2")
      .appendField("from")
      .appendField(new Blockly.FieldTextInput(this.librarySrc_), "SRC");
    }
  }
};

Blockly.Blocks["inline_configure"] = {
  init: function() {
    this.appendDummyInput()
        .appendField("inline")
        .appendField(new Blockly.FieldCheckbox("TRUE"), "INLINE_FIELD");
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks["import_return"] = {
  namespaceName_: "",
  library_: {name: "", key: ""},
  func_: {name: "", key: ""},
  argsCount_: 0,
  argsName_: [],
  implementXml_: "",
  outdated_: false,

  init: function() {
    this.appendDummyInput("FUNC")
        .appendField("", "FUNC_FIELD");
    this.setOutput(true, null);
    this.setColour("#e3ac00");
    this.setTooltip("");
    this.setHelpUrl("");
    this.setMutator(new Blockly.Mutator([null]));

    this.resetShape_();
  },

  mutationToDom: function() {
    const container = document.createElement("mutation");
    if (this.outdated_) {
      container.setAttribute("outdated", this.outdated_);
    }
    container.appendChild(this.mutationToDomNamespace_());
    if (this.implementXml_) {
      container.appendChild(this.mutationToDomImplement_());
    }
    return container;
  },

  mutationToDomNamespace_: function () {
    const container = document.createElement("namespace");
    container.setAttribute("name", this.namespaceName_);
    container.appendChild(this.mutationToDomLibrary_());
    return container;
  },

  mutationToDomLibrary_: function () {
    const container = document.createElement("library");
    container.setAttribute("name", this.library_.name);
    container.setAttribute("key", this.library_.key);
    container.appendChild(this.mutationToDomFunction_());
    return container;
  },

  mutationToDomFunction_: function () {
    const container = document.createElement("function");
    container.setAttribute("name", this.func_.name);
    container.setAttribute("key", this.func_.key);
    if (this.argsCount_ > 0) {
      container.setAttribute("args", this.argsCount_);
    }
    for (let i = 0; i < this.argsCount_; i++) {
      container.appendChild(this.mutationToDomArg_(this.argsName_[i], `ARG${i}`));
    }
    return container;
  },

  mutationToDomArg_: function (name, inputName) {
    let container = document.createElement("arg");
    container.setAttribute("name", name);
    if (this.getInput(inputName).connection.targetBlock()) {
      container.innerText = inputName;
    }
    return container;
  },

  mutationToDomImplement_: function () {
    let container = document.createElement("implement");
    container.appendChild(this.implementXml_.cloneNode(true));
    return container;
  },

  domToMutation: function(xmlElement) {
    this.domToMutationOutdated_(xmlElement);
    this.domToMutationNamespace_(xmlElement);
    this.domToMutationImplement_(xmlElement);

    this.updateShape_();
  },

  domToMutationOutdated_: function (xmlElement) {
    this.outdated_ = xmlElement.getAttribute("outdated") === "true" || false;
  },

  domToMutationNamespace_: function (xmlElement) {
    const namespace = xmlElement.getElementsByTagName("namespace")[0];
    this.namespaceName_ = namespace.getAttribute("name");
    this.domToMutationLibrary_(namespace);
  },

  domToMutationLibrary_: function (xmlElement) {
    const library = xmlElement.getElementsByTagName("library")[0];
    this.library_ = {name: "", key: ""};
    this.library_.name = library.getAttribute("name");
    this.library_.key = library.getAttribute("key");
    this.domToMutationFunction_(library);
  },

  domToMutationFunction_: function (xmlElement) {
    const func = xmlElement.getElementsByTagName("function")[0];
    this.func_ = {name: "", key: ""};
    this.func_.name = func.getAttribute("name");
    this.func_.key = func.getAttribute("key");
    this.argsCount_ = parseInt(func.getAttribute("args"), 10) || 0;
    this.domToMutationArgs_(func);
  },

  domToMutationArgs_: function (xmlElement) {
    this.argsName_ = [];
    for (let i = 0; i < this.argsCount_; i++) {
      let arg = xmlElement.getElementsByTagName("arg")[i];
      this.argsName_[i] = arg.getAttribute("name");
    }
  },

  domToMutationImplement_: function (xmlElement) {
    this.implementXml_ = xmlElement.querySelector("implement > xml") || null;
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

    this.getField("FUNC_FIELD").setText(`${this.namespaceName_}.${this.library_.name}.${this.func_.name}`);

    if (this.argsCount_ > 0) {
      this.getInput("FUNC").appendField("with", "WITH_FIELD");
    }

    for (let i = 0; i < this.argsCount_; i++) {
      let input = this.appendValueInput(`ARG${i}`);
      let field = input.appendField(this.argsName_[i]);
      field.setAlign(Blockly.ALIGN_RIGHT);
    }

    if (this.outdated_) {
      this.contextMenu = false;
      this.setDisabled(true);
    } else {
      this.contextMenu = true;
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

Blockly.Blocks["import_noReturn"] = {
  namespaceName_: "",
  libraryName_: "",
  funcName_: "",
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
    this.funcName_ = "";

    this.resetShape_();
  },

  mutationToDom: Blockly.Blocks["import_return"].mutationToDom,
  mutationToDomNamespace_: Blockly.Blocks["import_return"].mutationToDomNamespace_,
  mutationToDomLibrary_: Blockly.Blocks["import_return"].mutationToDomLibrary_,
  mutationToDomFunction_: Blockly.Blocks["import_return"].mutationToDomFunction_,
  mutationToDomArg_: Blockly.Blocks["import_return"].mutationToDomArg_,
  mutationToDomImplement_: Blockly.Blocks["import_return"].mutationToDomImplement_,

  domToMutation: Blockly.Blocks["import_return"].domToMutation,
  domToMutationOutdated_: Blockly.Blocks["import_return"].domToMutationOutdated_,
  domToMutationNamespace_: Blockly.Blocks["import_return"].domToMutationNamespace_,
  domToMutationLibrary_: Blockly.Blocks["import_return"].domToMutationLibrary_,
  domToMutationFunction_: Blockly.Blocks["import_return"].domToMutationFunction_,
  domToMutationArgs_: Blockly.Blocks["import_return"].domToMutationArgs_,
  domToMutationImplement_: Blockly.Blocks["import_return"].domToMutationImplement_,

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
