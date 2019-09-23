class SpriteException extends MyException {
  /**
   * @param {string} message
   * @param {string} exceptionName
   */
  constructor(message, exceptionName = "SpriteException") {
    super(exceptionName, message);
  }
}

class ExistingSpriteException extends SpriteException {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message, "ExistingSpriteException");
  }
}

class NotExistingSpriteException extends SpriteException {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message, "NotExistingSpriteException");
  }
}
