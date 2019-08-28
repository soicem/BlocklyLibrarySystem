class JsObjectTemplate {
  /**
   * @param {string} objectName Name of the object
   */
  constructor(objectName) {
    this._functions = [];
    this._objectName = objectName;
  }

  /**
   * Returns header
   * @returns {string}
   */
  getHeader() {
    return `${this._objectName} = {`;
  }

  /**
   * Returns content
   * @returns {string}
   */
  getContent() {
    return this._functions.reduce((previousValue, currentValue) => {
      return `${previousValue},\n${currentValue}`;
    }, "");
  }

  /**
   * Returns footer
   * @returns {string}
   */
  getFooter() {
    return `};`;
  }

  /**
   * @returns {string}
   */
  toString() {
    return this.getHeader() + '\n' + this.getContent() + '\n' + this.getFooter();
  }

  /**
   * @returns {string}
   */
  print() {
    return this.toString();
  }

  /**
   * Adds function definition
   * @param functionName
   * @param callback
   */
  addFunctionDefinition(functionName, callback) {
    this._functions.push(`${functionName}: ${callback}`);
  }
}
