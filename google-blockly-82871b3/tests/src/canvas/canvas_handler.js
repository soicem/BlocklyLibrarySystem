class CanvasHandler {
  constructor(canvas) {
    this.setCanvasObject(canvas);
    this.setSelectedSpriteInfo(null);
    this.initialize();
  }

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
      const canvasBound = this.getCanvasObj().getCanvas().getBoundingClientRect();
      const canvasX = canvasBound.left;
      const canvasY = canvasBound.top;
      this.setMousePosition(new Point(mouseX - canvasX, mouseY - canvasY));
    }
  }

  defineSelectSpriteCallback() {
    this._callbackFunctions["selectSprite"] = (event) => {
      if (this.getSelectedSpriteInfo() !== null) {
        return;
      }

      const sprite = this.getCanvasObj().getSpriteAtPosition(
          this.getMousePosition());

      if (sprite === null) {
        this.setSelectedSpriteInfo(null);
        this.stopSelectedSpriteMove();
      } else {
        this.setSelectedSpriteInfo({
          sprite: sprite,
          mouseOffset: this.getMousePosition().getOffsetTo(sprite.getPosition())
        });

        // Make selected sprite a selected sprite all over the project
        this.getCanvasObj().setCurrentSprite(sprite.getImageFilename());

        // Move selected sprite to the top
        if (sprite !== this.getCanvasObj().getSpritesOrder()[0]) {
          this.getCanvasObj().moveSpriteToTop(sprite);
          this.startSelectedSpriteMove();
        }
      }
    }
  }

  defineSelectedSpriteMoveCallback() {
    this._callbackFunctions["selectedSpriteMove"] = (event) => {
      if (this.getSelectedSpriteInfo() !== null) {
        const selectedSprite = this.getSelectedSpriteInfo().sprite;
        const offset = this.getSelectedSpriteInfo().mouseOffset;

        selectedSprite.setPosition(
            this.getMousePosition().offset(offset).clone());
        document.getElementById(
            'sprite_X').value = this.getCanvasObj().getCurrentSprite().getX();
        document.getElementById(
            'sprite_Y').value = this.getCanvasObj().getCurrentSprite().getY();
        document.getElementById(
            'sprite_H').value = this.getCanvasObj().getCurrentSprite().getHeight();
        document.getElementById(
            'sprite_W').value = this.getCanvasObj().getCurrentSprite().getWidth();
      }
    }
  }

  defineDeselectSpriteCallback() {
    this._callbackFunctions["deselectSprite"] = (event) => {
      this.setSelectedSpriteInfo(null);
      this.stopSelectedSpriteMove();
    }
  }

  ////////// Getter & Setter ///////////

  getCanvasObj() {
    return this._canvas;
  }

  setCanvasObject(canvas) {
    this._canvas = canvas;
  }

  getCallbackFunctions() {
    return this._callbackFunctions;
  }

  getMousePosition() {
    return this._mousePosition;
  }

  setMousePosition(position) {
    this._mousePosition = position;
  }

  setSelectedSpriteInfo(sprite) {
    this._selectedSprite = sprite;
  }

  getSelectedSpriteInfo() {
    return this._selectedSprite;
  }

  // --- More ---

  ////////// Class Methods ///////////

  startTrackMousePosition() {
    this.getCanvasObj().getCanvas().addEventListener("mousemove",
        this.getCallbackFunctions().trackMousePosition);
  }

  stopTrackMousePosition() {
    this.getCanvasObj().getCanvas().removeEventListener("mousemove",
        this.getCallbackFunctions().trackMousePosition);
  }

  startSelectSprite() {
    this.getCanvasObj().getCanvas().addEventListener("mousedown",
        this.getCallbackFunctions().selectSprite);
    this.getCanvasObj().getCanvas().addEventListener("mouseup",
        this.getCallbackFunctions().deselectSprite);
  }

  stopSelectSprite() {
    this.getCanvasObj().getCanvas().removeEventListener("mousedown",
        this.getCallbackFunctions().selectSprite);
    this.getCanvasObj().getCanvas().removeEventListener("mouseup",
        this.getCallbackFunctions().deselectSprite);
  }

  startSelectedSpriteMove() {
    this.getCanvasObj().getCanvas().addEventListener("mousemove",
        this.getCallbackFunctions().selectedSpriteMove);
  }

  stopSelectedSpriteMove() {
    this.getCanvasObj().getCanvas().removeEventListener("mousemove",
        this.getCallbackFunctions().selectedSpriteMove);
  }
}
