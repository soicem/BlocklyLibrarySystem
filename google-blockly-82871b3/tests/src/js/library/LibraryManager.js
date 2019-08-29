class LibraryManager {
  /**
   */
  constructor() {
    this._libraries = {};
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
        this.libraries[libraryName] = library;
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
      this.libraries[libraryName] = library;
    }
  }

  /**
   * @param {string} url
   * @returns {Promise<void>}
   */
  async addLibraryFromUrl(url) {
    let libraryJson = await LibraryUtils.getLibraryJsonFromUrl(url);
    const library = Library.createFromJson(libraryJson);
    if (!library) {
      await this.addLibrary(library);
    } else {
      console.log("library did not created successfully!");
    }
  }

  /**
   * @param {Library} library
   */
  async addLibrary(library) {
    console.log(library);
    if (this.hasSameNameAuthorLibrary(library.info)) {
      this._updateExistingLibrary(library);
    } else if (this.hasSameNameLibrary(library.info)) {
      this._swapExistingLibrary(library);
    } else {
      this.libraries[library.info.name] = library;
    }

    //@TODO: need reference counter for imports
    // for (let libraryKey in library.imports) {
    //   if (library.imports.hasOwnProperty(libraryKey)) {
    //     await this.addLibraryFromUrl(library.imports[libraryKey].url);
    //   }
    // }
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

}
