"use strict";

class ArgsInfoSet {
  /**
   */
  constructor() {
    this.argInfos = new Set();
  }

  get argInfos() {
    return this._argInfos;
  }

  set argInfos(value) {
    this._argInfos = value;
  }

  /**
   * @returns {number}
   */
  size() {
    return this.argInfos.size;
  }

  /**
   * @param {ArgInfo} argInfo
   */
  has(argInfo) {
    for (const argInfo1 of this.argInfos) {
      argInfo1.equals(argInfo);
    }
  }

  /**
   * @param {ArgInfo} argInfo
   */
  add(argInfo) {
    if (!this.has(argInfo)) {
      this.argInfos.add(argInfo);
    }
  }

  /**
   * @param {ArgInfo} argInfo
   */
  delete(argInfo) {
    for (const argInfo1 of this.argInfos) {
      if (argInfo1.equals(argInfo)) {
        this.argInfos.delete(argInfo1);
      }
    }
  }

  /**
   */
  clear() {
    this.argInfos.clear();
  }

  /**
   * @returns {Set<string>}
   */
  getArgNames() {
    const argNames = new Set();

    this.argInfos.forEach(value => {
      argNames.add(value.argName);
    });

    return argNames;
  }

  /**
   * @param {Function} filterCallback
   * @returns {ArgsInfoSet}
   */
  getArgsFiltered(filterCallback) {
    const argsWithConnections = new ArgsInfoSet();

    this.argInfos.forEach(value => {
      if (filterCallback(value)) {
        argsWithConnections.add(value);
      }
    });

    return argsWithConnections;
  }

  /**
   * @param {ArgsInfoSet} argsInfoSet
   * @return {boolean}
   */
  includes(argsInfoSet) {
    return this.argInfos.includes(argsInfoSet.argInfos);
  }

  /**
   * @param {ArgsInfoSet} argsInfoSet
   * @returns {ArgsInfoSet}
   */
  excludedFrom(argsInfoSet) {
    const excluded = new ArgsInfoSet();

    for (const argInfo of argsInfoSet.argInfos) {
      if (!this.has(argInfo)) {
        excluded.add(argInfo);
      }
    }

    return excluded;
  }

  /**
   * @param {HTMLElement} xml
   */
  addToXml(xml) {
    for (const argInfo of this.argInfos) {
      xml.appendChild(argInfo.xml.cloneNode(true));
    }
  }

  /**
   * @param {HTMLElement} xml Parent's xml where these args will be removed
   */
  removeFromXml(xml) {
    this.argInfos.forEach(argInfo => {
      xml.removeChild(argInfo.xml);
    })
  }
}
