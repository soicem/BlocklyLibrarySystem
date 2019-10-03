class NameUtil {
  /**
   * get safe function name (by Google Blockly)
   * @param {string} name
   * @returns {string}
   */
  static safeFunctionName(name) {
    if (!name) {
      name = 'unnamed';
    } else {
      name = encodeURI(name.replace(/ /g, '_')).replace(/[^\w]/g, '_');
      if ('0123456789'.indexOf(name[0]) !== -1) {
        name = 'my_' + name;
      }
    }

    return name;
  }
}
