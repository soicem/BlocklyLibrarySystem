class SpeechBubble {
  constructor(sprite) {
    this.sprite = sprite;
  }

  get sprite() {
    return this._sprite;
  }

  set sprite(value) {
    this._sprite = value;
  }

  draw(w, h, radius, text) {
    let x = this.sprite.x + this.sprite.width;
    let y = this.sprite.y - h;
    let r = x + w;
    let b = y + h;
    let context = this.sprite.canvas.getContext();

    console.log(context);

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
    context.fillText(text, x + 10, y + 10);
  }
}
