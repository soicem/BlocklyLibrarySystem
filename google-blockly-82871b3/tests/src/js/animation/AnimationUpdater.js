class AnimationUpdater {
  /**
   */
  constructor() {
    this._callFunctions = {};
  }

  ////////// Getter & Setter ///////////

  /**
   * @returns {boolean}
   */
  get running() {
    return this._running;
  }

  /**
   * @param {boolean} running
   */
  set running(running) {
    this._running = running;
  }

  /**
   * @returns {Object<string, {caller:string,method:*}>}
   */
  get callFunctions() {
    return this._callFunctions;
  }

  // --- More ---

  ////////// Class Functions //////////

  /**
   * @param {{caller:string,method:*}} funcInfo
   */
  addCallFunction(funcInfo) {
    this.callFunctions[funcInfo.method.name] = funcInfo;
  }

  /**
   * @param {*} func
   */
  removeCallFunction(func) {
    delete this.callFunctions[func.name];
  }

  /**
   */
  update() {
    const callFunctions = this.callFunctions;
    for (let k in callFunctions) {
      if (callFunctions.hasOwnProperty(k)) {
        (callFunctions[k].method).bind(callFunctions[k].caller)();
      }
    }

    if (this.running) {
      window.requestAnimationFrame((this.update).bind(this));
    }
  }

  /**
   */
  start() {
    this.running = true;
    window.requestAnimationFrame((this.update).bind(this));
  }

  /**
   */
  stop() {
    this.running = false;
  }
}
