class LibraryBuilder {
  constructor(name, author) {
    this.initializeJson();

    this._info = this._json.info;
    this._imported = this._info.imported;
    this._functions = this._json.functions;
  }

  /**
   * Initializes JSON structure that fits our library format
   */
  initializeJson() {
    this._json = {
      info: {
        name: "",
        version: "0.0",
        author: "",
        created: "",
        modified: "",
        imported: []
      },
      functions: {},
      jsObject: ""
    };
  }

  /**
   * Fix the datetime of creation and modified time if not set
   * @private
   */
  _fixEmptyDateTime() {
    if (this._info.created === "") {
      this.setCreatedDateToNow();
      this.setModifiedDateToNow();
    } else if (this._info.modified === "") {
      this.setModifiedDateToNow();
    }
  }

  /**
   * Generates library's JS object in string
   * @private
   */
  _generateJsObject() {
    const jsObjectTemplate = new JsObjectTemplate(this._info.name);

    for (let functionKey in this._functions) {
      if (this._functions.hasOwnProperty(functionKey)) {
        jsObjectTemplate.addFunctionDefinition(functionKey,
            this._functions[functionKey].js);
      }
    }

    this._json.jsObject = jsObjectTemplate.toString();
  }

  /**
   * Builds library with the stored information
   */
  build() {
    this._fixEmptyDateTime();
    this._generateJsObject();
    let jsonText = JSON.stringify(this._json);
    console.log(jsonText);
    // let fs = require('fs');
    // fs.writeFile("thing.json", jsonText);
  }

  /**
   * Sets library name
   * @param {string} name Name of the library
   * @returns {LibraryBuilder}
   */
  setName(name) {
    this._info.name = name;
    return this;
  }

  /**
   * Sets library version
   * @param {string} version Version of the library
   * @returns {LibraryBuilder}
   */
  setVersion(version) {
    this._info.version = version;
    return this;
  }

  /**
   * Sets library author
   * @param author Author of the library
   * @returns {LibraryBuilder}
   */
  setAuthor(author) {
    this._info.author = author;
    return this;
  }

  /**
   * Sets library creation date to current date and time
   * @returns {LibraryBuilder}
   */
  setCreatedDateToNow() {
    this._info.created = new Date().toISOString();
    return this;
  }

  /**
   * Sets library modified date to current date and time
   * @returns {LibraryBuilder}
   */
  setModifiedDateToNow() {
    this._info.modified = new Date().toISOString();
    return this;
  }

  /**
   * Adds a library imported to this library
   * @param {json} libraryInfo Library used in this library
   * @returns {LibraryBuilder}
   */
  addImportedLibrary(libraryInfo) {
    this._imported.push(libraryInfo);
    return this;
  }

  /**
   * Removes a library from the imported library
   * @param {json} libraryInfo Library to be removed
   * @returns {LibraryBuilder}
   */
  removeImportLibrary(libraryInfo) {
    const foundAt = this._imported.indexOf(libraryInfo);
    if (foundAt >= 0) {
      this._imported.splice(foundAt, 1);
    }
    return this;
  }

  /**
   * Adds library function's XML
   * @param {string} functionName Name of the function
   * @param {string} xml XML code of the function
   * @returns {LibraryBuilder}
   */
  addFunctionXml(functionName, xml) {
    if (!this._functions.hasOwnProperty(functionName)) {
      this._functions[functionName] = {};
    }
    this._functions[functionName].xml = xml;
    return this;
  }

  /**
   * Removes library function's XML from the list
   * @param {string} functionName Name of the function
   * @returns {LibraryBuilder}
   */
  removeFunctionXml(functionName) {
    if (this._functions.hasOwnProperty(functionName)) {
      delete this._functions[functionName].xml;
    }
    return this;
  }

  /**
   * Adds library function's JS
   * @param {string} functionName Name of the function
   * @param {string} js JS code of the function
   * @returns {LibraryBuilder}
   */
  addFunctionJs(functionName, js) {
    if (!this._functions.hasOwnProperty(functionName)) {
      this._functions[functionName] = {};
    }
    this._functions[functionName].js = js;
    return this;
  }

  /**
   * Removes library function's JS from the list
   * @param {string} functionName Name of the function
   * @returns {LibraryBuilder}
   */
  removeFunctionJs(functionName) {
    if (this._functions.hasOwnProperty(functionName)) {
      delete this._functions[functionName].js;
    }
    return this;
  }

  /**
   * Adds library function's XML and JS
   * @param {string} functionName Name of the function
   * @param {string} xml XML code of the function
   * @param {string} js JS code of the function
   * @returns {LibraryBuilder}
   */
  addFunction(functionName, xml, js) {
    this.addFunctionXml(functionName, xml);
    this.addFunctionJs(functionName, js);
    return this;
  }

  /**
   * Removes library function's XML and JS form the list
   * @param {string} functionName Name of the function
   * @returns {LibraryBuilder}
   */
  removeFunction(functionName) {
    delete this._functions[functionName];
    return this;
  }
}
