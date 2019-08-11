class CanvasUtil {
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
