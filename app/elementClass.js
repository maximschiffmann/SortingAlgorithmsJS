class Element {
  constructor(xPos, yPos, context, elementHigh, elementWidth) {
    this.context = context;
    this.xPos = xPos;
    this.yPos = yPos;
    this.elementHigh = elementHigh;
    this.elementWidth = elementWidth;
    this.color = this.randomColor();
    this.fillElement = true;
  }

  draw() {
    var my_gradient = this.context.createLinearGradient(0, 0, 0, this.elementHigh + 500);
    my_gradient.addColorStop(0, this.color);
    my_gradient.addColorStop(1, "white");
    this.context.lineWidth = 1;
    if (this.fillElement === true) {
      this.context.fillStyle = my_gradient;
      this.context.fillRect(this.xPos, this.elementHigh, this.elementWidth, 600 - this.elementHigh);
    } else {
      this.context.strokeStyle = my_gradient;
      this.context.strokeRect(this.xPos, this.elementHigh, this.elementWidth, 600 - this.elementHigh);
    }
    this.context.strokeStyle = "black";
    this.context.strokeRect(this.xPos, this.elementHigh, this.elementWidth, 600 - this.elementHigh);
  }

  update() {
    this.draw();
  }

  randomColor() {
    var red = Math.floor((Math.random() * (255 + 1)));
    var green = Math.floor((Math.random() * (255 + 1)));
    var blue = Math.floor((Math.random() * (255 + 1)));
    var color = "rgba(" + red + "," + green + "," + blue + "," + 1 + ")";
    return color;
  }

}