class CanvasHandler {
  /**
   * @param {Canvas} canvas
   */
  constructor(canvas) {
    this.canvasObject = canvas;
    this.selectedSpriteInfo = null;
    this.initialize();
  }

  /**
   * Initializes
   */
  initialize() {
    this._callbackFunctions = {};
    this.defineTrackMousePositionCallback();
    this.defineSelectSpriteCallback();
    this.defineSelectedSpriteMoveCallback();
    this.defineDeselectSpriteCallback();
  }

  defineTrackMousePositionCallback() {
    this._callbackFunctions["trackMousePosition"] = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const canvasBound = this.canvasObject.canvas.getBoundingClientRect();
      const canvasX = canvasBound.left;
      const canvasY = canvasBound.top;
      //console.log("mouse : ", mouseX, mouseY, "canvas", canvasX, canvasY);

      this.mousePosition = new Point(mouseX - canvasX, mouseY - canvasY);
    }
  }

  defineSelectSpriteCallback() {
    this._callbackFunctions["selectSprite"] = (event) => {
      if (this.selectedSpriteInfo !== null) {
        return;
      }

      const sprite = this.canvasObject.getSpriteAtPosition(
          this.mousePosition);

      if (sprite === null) {
        this.selectedSpriteInfo = null;
        this.stopSelectedSpriteMove();
      } else {
        this.selectedSpriteInfo = {
          sprite: sprite,
          mouseOffset: this.mousePosition.getOffsetTo(sprite.position)
        };

        // Make selected sprite a selected sprite all over the project
        if(sprite.isClone[0]){
          this.canvasObject.setCurrentSprite(sprite.isClone[1]);
        } else {
          this.canvasObject.setCurrentSprite(sprite.name); // 이름을 가져오는걸로 변경

        }

        // Move selected sprite to the top
        if (sprite !== this.canvasObject.spritesOrder[0]) {
          this.canvasObject.moveSpriteToTop(sprite);
          this.startSelectedSpriteMove();
        }
      }
    }
  }

  defineSelectedSpriteMoveCallback() {
    this._callbackFunctions["selectedSpriteMove"] = (event) => {
      if (this.selectedSpriteInfo !== null) {
        const selectedSprite = this.selectedSpriteInfo.sprite;
        const offset = this.selectedSpriteInfo.mouseOffset;

        selectedSprite.position = this.mousePosition.offset(offset).clone();
        document.getElementById(
            'sprite_X').value = this.canvasObject.getCurrentSprite().x;
        document.getElementById(
            'sprite_Y').value = this.canvasObject.getCurrentSprite().y;
        document.getElementById(
            'sprite_H').value = this.canvasObject.getCurrentSprite().height;
        document.getElementById(
            'sprite_W').value = this.canvasObject.getCurrentSprite().width;
      }
    }
  }

  defineDeselectSpriteCallback() {
    this._callbackFunctions["deselectSprite"] = (event) => {
      this.selectedSpriteInfo = null;
      this.stopSelectedSpriteMove();
    }
  }

  ////////// Getter & Setter ///////////

  /**
   * @returns {Canvas}
   */
  get canvasObject() {
    return this._canvas;
  }

  /**
   * @param {Canvas} canvas
   */
  set canvasObject(canvas) {
    this._canvas = canvas;
  }

  /**
   * @returns {Object<string,*>}
   */
  get callbackFunctions() {
    return this._callbackFunctions;
  }

  /**
   * @returns {Point}
   */
  get mousePosition() {
    return this._mousePosition;
  }

  /**
   * @param {Point} position
   */
  set mousePosition(position) {
    this._mousePosition = position;
  }

  /**
   * @param {Sprite} sprite
   */
  set selectedSpriteInfo(sprite) {
    this._selectedSprite = sprite;
  }

  /**
   * @returns {Sprite}
   */
  get selectedSpriteInfo() {
    return this._selectedSprite;
  }

  // --- More ---

  ////////// Class Methods ///////////

  startTrackMousePosition() {
    this.canvasObject.canvas.addEventListener("mousemove",
        this.callbackFunctions.trackMousePosition);
  }

  stopTrackMousePosition() {
    this.canvasObject.canvas.removeEventListener("mousemove",
        this.callbackFunctions.trackMousePosition);
  }

  startSelectSprite() {
    this.canvasObject.canvas.addEventListener("mousedown",
        this.callbackFunctions.selectSprite);
    this.canvasObject.canvas.addEventListener("mouseup",
        this.callbackFunctions.deselectSprite);
  }

  stopSelectSprite() {
    this.canvasObject.canvas.removeEventListener("mousedown",
        this.callbackFunctions.selectSprite);
    this.canvasObject.canvas.removeEventListener("mouseup",
        this.callbackFunctions.deselectSprite);
  }

  startSelectedSpriteMove() {
    this.canvasObject.canvas.addEventListener("mousemove",
        this.callbackFunctions.selectedSpriteMove);
  }

  stopSelectedSpriteMove() {
    this.canvasObject.canvas.removeEventListener("mousemove",
        this.callbackFunctions.selectedSpriteMove);
  }
}
