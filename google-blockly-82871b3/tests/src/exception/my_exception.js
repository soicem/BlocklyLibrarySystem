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

class IllegalArgumentException extends MyException {
  constructor(message) {
    super("IllegalArgumentException", message);
  }
}

class AbstractClassConstructException extends MyException {
  constructor(message) {
    super("AbstractClassConstructException", message);
  }
}

class AbstractMethodCallException extends  MyException {
  constructor(message) {
    super("AbstractMethodCallException", message);
  }
}
