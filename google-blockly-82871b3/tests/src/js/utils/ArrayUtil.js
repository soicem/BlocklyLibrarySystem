class ArrayUtil {
  /**
   * @param {Array} array1
   * @param {Array} array2
   * @returns {boolean}
   */
  static equal(array1, array2) {
    if (array1 === array2) return true;
    if (array1 == null || array2 == null) return false;
    if (array1.length !== array2.length) return false;

    array1.every((val) => {
      return array2.includes(val);
    });

    return true;
  }
}
