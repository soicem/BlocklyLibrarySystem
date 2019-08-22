class AnimationUpdater {
  constructor() {
    this._callFunctions = {};
  }

  ////////// Getter & Setter ///////////

  isRunning() {
    return this._running;
  }

  setRunning(state) {
    this._running = state;
  }

  getCallFunctions() {
    return this._callFunctions;
  }

  // --- More ---

  ////////// Class Functions //////////

  addCallFunction(funcInfo) {
    this.getCallFunctions()[funcInfo.method.name] = funcInfo;
  }

  removeCallFunction(func) {
    delete this.getCallFunctions()[func.name];
  }

  update() {
    const callFunctions = this.getCallFunctions();
    for (let k in callFunctions) {
      if (callFunctions.hasOwnProperty(k)) {
        (callFunctions[k].method).bind(callFunctions[k].caller)();
      }
    }

    if (this.isRunning()) {
      window.requestAnimationFrame((this.update).bind(this));
    }
  }

  start() {
    this.setRunning(true);
    window.requestAnimationFrame((this.update).bind(this));
  }

  stop() {
    this.setRunning(false);
  }
}
