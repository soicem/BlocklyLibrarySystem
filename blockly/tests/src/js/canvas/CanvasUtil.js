class CanvasUtil {
  /**
   * @param {Canvas} canvas
   * @param {Sprite} baseSprite
   * @param {{r:number,g:number,b:number}} baseRgb
   * @param {{r:number,g:number,b:number}} lookupRgb
   * @returns {boolean}
   */
  static isColorOverlayingColor(canvas, baseSprite, baseRgb, lookupRgb) {
    let isOverlaying = false;

    const baseWidth = baseSprite.width;
    const baseHeight = baseSprite.height;
    let tempCanvas = document.createElement('canvas');
    let tempContext = tempCanvas.getContext('2d');
    tempCanvas.width = baseWidth;
    tempCanvas.height = baseHeight;
    const pixels = baseSprite.getPixelsOfRgb(baseRgb);

    for (let layer = 0;
        layer < canvas.spritesOrder.length && !isOverlaying; layer++) {
      const currentSprite = canvas.spritesOrder[layer];

      if (currentSprite === null) {
        continue;
      }

      const currentX = currentSprite.x;
      const currentY = currentSprite.y;
      const currentWidth = currentSprite.width;
      const currentHeight = currentSprite.height;

      if (currentSprite === baseSprite) {
        if (layer !== 0 && layer !== canvas.spritesOrder.length - 1) {
          let data = tempContext.getImageData(0, 0, baseWidth, baseHeight).data;
          isOverlaying = this._isPixelsOverlayingRgb(data, baseSprite.size,
              pixels, lookupRgb);
        }
      } else {
        const baseX = baseSprite.x;
        const baseY = baseSprite.y;

        tempContext.drawImage(currentSprite.image, currentX - baseX,
            currentY - baseY, currentWidth, currentHeight);
      }
    }

    let data = tempContext.getImageData(0, 0, baseWidth, baseHeight).data;
    if (!isOverlaying) {
      isOverlaying = this._isPixelsOverlayingRgb(data, baseSprite.size,
          pixels, lookupRgb);
    }

    return isOverlaying;
  }

  /**
   * @param {Canvas} canvas
   * @param {Sprite} baseSprite
   * @param {{r:number,g:number,b:number}} lookupRgb
   * @returns {boolean}
   */
  static isOverlayingColor(canvas, baseSprite, lookupRgb) {
    return this.isColorOverlayingColor(canvas, baseSprite, null, lookupRgb);
  }

  /**
   * @param {number[]} data
   * @param {Size} size
   * @param {Point[]} pixels
   * @param {{r:number,g:number,b:number}} rgb
   * @returns {boolean}
   * @private
   */
  static _isPixelsOverlayingRgb(data, size, pixels, rgb) {
    let isOverlaying = false;

    for (let i = 0; i < pixels.length; i++) {
      const index = (pixels[i].y * size.width + pixels[i].x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];

      if (a === 0) {
        continue;
      }

      if (r === rgb.r && g === rgb.g && b === rgb.b) {
        isOverlaying = true;
        break;
      }
    }

    return isOverlaying;
  }

  /**
   * @param {Canvas} canvas
   * @param {Sprite} sprite1
   * @param {Sprite} sprite2
   * @returns {boolean}
   */
  static isSpriteTouchingSprite(canvas, sprite1, sprite2) {
    let isTouching = false;
    const pixelData1 = sprite1.pixelData;
    const pixelData2 = sprite2.pixelData;
    const position1 = sprite1.position;
    const position2 = sprite2.position;

    let i = 0, j = 0;
    while (i < pixelData1.length && j < pixelData2.length && !isTouching) {
      const point1 = {x: pixelData1[i].x + position1.x, y: pixelData1[i].y + position1.y};
      const point2 = {x: pixelData2[j].x + position2.x, y: pixelData2[j].y + position2.y};

      if (this.lessThan(point1, point2)) {
        i++;
      } else if (this.greaterThan(point1, point2)) {
        j++;
      } else {
        isTouching = true;
      }
    }

    return isTouching;
  }

  static lessThan(point1, point2) {
    return (point1.y === point2.y && point1.x < point2.x) || point1.y < point2.y;
  }

  static greaterThan(point1, point2) {
    return (point1.y === point2.y && point1.x > point2.x) || point1.y > point2.y;
  }
}
