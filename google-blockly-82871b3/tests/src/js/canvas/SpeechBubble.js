class SpeechBubble {
  /**
   * @param {Sprite} sprite
   * @param {string} message
   */
  constructor(sprite, message) {
    this.sprite = sprite;
    this.message = message;
  }

  /////////// Getter & Setter //////////

  /**
   * @returns {Sprite}
   */
  get sprite() {
    return this._sprite
  }

  /**
   * @param {Sprite} sprite
   */
  set sprite(sprite) {
    this._sprite = sprite;
  }

  /**
   * @returns {string}
   */
  get message() {
    return this._message;
  }

  /**
   * @param {string} message
   */
  set message(message) {
    this._message = message;
  }

  // --- More ---

  ////////// Class Methods //////////

  /**
   * Displays speech bubble according to it's sprite
   */
  render() {
    const radius = 5;
    const w = this.message.length * 5 + 10;
    const h = 10 + 5;
    const x = this.sprite.getX() + this.sprite.width;
    const y = this.sprite.getY() - h;
    const r = x + w;
    const b = y + h;
    const context = this.sprite.getContext();

    context.beginPath();
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.lineWidth = "1";
    context.moveTo(x + radius, y);

    context.lineTo(r - radius, y);
    context.quadraticCurveTo(r, y, r, y + radius);
    context.lineTo(r, y + h - radius);
    context.quadraticCurveTo(r, b, r - radius, b);
    context.lineTo(x + radius, b);
    context.quadraticCurveTo(x, b, x, b - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.fill();
    context.stroke();
    context.fillStyle = "#000";
    context.fillText(this.message, x + 5, y + 10);
  }
}
