class JsObjectTemplate {
  constructor(objectName) {
    this._functions = [];
    this._objectName = objectName;
  }

  /**
   * Returns header
   * @returns {string}
   */
  getHeader() {
    return `let ${this._objectName} = {\n`;
  }

  /**
   * Returns content
   * @returns {string}
   */
  getContent() {
    return this._functions.reduce((previousValue, currentValue) => {
      return `${previousValue},\n${currentValue}`;
    });
  }

  /**
   * Returns footer
   * @returns {string}
   */
  getFooter() {
    return `};`;
  }

  toString() {
    return this.getHeader() + this.getContent() + this.getFooter();
  }

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
