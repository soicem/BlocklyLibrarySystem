class LibraryInfo {
  /**
   * Creates LibraryInfo class based from the json
   * @param {{name:string,version:string,url:string,author:string,url:string,created:string,modified:string,hashCode:string}} json
   * @returns {LibraryInfo}
   */
  static createFromJson(json) {
    let libraryInfo = new LibraryInfo(json.name, json.author);
    libraryInfo._version = json.version;
    libraryInfo._url = json.url;
    libraryInfo._created = json.created;
    libraryInfo._modified = json.modified;
    libraryInfo._hashCode = json.hashCode;

    //@TODO: remove this part when hash implementation gets removed
    // if (json.hashCode !== `${libraryInfo._generateHashCode()}`) {
    //   //@TODO: throw exception rather than null + change let to const for libraryInfo
    //   console.error(`Defected JSON of LibraryInfo: ${json.name}`);
    //   libraryInfo = null;
    // }

    return libraryInfo;
  }

  /**
   * @param {string} name
   * @param {string} author
   */
  constructor(name, author = 'unknown') {
    //@TODO: need to throw an exception after checking if name is empty
    this._name = name;
    this._author = author;
    this._version = '0.1';
    this._url = '';
    this._created = new Date().toISOString();
    this._modified = new Date().toISOString();
    this._hashCode = 0;
    this._isHashCodeUpToDate = false;
  }

  /**
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * @param {string} name
   */
  set name(name) {
    this._name = name;

    this.updateModifiedDatetime();
    this.isHashCodeUpToDate = false;
  }

  /**
   * @returns {string}
   */
  get author() {
    return this._author;
  }

  /**
   * @param {string} author
   */
  set author(author) {
    this._author = author;

    this.updateModifiedDatetime();
    this.isHashCodeUpToDate = false;
  }

  /**
   * @returns {string}
   */
  get version() {
    return this._version;
  }

  /**
   * @param {string}version
   */
  set version(version) {
    this._version = version;

    this.updateModifiedDatetime();
    this.isHashCodeUpToDate = false;
  }

  /**
   * @returns {string}
   */
  get url() {
    return this._url;
  }

  /**
   * @param {string} value
   */
  set url(value) {
    this._url = value;

    this.updateModifiedDatetime();
    this.isHashCodeUpToDate = false;
  }

  /**
   * @returns {string}
   */
  get created() {
    return this._created;
  }

  /**
   * @returns {string}
   */
  get modified() {
    return this._modified;
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
   * @returns {string}
   * @private
   */
  _generateHashCode() {
    const tmp = [
      `${this.name}`,
      `${this.author}`,
      `${this.version}`,
      `${this.url}`,
      `${this.created}`,
      `${this.modified}`,
    ];

    return tmp.join('').hashCode();
  }

  /**
   * @returns {string} JSON structure of this library info in a string
   */
  toString() {
    return JSON.stringify(this.toJson());
  }

  /**
   * @returns {{name: string, author: string, version: string, url: string, created: string, modified: string, hashCode: string}}
   */
  toJson() {
    return {
      'name': `${this.name}`,
      'author': `${this.author}`,
      'version': `${this.version}`,
      'url': `${this.url}`,
      'created': `${this.created}`,
      'modified': `${this.modified}`,
      'hashCode': `${this.hashCode}`
    };
  }

  /**
   * Updates hashcode
   */
  updateHashCode() {
    if (!this.isHashCodeUpToDate) {
      this._hashCode = this._generateHashCode();
    }
    this.isHashCodeUpToDate = true;

    // fields that are not modified directly by the users will not modify the modified datetime
  }

  /**
   * Updates modified datetime
   */
  updateModifiedDatetime() {
    this._modified = new Date().toISOString();
    this.isHashCodeUpToDate = false;
  }

  /**
   * @param {LibraryInfo} other
   * @returns {boolean}
   */
  isNewerVersionThan(other) {
    const thisVersion = parseFloat(this.version);
    const otherVersion = parseFloat(other.version);
    return thisVersion > otherVersion;
  }

}
