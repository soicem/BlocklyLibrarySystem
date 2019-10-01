"use strict";

class ArgInfo {
  /**
   * @param {HTMLElement} xml
   * @return {ArgInfo}
   */
  static parseFromXml(xml) {
    const name = xml.getAttribute("name");
    const hasConnection = xml.childNodes.length > 0 || false;
    return new ArgInfo(xml, name, hasConnection);
  }

  /**
   * @param {HTMLElement} xml
   * @param {string} argName
   * @param {boolean} hasConnection
   */
  constructor(xml, argName, hasConnection = false) {
    this.xml = xml;
    this.argName = argName;
    this.hasConnection = hasConnection;
  }

  /**
   * @returns {HTMLElement}
   */
  get xml() {
    return this._xml;
  }

  /**
   * @param {HTMLElement} xml
   */
  set xml(xml) {
    this._xml = xml;
  }

  /**
   * @returns {string}
   */
  get argName() {
    return this._argName;
  }

  /**
   * @param {string} argName
   */
  set argName(argName) {
    this._argName = argName;
  }

  /**
   * @returns {boolean}
   */
  get hasConnection() {
    return this._hasConnection;
  }

  /**
   * @param {boolean} hasConnection
   */
  set hasConnection(hasConnection) {
    this._hasConnection = hasConnection;
  }

  /**
   * @param {ArgInfo} other
   */
  equals(other) {
    if (!other) return false;
    if (!other instanceof ArgInfo) return false;
    if (this === other) return true;

    return this.argName === other.argName &&
        this.hasConnection === other.hasConnection;
  }
}
