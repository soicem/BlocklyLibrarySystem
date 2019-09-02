class ToolboxManager {
  /**
   * @param {Blockly.Workspace} workspace
   * @param {HTMLElement} toolboxDom
   * @param {boolean} autoUpdate
   */
  static createWithDom(workspace, toolboxDom, autoUpdate = true) {
    const toolboxId = toolboxDom.getAttribute("id");
    const toolboxManager = new ToolboxManager(workspace, toolboxId, autoUpdate);
    toolboxManager._toolboxDom = toolboxDom;
    return toolboxManager;
  }

  /**
   * @param {Blockly.Workspace} workspace
   * @param {string} toolboxId
   * @param {boolean} autoUpdate
   */
  constructor(workspace, toolboxId, autoUpdate = true) {
    this._workspace = workspace;
    this._toolboxDom = document.createElement("xml");
    this._toolboxDom.setAttribute("id", toolboxId);
    this._autoUpdate = autoUpdate;
  }

  /**
   * @returns {Blockly.Workspace}
   */
  get workspace() {
    return this._workspace;
  }

  /**
   * @param {Blockly.Workspace} workspace
   */
  set workspace(workspace) {
    this._workspace = workspace;
  }

  /**
   * @returns {HTMLElement}
   */
  get toolboxDom() {
    return this._toolboxDom;
  }

  /**
   * @returns {boolean}
   */
  get autoUpdate() {
    return this._autoUpdate;
  }

  /**
   * @param {boolean} value
   */
  set autoUpdate(value) {
    this._autoUpdate = value;
  }

  /**
   * @returns {Element.children}
   */
  get categories() {
    return this.toolboxDom.children;
  }

  /**
   * @returns {number}
   */
  get count() {
    return this.categories.length;
  }

  /**
   * @returns {boolean}
   */
  isEmpty() {
    return this.count === 0;
  }

  /**
   * @param {string} categoryName
   * @returns {HTMLElement}
   */
  getCategory(categoryName) {
    return this.toolboxDom.querySelector(`category[name=${categoryName}]`);
  }

  /**
   * @param {number} index
   * @returns {HTMLElement}
   */
  getCategoryByIndex(index) {
    return this.categories[index];
  }

  /**
   * @param {number} index
   * @param {string} categoryName
   * @param {string} style
   * @param {string} color
   * @param {boolean|string}expanded
   * @return {null|HTMLElement}
   */
  insertCategoryBeforeIndex(index, categoryName, style = "", color = "", expanded = false) {
    if (index > this.count || index < 0) return null;

    const categoryDom = document.createElement("category");
    categoryDom.setAttribute("name", categoryName);
    if (style) {
      categoryDom.setAttribute("style", style);
    }
    if (color) {
      categoryDom.setAttribute("color", color);
    }
    if (expanded) {
      categoryDom.setAttribute("expanded", expanded);
    }

    this.toolboxDom.insertBefore(categoryDom, this.getCategoryByIndex(index));
    if (this.autoUpdate) this.updateToolbox();

    return categoryDom;
  }

  /**
   * @param {string} categoryName
   * @param {string} style
   * @param {string} color
   * @param {boolean|string}expanded
   * @return {null|HTMLElement}
   */
  appendCategory(categoryName, style = "", color = "", expanded = false) {
    return this.insertCategoryBeforeIndex(this.count, categoryName, style, color, expanded);
  }

  /**
   * @param {string} categoryName
   * @returns {null|HTMLElement} Null if no category name found
   */
  removeCategory(categoryName) {
    const foundCategory = this.getCategory(categoryName);
    if (!foundCategory) return null;

    this.toolboxDom.removeChild(foundCategory);
    if (this.autoUpdate) this.updateToolbox();

    return foundCategory;
  }

  /**
   * @param {string} categoryName
   * @param {HTMLElement} blockDom
   * @return {null|HTMLElement} Null if no category name found
   */
  appendBlockDom(categoryName, blockDom) {
    const category = this.getCategory(categoryName);
    if (!category) return null;

    category.appendChild(blockDom);
    if (this.autoUpdate) this.updateToolbox();

    return blockDom;
  }

  /**
   * Visual update the toolbox
   */
  updateToolbox() {
    this.workspace.updateToolbox(this.toolboxDom);
  }

  /**
   * @param {Library} library
   */
  appendLibrary(library) {
    this.appendCategory(library.info.name);

    for (let functionKey in library.functions) {
      if (!library.functions.hasOwnProperty(functionKey)) continue;

      const interfaceXml = library.functions[functionKey].interfaceXml;
      console.log(Blockly.Xml.textToDom(interfaceXml));
      const blockDom = Blockly.Xml.textToDom(interfaceXml).children[0];

      this.appendBlockDom(library.info.name, blockDom);
    }

    // no need for auto-update (done inside appendCategory & appendBlockDom)
  }
}
