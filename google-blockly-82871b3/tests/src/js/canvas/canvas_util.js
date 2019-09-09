class CanvasUtil {

  static isColorOverlayingColor(canvas, baseSprite, baseRgb, lookupRgb) {
    let isOverlaying = false;

    const baseWidth = baseSprite.getWidth();
    const baseHeight = baseSprite.getHeight();
    let tempCanvas = document.createElement('canvas');
    let tempContext = tempCanvas.getContext('2d');
    tempCanvas.width = baseWidth;
    tempCanvas.height = baseHeight;
    const pixels = baseSprite.getPixelsOfRgb(baseRgb);

    for (let layer = 0;
        layer < canvas.getSpritesOrder().length && !isOverlaying; layer++) {
      const currentSprite = canvas.getSpritesOrder()[layer];

      if (currentSprite === null) {
        continue;
      }

      const currentX = currentSprite.getX();
      const currentY = currentSprite.getY();
      const currentWidth = currentSprite.getWidth();
      const currentHeight = currentSprite.getHeight();

      if (currentSprite === baseSprite) {
        if (layer !== 0 && layer !== canvas.getSpritesOrder().length - 1) {
          let data = tempContext.getImageData(0, 0, baseWidth, baseHeight).data;
          isOverlaying = this._isPixelsOverlayingRgb(data, baseSprite.getSize(),
              pixels, lookupRgb);
        }
      } else {
        const baseX = baseSprite.getX();
        const baseY = baseSprite.getY();

        tempContext.drawImage(currentSprite.getImage(), currentX - baseX,
            currentY - baseY, currentWidth, currentHeight);
      }
    }

    let data = tempContext.getImageData(0, 0, baseWidth, baseHeight).data;
    if (!isOverlaying) {
      isOverlaying = this._isPixelsOverlayingRgb(data, baseSprite.getSize(),
          pixels, lookupRgb);
    }

    return isOverlaying;
  }

  static isOverlayingColor(canvas, baseSprite, lookupRgb) {
    return this.isColorOverlayingColor(canvas, baseSprite, null, lookupRgb);
  }

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

  static isSpriteTouchingSprite(canvas, sprite1, sprite2) {
    let isTouching = false;
    let points1 = sprite1.getPixelsOfAnyColor(true);
    let points2 = sprite2.getPixelsOfAnyColor(true);

    let i = 0, j = 0;
    while (i < points1.length && j < points2.length && !isTouching) {
      const point1 = points1[i];
      const point2 = points2[j];

      if (point1.lessThan(point2)) {
        i++;
      } else if (point1.greaterThan(point2)) {
        j++;
      } else {
        isTouching = true;
      }
    }

    return isTouching;
  }

}
