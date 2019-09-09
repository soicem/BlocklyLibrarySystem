class JsObjectTemplate {
  /**
   * @param {string} namespaceName Name of the namespace
   * @param {string} objectName Name of the object
   */
  constructor(namespaceName, objectName) {
    this.namespaceName = namespaceName;
    this.objectName = objectName;
    this._functions = [];
  }

  /**
   * @returns {string}
   */
  get namespaceName() {
    return this._namespaceName;
  }

  /**
   * @param {string} value
   */
  set namespaceName(value) {
    this._namespaceName = value;
  }

  /**
   * @returns {string}
   */
  get objectName() {
    return this._objectName;
  }

  /**
   * @param {string} value
   */
  set objectName(value) {
    this._objectName = value;
  }

  /**
   * @returns {string[]}
   */
  get functions() {
    return this._functions;
  }

  /**
   * Returns header
   * @returns {string}
   */
  getHeader() {
    return `var ${this.namespaceName} = ${this.namespaceName} || {};
    
    ${this.namespaceName}.${this.objectName} = {`;
  }

  /**
   * Returns content
   * @returns {string}
   */
  getContent() {
    let content = "";

    if (this.functions.length) {
      content += this.functions.reduce((previousValue, currentValue) => {
        return `${previousValue},\n${currentValue}`;
      });
    }

    return content;
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
   * @param {string} functionName
   * @param {string} callback
   */
  addFunctionDefinition(functionName, callback) {
    this.functions.push(`${functionName}: ${callback}`);
  }
}
