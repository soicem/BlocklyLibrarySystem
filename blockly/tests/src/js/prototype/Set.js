/**
 * @param {Set} set
 */
Set.prototype.includes = function(set) {
  let included = true;

  for (const setElement of set) {
    if (!this.has(setElement)) {
      included = false;
      break;
    }
  }

  return included;
};
