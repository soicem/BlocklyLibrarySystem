class LibraryBuilder {
  /**
   * @param {string} name
   * @param {string} author
   */
  constructor(name, author = "unknown") {
    this._name = name;
    this._author = author;
    this._imports = {};
    this._functions = {};
  }

  /**
   * @returns {Library}
   */
  build() {
    const libraryInfo = new LibraryInfo(this._name, this._author);
    libraryInfo._version = this._version;
    libraryInfo._url = this._url;

    const library = new Library(libraryInfo);
    library._imports = this._imports;
    library._functions = this._functions;
    library.updateHashCode();

    return library;
  }

  /**
   * @param {string} name
   * @returns {LibraryBuilder}
   */
  setName(name) {
    this._name = name;

    return this;
  }

  /**
   * @param {string} author
   * @returns {LibraryBuilder}
   */
  setAuthor(author) {
    this._author = author;

    return this;
  }

  /**
   * @param {string} version
   * @returns {LibraryBuilder}
   */
  setVersion(version) {
    this._version = version;

    return this;
  }

  /**
   * @param {string} url
   * @returns {LibraryBuilder}
   */
  setUrl(url) {
    this._url = url;

    return this;
  }

  /**
   * @param {LibraryInfo} libraryInfo
   * @returns {LibraryBuilder}
   */
  addImport(libraryInfo) {
    this._imports[libraryInfo.name] = libraryInfo;

    return this;
  }

  /**
   * @param {Object<string, LibraryInfo>}libraryInfos
   */
  addImports(libraryInfos) {
    for (let libraryInfoKey in libraryInfos) {
      if (!libraryInfos.hasOwnProperty(libraryInfoKey)) continue;

      const libraryInfo = libraryInfos[libraryInfoKey];
      this.addImport(libraryInfo);
    }

    return this;
  }

  /**
   * @param {{name:string,key,string}} func
   * @param {string} xml
   * @returns {LibraryBuilder}
   */
  addFunctionXml(func, xml) {
    if (!this._functions.hasOwnProperty(func.name)) {
      this._functions[func.name] = {};
    }
    this._functions[func.name].xml = xml;

    const library = {name: this._name, key: NameUtil.safeFunctionName(this._name)};
    this._functions[func.name].interfaceXml = LibraryUtils.convertImplementToInterfaceString(this._author, library, func, xml);

    return this;
  }

  /**
   * @param {{name:string,key,string}} func
   * @param {string} js
   * @returns {LibraryBuilder}
   */
  addFunctionJs(func, js) {
    if (!this._functions.hasOwnProperty(func.name)) {
      this._functions[func.name] = {};
    }
    this._functions[func.name].js = js;

    return this;
  }

  /**
   * @param {{name:string,key,string}} func
   * @returns {LibraryBuilder}
   */
  addFunctionKey(func) {
    if (!this._functions.hasOwnProperty(func.name)) {
      this._functions[func.name] = {};
    }
    this._functions[func.name].key = func.key;

    return this;
  }

  /**
   * @param {{name:string,key,string}} func
   * @param {string} xml
   * @param {string} js
   * @returns {LibraryBuilder}
   */
  addFunction(func, xml, js) {
    this.addFunctionKey(func);
    this.addFunctionXml(func, xml);
    this.addFunctionJs(func, js);

    return this;
  }

  /**
   * @param {Object<string,{key:string,xml:string,interfaceXml:string,js:string}>} functionInfos
   */
  addFunctions(functionInfos) {
    for (let functionInfoKey in functionInfos) {
      if (!functionInfos.hasOwnProperty(functionInfoKey)) continue;

      const key = functionInfos[functionInfoKey].key;
      const xml = functionInfos[functionInfoKey].xml;
      const js = functionInfos[functionInfoKey].js;

      let func = {name: functionInfoKey, key: key};
      this.addFunction(func, xml, js);
    }

    return this;
  }
}
