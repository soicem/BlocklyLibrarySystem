class Library {
  /**
   * Creates Library class based from the json
   * @param {{info:*,imports:{},functions:Object.<string,{xml:string,js:string}>,jsObject:string,hashCode:string}} json JSON string to build from
   * @returns {Library}
   */
  static createFromJson(json) {
    let library = null;

    const libraryInfo = LibraryInfo.createFromJson(json.info);

    if (libraryInfo) {
      library = new Library(libraryInfo);

      this._copyImportsFromJson(json, library);
      this._copyFunctionsFromJson(json, library);
      library._jsObject = json.jsObject;
      library._hashCode = json.hashCode;

      if (json.hashCode !== `${library._generateHashCode()}`) {
        //@TODO: throw exception rather than null + change let to const for libraryInfo
        console.error(`Defected JSON of Library: ${json.info.name}`);
        library = null;
      }
    }

    return library;
  }

  /**
   * @param {{info:*,imports:{},functions:Object.<string,{xml:string,js:string}>,jsObject:string,hashCode:string}} json JSON string to build from
   * @param {Library} library
   * @private
   */
  static _copyImportsFromJson(json, library) {
    for (let importKey in json.imports) {
      if (json.imports.hasOwnProperty(importKey)) {
        library._imports[importKey] = json.imports[importKey];
      }
    }
  }

  /***
   * @param {{info:*,imports:{},functions:Object.<string,{xml:string,js:string}>,jsObject:string,hashCode:string}} json JSON string to build from
   * @param {Library} library
   * @private
   */
  static _copyFunctionsFromJson(json, library) {
    for (let functionKey in json.functions) {
      if (json.functions.hasOwnProperty(functionKey)) {
        library._functions[functionKey] = {};
        library._functions[functionKey].xml = json.functions[functionKey].xml;
        library._functions[functionKey].js = json.functions[functionKey].js;
      }
    }
  }

  /**
   * @param {LibraryInfo} libraryInfo Info of library
   */
  constructor(libraryInfo) {
    this._info = libraryInfo;
    this._imports = {};
    this._functions = {};
    this._jsObject = '';
    this._hashCode = 0;
    this._isHashCodeUpToDate = false;
  }

  /**
   * @returns {LibraryInfo}
   */
  get info() {
    return this._info;
  }


  /**
   * @returns {Object.<string, LibraryInfo>}
   */
  get imports() {
    return this._imports;
  }

  /**
   * @returns {Object.<string, {xml: string, js: string}>}
   */
  get functions() {
    return this._functions;
  }

  /**
   * @returns {string}
   */
  get jsObject() {
    this.updateJsObject();
    return this._jsObject;
  }

  /**
   * @returns {string}
   */
  get hashCode() {
    this.updateHashCode();
    return this._hashCode;
  }

  /**
   * @returns {boolean}
   */
  get isHashCodeUpToDate() {
    return this._isHashCodeUpToDate;
  }

  /**
   * @param value
   * @private
   */
  set isHashCodeUpToDate(value) {
    this._isHashCodeUpToDate = value;
  }

  /**
   * Generates library's JS object in string
   * @returns {string}
   * @private
   */
  _generateJsObject() {
    const jsObjectTemplate = new JsObjectTemplate(this.info.name);

    for (let functionKey in this.functions) {
      if (this.functions.hasOwnProperty(functionKey)) {
        jsObjectTemplate.addFunctionDefinition(functionKey,
            this.functions[functionKey].js);
      }
    }

    return jsObjectTemplate.toString();
  }

  /**
   * @returns {number}
   * @private
   */
  _generateHashCode() {
    const tmp = [
      `${this.info.hashCode}`,
      `${this.jsObject}`
    ];

    for (let importsKey in this.imports) {
      if (this.imports.hasOwnProperty(importsKey)) {
        tmp.push(`${this.imports[importsKey].hashCode}`);
      }
    }
    for (let functionsKey in this.functions) {
      if (this.functions.hasOwnProperty(functionsKey)) {
        tmp.push(`${functionsKey.hashCode()}`);
        tmp.push(`${this.functions[functionsKey].js.hashCode()}`);
        tmp.push(`${this.functions[functionsKey].xml.hashCode()}`);
      }
    }

    return tmp.join('').hashCode();
  }

  /**
   * @returns {string} JSON structure of this library in a string
   */
  toString() {
    return JSON.stringify(this.toJson());
  }

  /**
   * @returns {{imports: *, functions: Object<string, {xml: string, js: string}>, jsObject: string, hashCode: string, info: {author: string, created: string, name: string, modified: string, version: string, hash: string}}}
   */
  toJson() {
    let tmp = {};
    for (let importKey in this.imports) {
      if (this.imports.hasOwnProperty(importKey)) {
        tmp[importKey] = this.imports[importKey].toJson();
      }
    }

    return {
      'info': this.info.toJson(),
      'imports': tmp,
      'functions': this.functions,
      'jsObject': `${this.jsObject}`,
      'hashCode': `${this.hashCode}`
    };
  }

  /**
   * Updates JS Object
   */
  updateJsObject() {
    this._jsObject = this._generateJsObject();
    this.isHashCodeUpToDate = false;

    // fields that are not modified directly by the users will not modify the modified datetime
  }

  /**
   * Updates hascode
   */
  updateHashCode() {
    if (!this._isHashCodeUpToDate) {
      this._hashCode = this._generateHashCode();
    }
    this._isHashCodeUpToDate = true;

    // fields that are not modified directly by the users will not modify the modified datetime
  }

  /**
   * Adds a library imported to this library
   * @param {LibraryInfo} libraryInfo Library used in this library
   */
  addImport(libraryInfo) {
    this.imports[libraryInfo.name] = libraryInfo;

    this.info.updateModifiedDatetime();
    this.isHashCodeUpToDate = false;
  }

  /**
   * Removes a library from the imported library
   * @param {LibraryInfo} libraryInfo Library to be removed
   */
  removeImport(libraryInfo) {
    delete this.imports[libraryInfo.name];

    this.info.updateModifiedDatetime();
    this.isHashCodeUpToDate = false;
  }

  /**
   * Adds library function's XML
   * @param {string} functionName Name of the function
   * @param {string} xml XML code of the function
   */
  addFunctionXml(functionName, xml) {
    if (!this.functions.hasOwnProperty(functionName)) {
      this.functions[functionName] = {};
    }
    this.functions[functionName].xml = xml;

    this.info.updateModifiedDatetime();
    this.isHashCodeUpToDate = false;
  }

  /**
   * Removes library function's XML from the list
   * @param {string} functionName Name of the function
   */
  removeFunctionXml(functionName) {
    if (this.functions.hasOwnProperty(functionName)) {
      delete this.functions[functionName]['xml'];
    }

    this.info.updateModifiedDatetime();
    this.isHashCodeUpToDate = false;
  }

  /**
   * Adds library function's JS
   * @param {string} functionName Name of the function
   * @param {string} js JS code of the function
   */
  addFunctionJs(functionName, js) {
    if (!this.functions.hasOwnProperty(functionName)) {
      this.functions[functionName] = {};
    }
    this.functions[functionName].js = js;

    this.info.updateModifiedDatetime();
    this.isHashCodeUpToDate = false;
  }

  /**
   * Removes library function's JS from the list
   * @param {string} functionName Name of the function
   */
  removeFunctionJs(functionName) {
    if (this.functions.hasOwnProperty(functionName)) {
      delete this.functions[functionName]['js'];
    }

    this.info.updateModifiedDatetime();
    this.isHashCodeUpToDate = false;
  }

  /**
   * Adds library function's XML and JS
   * @param {string} functionName Name of the function
   * @param {string} xml XML code of the function
   * @param {string} js JS code of the function
   */
  addFunction(functionName, xml, js) {
    this.addFunctionXml(functionName, xml);
    this.addFunctionJs(functionName, js);

    // !!! NO NEED to update modified datetime !!!
    // this.info.updateModifiedDatetime();
  }

  /**
   * Removes library function's XML and JS form the list
   * @param {string} functionName Name of the function
   */
  removeFunction(functionName) {
    delete this.functions[functionName];

    this.info.updateModifiedDatetime();
    this.isHashCodeUpToDate = false;
  }

  /**
   * @param {Library} other
   * @returns {boolean}
   */
  isNewerVersionThan(other) {
    return this.info.isNewerVersionThan(other.info);
  }
}
