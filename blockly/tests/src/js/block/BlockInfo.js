"use strict";

class BlockInfo {
  /**
   * @param {HTMLElement} blockXml
   * @return {BlockInfo}
   */
  static parseFromXml(blockXml) {
    const blockInfo = new BlockInfo();

    blockInfo.xml = blockXml;
    blockInfo.type = blockInfo.xml.getAttribute("type");
    blockInfo.mutationXml = blockInfo.xml.querySelector("mutation");
    blockInfo.funcXml = blockInfo.mutationXml.querySelector("namespace>library>function");
    blockInfo.funcXml.querySelectorAll(":scope>arg").forEach(argXml => {
      blockInfo.argsInfoSet.add(ArgInfo.parseFromXml(argXml));
    });
    blockInfo.implementXml = blockInfo.mutationXml.querySelector("implement");

    return blockInfo;
  }

  /**
   */
  constructor() {
    this.argsInfoSet = new ArgsInfoSet();
  }

  /**
   * @returns {HTMLElement}
   */
  get xml() {
    return this._xml;
  }

  /**
   * @private
   * @param {HTMLElement} xml
   */
  set xml(xml) {
    this._xml = xml;
  }

  /**
   * @returns {string}
   */
  get type() {
    return this._type;
  }

  /**
   * @private
   * @param {string} value
   */
  set type(value) {
    this._type = value;
  }

  /**
   * @returns {HTMLElement}
   */
  get mutationXml() {
    return this._mutation;
  }

  /**
   * @private
   * @param {HTMLElement} value
   */
  set mutationXml(value) {
    this._mutation = value;
  }

  /**
   * @returns {HTMLElement}
   */
  get funcXml() {
    return this._functionName;
  }

  /**
   * @private
   * @param {HTMLElement} value
   */
  set funcXml(value) {
    this._functionName = value;
  }

  /**
   * @returns {string}
   */
  get funcName() {
    return this.funcXml.getAttribute("name");
  }

  /**
   * @returns {HTMLElement}
   */
  get implementXml() {
    return this._implement;
  }

  /**
   * @private
   * @param {HTMLElement} value
   */
  set implementXml(value) {
    this._implement = value;
  }

  /**
   * @returns {ArgsInfoSet}
   */
  get argsInfoSet() {
    return this._argsInfoSet;
  }

  /**
   * @private
   * @param {ArgsInfoSet} value
   */
  set argsInfoSet(value) {
    this._argsInfoSet = value;
  }

  /**
   * @param {BlockInfo} libraryBlockInfo
   */
  updateFromLibraryBlockInfo(libraryBlockInfo) {
    const argsWithConn = this.argsInfoSet.getArgsFiltered(arg => arg.hasConnection);

    if (libraryBlockInfo &&
        this.type === libraryBlockInfo.type &&
        libraryBlockInfo.argsInfoSet.includes(argsWithConn)) {

      this.updateArgsXml(libraryBlockInfo.argsInfoSet);
      this.updateImplementXml(libraryBlockInfo);
    } else {
      this.markOutdated();
    }
  }

  /**
   * @param {ArgsInfoSet} argsInfoSet
   */
  updateArgsXml(argsInfoSet) {
    this.removeArgsXml(arg => !arg.hasConnection);

    const excludedArgs = this.argsInfoSet.excludedFrom(argsInfoSet);
    excludedArgs.addToXml(this.funcXml);

    this.funcXml.setAttribute("args", argsInfoSet.size());
  }

  /**
   * @param {null|Function} filterCallback
   */
  removeArgsXml(filterCallback = null) {
    let argsInfoSet;

    if (filterCallback) {
      argsInfoSet = this.argsInfoSet;
    } else {
      argsInfoSet = this.argsInfoSet.getArgsFiltered(filterCallback);
    }

    argsInfoSet.removeFromXml(this.funcXml);
  }

  /**
   * @param {BlockInfo} libraryBlockInfo
   */
  updateImplementXml(libraryBlockInfo) {
    let newImplementXml = libraryBlockInfo.implementXml.cloneNode(true);
    this.mutationXml.replaceChild(newImplementXml, this.implementXml);
  }

  /**
   */
  markOutdated() {
    this.mutationXml.setAttribute("outdated", "true");
  }

  /**
   */
  resetOutdated() {
    if (this.mutationXml.hasAttribute("outdated")) {
      this.mutationXml.removeAttribute("outdated");
    }
  }
}
