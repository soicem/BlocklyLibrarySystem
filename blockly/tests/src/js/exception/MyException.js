class MyException {
  /**
   * @param {string} exceptionName
   * @param {string} message
   */
  constructor(exceptionName, message) {
    this.name = exceptionName;
    this.message = message;
  }

  /**
   * @returns {string}
   */
  get message() {
    return this._message;
  }

  /**
   * @param {string} message
   */
  set message(message) {
    this._message = message;
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
  }

  /**
   * Returns exception in a string format
   * @returns {string}
   */
  toString() {
    return this._name + ": " + this._message;
  }
}


class IllegalArgumentException extends MyException {
  /**
   * @param {string} message
   */
  constructor(message) {
    super("IllegalArgumentException", message);
  }
}


class AbstractClassConstructException extends MyException {
  /**
   * @param {string} message
   */
  constructor(message) {
    super("AbstractClassConstructException", message);
  }
}


class AbstractMethodCallException extends  MyException {
  /**
   * @param {string} message
   */
  constructor(message) {
    super("AbstractMethodCallException", message);
  }
}
