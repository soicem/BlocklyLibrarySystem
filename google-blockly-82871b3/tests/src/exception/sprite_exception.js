
class ExistingSpriteException extends MyException {
  constructor(message) {
    super("ExistingSpriteException", message);
  }
}

class NotExistingSpriteException extends MyException {
  constructor(message) {
    super("NotExistingSpriteException", message);
  }
}
