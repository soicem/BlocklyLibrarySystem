class SpeechBubble {
  constructor(sprite, message) {
    this.setSprite(sprite);
    this.setMessage(message);
  }

  /////////// Getter & Setter //////////

  getSprite() {
    return this._sprite
  }

  setSprite(sprite) {
    this._sprite = sprite;
  }

  getMessage() {
    return this._message;
  }

  setMessage(message) {
    this._message = message;
  }

  // --- More ---

  ////////// Class Methods //////////

  render() {
    const radius = 5;
    const w = this.getMessage().length * 5 + 10;
    const h = 10 + 5;
    const x = this.getSprite().getX() + this.getSprite().getWidth();
    const y = this.getSprite().getY() - h;
    const r = x + w;
    const b = y + h;
    const context = this.getSprite().getContext();

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
    context.fillText(this.getMessage(), x + 5, y + 10);
  }
}
