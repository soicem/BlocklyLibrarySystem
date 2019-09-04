class LibraryManager {
  /**
   */
  constructor(toolboxManager) {
    this._libraries = {};
    this._toolboxManager = toolboxManager;
  }

  ////////// Getter & Setter //////////

  /**
   * @returns {Object<string, Library>}
   */
  get libraries() {
    return this._libraries;
  }

  /**
   * @param {Object<string, Library>} value
   * @private
   */
  set libraries(value) {
    this._libraries = value;
  }

  get libraryInfos() {
    let libraryInfos = {};
    for (let libraryKey in this.libraries) {
      if (!this.libraries.hasOwnProperty(libraryKey)) continue;

      libraryInfos[libraryKey] = this.libraries[libraryKey].info;
    }
    return libraryInfos;
  }

  /**
   * @returns {ToolboxManager}
   */
  get toolboxManager() {
    return this._toolboxManager;
  }

  /**
   * @param {ToolboxManager} toolboxManager
   */
  set toolboxManager(toolboxManager) {
    this._toolboxManager = toolboxManager;
  }

// --- More ---

  ////////// Class Methods //////////

  /**
   * Update existing library with same author
   * @param {Library} library
   * @private
   */
  _updateExistingLibrary(library) {
    const libraryName = library.info.name;
    const matchingLibrary = this.getLibrary(libraryName);

    if (library.isNewerVersionThan(matchingLibrary)) {
      const currentVersion = matchingLibrary.info.version;
      const newerVersion = library.info.version;

      if (confirm(`Do you wish to override "v${currentVersion}" of "${libraryName}" with "v${newerVersion}"?`)) {
        this.toolboxManager.removeCategory(library.info.name);
        this.libraries[libraryName] = library;
        this.toolboxManager.appendLibrary(library);
      }
    }
  }

  /**
   * Swap existing library with different author
   * @param {Library} library
   * @private
   */
  _swapExistingLibrary(library) {
    const libraryName = library.info.name;
    const matchingLibrary = this.getLibrary(libraryName);
    const currentAuthor = matchingLibrary.info.author;
    const newerAuthor = library.info.author;
    if (confirm(`Do you wish to override "${currentAuthor}" version of "${libraryName}" with "${newerAuthor}"version?`)) {
      this.toolboxManager.removeCategory(library.info.name);
      this.libraries[libraryName] = library;
      this.toolboxManager.appendLibrary(library);
    }
  }

  /**
   * @param {string} url
   * @returns {Promise<void>}
   */
  async addLibraryFromUrl(url) {
    const libraryJson = await LibraryUtils.getLibraryJsonFromUrl(url);
    const library = Library.createFromJson(libraryJson);

    if (library) {
      this.addLibrary(library);
    } else {
      console.log("library did not created successfully!");
    }
  }

  /**
   * @param {Library} library
   */
  addLibrary(library) {
    if (this.hasSameNameAuthorLibrary(library.info)) {
      this._updateExistingLibrary(library);
    } else if (this.hasSameNameLibrary(library.info)) {
      this._swapExistingLibrary(library);
    } else {
      this.libraries[library.info.name] = library;
      this.toolboxManager.appendLibrary(library);
    }
  }

  /**
   * @param {Library|LibraryInfo} target
   * @returns {boolean}
   */
  hasSameNameAuthorLibrary(target) {
    let hasSameLibrary = false;
    const libraryInfo = (target instanceof Library) ? (target.info) : (target);

    if (this.hasSameNameLibrary(libraryInfo)) {
      const libraryName = libraryInfo.name;
      const matchingLibrary = this.libraries[libraryName];

      if (matchingLibrary.info.author === libraryInfo.author) {
        hasSameLibrary = true;
      }
    }

    return hasSameLibrary;
  }

  /**
   * @param {Library|LibraryInfo} target
   * @returns {boolean}
   */
  hasSameNameLibrary(target) {
    const libraryInfo = (target instanceof Library) ? (target.info) : (target);
    return libraryInfo.name in this.libraries;
  }

  /**
   * @param {Library|LibraryInfo|string} source
   * @returns {Library}
   */
  getLibrary(source) {
    const libraryName = LibraryUtils.getLibraryName(source);

    return this.libraries[libraryName];
  }

  /**
   * @param {Library|LibraryInfo|string} source
   */
  removeLibrary(source) {
    const libraryName = LibraryUtils.getLibraryName(source);

    if (this.libraries.hasOwnProperty(libraryName)) {
      delete this.libraries[libraryName];
    }
  }

  /**
   * @param {Library|LibraryInfo|string} source
   * @returns {Promise<void>}
   */
  async updateLibraryFromUrl(source) {
    if (!this.hasSameNameLibrary(source)) return;

    const library = this.getLibrary(source);
    const libraryUrl = library.info.url;
    const onlineLibraryJson = await LibraryUtils.getLibraryJsonFromUrl(libraryUrl);
    if (!onlineLibraryJson) return;
    const onlineLibrary = Library.createFromJson(onlineLibraryJson);
    if (!onlineLibrary) return;

    this._updateExistingLibrary(onlineLibrary);
  }

  createLibraryFile(workspace, libraryName, author) {
    let library = new LibraryBuilder(libraryName, author)
        .setUrl(libraryName + ".blk")
        .setVersion("1.0")
        .addImports(this.libraryInfos)
        .addFunctions(LibraryUtils.getImplementationBlocksInfo(workspace,libraryName))
        .build();

    saveAs(new Blob([library.toString()]), libraryName + ".blk");
  }

  getLibraryJsCode() {
    let jsCode = "";

    for (let libraryKey in this.libraries) {
      if (!this.libraries.hasOwnProperty(libraryKey)) continue;

      jsCode += this.libraries[libraryKey].jsObject;
    }

    return jsCode;
  }
}
