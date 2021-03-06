class LibraryManager {
  /**
   * @param {ToolboxManager} toolboxManager
   * @param {Blockly.Workspace} workspace
   * @param {Canvas} canvas
   */
  constructor(toolboxManager, workspace, canvas) {
    this._libraries = {};
    this.toolboxManager = toolboxManager;
    this.workspace = workspace;
    this.canvas = canvas;
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

  /**
   */
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

  /**
   * @returns {Blockly.Workspace}
   */
  get workspace() {
    return this._workspace;
  }

  /**
   * @param {Blockly.Workspace} workspace
   */
  set workspace(workspace) {
    this._workspace = workspace;
  }

  /**
   * @returns {Canvas}
   */
  get canvas() {
    return this._canvas;
  }

  /**
   * @param {Canvas} value
   */
  set canvas(value) {
    this._canvas = value;
  }

// --- More ---

  ////////// Class Methods //////////

  /**
   * Update existing library with same author
   * @param {Library} library
   * @private
   */
  _updateExistingLibrary(library) {
    const libraryFullName = `${library.info.author}.${library.info.name}`;
    const matchingLibrary = this.getLibrary(libraryFullName);

    if (library.isNewerVersionThan(matchingLibrary)) {
      const currentVersion = matchingLibrary.info.version;
      const newerVersion = library.info.version;

      if (confirm(`Do you wish to override "v${currentVersion}" of "${libraryFullName}" with "v${newerVersion}"?`)) {
        const oldFunctions = Object.keys(this.libraries[libraryFullName].functions);

        this.libraries[libraryFullName] = library;
        this.toolboxManager.updateLibrary(library);
        this.canvas.updateLibraryBlocks(library, oldFunctions);
        this.workspace.refresh();
      }
    }
  }

  /**
   * @param {Library} library
   */
  addLibrary(library) {
    let libraryFullName = `${library.info.author}.${library.info.name}`;

    if (this.libraries.hasOwnProperty(libraryFullName)) { // Already assigned
      this._updateExistingLibrary(library);
    } else { // Not assigned
      this.libraries[libraryFullName] = library;
      this.toolboxManager.appendLibrary(library);
    }
  }

  /**
   * @param {JSON} libraryJson
   */
  addLibraryFromJson(libraryJson) {
    const library = Library.createFromJson(libraryJson);

    if (library) {
      this.addLibrary(library);
    } else {
      console.log("library did not created successfully!");
    }
  }

  /**
   * @param {File} file
   */
  addLibraryFromFile(file) {
    let reader = new FileReader();
    reader.readAsText(file);

    reader.addEventListener("load", () => {
      this.addLibraryFromJson(JSON.parse(reader.result));
    });
  }

  /**
   * @param {string} url
   * @returns {Promise<void>}
   */
  async addLibraryFromUrl(url) {
    const libraryJson = await LibraryUtils.getLibraryJsonFromUrl(url);
    this.addLibraryFromJson(libraryJson);
  }

  /**
   * Parse GitHub http to retrieve BLK (using nodejs)
   * @param {string} url
   * @param {boolean} async False if wait for load event to finish executing
   */
  addLibraryFromGitHub(url, async = true) {
    function loadEvent() {
      const result = JSON.parse(xhr.responseText);
      if (result.result !== "ok") return;
      libraryManager.addLibrary(Library.createFromJson(result.output));
    }

    const data = JSON.stringify({'url': url});
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://127.0.0.1:3000/getBlkFromGitUrl', async);
    xhr.setRequestHeader('Content-Type', "application/json");
    xhr.send(data);
    xhr.addEventListener("load", () => loadEvent());

    if (!async && xhr.status === 200) {
      loadEvent();
    }
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

  /**
   * @param {Blockly.Workspace} workspace
   * @param {string} libraryName
   * @param {string} author
   * @param {string} version
   * @returns {Library}
   */
  createLibrary(workspace, libraryName, author, version = "1.0"){
    const library = new LibraryBuilder(libraryName, author)
    .setUrl(libraryName + ".blk")
    .setVersion(version)
    .addImports(this.libraryInfos)
    .addFunctions(LibraryUtils.getImplementationBlocksInfo(workspace, libraryName))
    .build();
    return library;
  }

  /**
   * @param {Blockly.Workspace} workspace
   * @param {string} libraryName
   * @param {string} author
   * @param {string} version
   * @return {Library}
   */
  createLibraryFile(workspace, libraryName, author, version = "1.0") {
    const library = this.createLibrary(workspace, libraryName, author, version);
    library.saveAsFile();
    return library;
  }

  /**
   * @param {Blockly.Workspace} workspace
   * @param {string} libraryName
   * @param {string} author
   * @param {string} version
   * @returns {{info: *, imports: Object<string, *>, functions: Object<string, {xml: string, interfaceXml: string, js: string}>, jsObject: string, hashCode: string}}
   */
  getLibraryJson(workspace, libraryName, author, version = "1.0"){
    return this.createLibrary(workspace, libraryName, author, version).toJson();
  }

  /**
   * @returns {string}
   */
  getLibraryJsCode() {
    let jsCode = "";

    for (let libraryKey in this.libraries) {
      if (!this.libraries.hasOwnProperty(libraryKey)) continue;

      jsCode += this.libraries[libraryKey].jsObject;
    }

    return jsCode;
  }
}
