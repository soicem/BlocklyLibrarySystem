/**
 * @returns {string}
 */
String.prototype.hashCode = function() {
  return Encryption.SHA256(this);
};
