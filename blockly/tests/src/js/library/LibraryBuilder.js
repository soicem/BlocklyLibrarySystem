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
   * @param {string} functionName
   * @param {string} xml
   * @returns {LibraryBuilder}
   */
  addFunctionXml(functionName, xml) {
    if (!this._functions.hasOwnProperty(functionName)) {
      this._functions[functionName] = {};
    }
    this._functions[functionName].xml = xml;
    this._functions[functionName].interfaceXml = LibraryUtils.convertImplementToInterfaceString(this._author, this._name, xml);

    return this;
  }

  /**
   * @param {string} functionName
   * @param {string} js
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
   * @param {string} functionName
   * @param {string} xml
   * @param {string} js
   * @returns {LibraryBuilder}
   */
  addFunction(functionName, xml, js) {
    this.addFunctionXml(functionName, xml);
    this.addFunctionJs(functionName, js);

    return this;
  }

  /**
   * @param {Object<string, {xml:string, interfaceXml:string, js:string}>} functionInfos
   */
  addFunctions(functionInfos) {
    for (let functionInfoKey in functionInfos) {
      if (!functionInfos.hasOwnProperty(functionInfoKey)) continue;

      const xml = functionInfos[functionInfoKey].xml;
      const js = functionInfos[functionInfoKey].js;

      this.addFunction(functionInfoKey, xml, js);
    }

    return this;
  }
}
