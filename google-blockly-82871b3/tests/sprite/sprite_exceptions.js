class MyException {
  constructor(exceptionName, message) {
    this.name = exceptionName;
    this.message = message;
  }

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  toString() {
    return this._name + ": " + this._message;
  }
}

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
