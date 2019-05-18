'use strict';

class MyHexagonGrid {
  constructor(x, y, container) {
    this.x = x;
    this.y = y;
    this.hexagons = [];

    this.container = container;
    this.canvas = this.container.getElementsByTagName('canvas')[0];
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight - 4;

    this.camera = {
      zoom: 1,
      currentOffsetX: 0,
      currentOffsetY: 0,
      panStartX: null,
      panStartY: null,
      panOffsetX: 0,
      panOffsetY: 0,
    };

    this.generateHexagons();

    this.canvas.addEventListener('wheel', (e) => {
      this.zoom(e);
    });

    this.canvas.addEventListener('mousedown', this.startPan);
    this.canvas.addEventListener('mouseleave', this.stopPan);
    this.canvas.addEventListener('mouseup', this.stopPan);
  }

  generateHexagons() {
    for (let rows = 0; this.y > rows; rows++)
      for (let cols = 0; this.x > cols; cols++)
        this.hexagons.push(new MyHexagon(cols, rows));
  }

  get context() {
    return this.container.getElementsByTagName('canvas')[0].getContext("2d");
  }

  drawMap() {
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.scale(this.camera.zoom, this.camera.zoom);
    this.context.translate(this.camera.panOffsetX, this.camera.panOffsetY);

    this.hexagons.forEach(hexagon => {
      this.context.beginPath();
      hexagon.cornersPoints.forEach(point => {
        this.context.lineTo(point[0], point[1]);
      });
      this.context.closePath();

      this.context.strokeStyle = "#CCCCCC";
      this.context.stroke();

      this.context.fillText(`${hexagon.x} x ${hexagon.y}`, hexagon.CenterPoint()[0], hexagon.CenterPoint()[1]);
    });
  }

  zoom(e) {
    if (e.deltaY > 0)
      this.camera.zoom += 0.01;
    else
      this.camera.zoom -= 0.01;

    this.drawMap();
  }

  trackMouse = (e) => {
    let offsetX = e.clientX - this.camera.panStartX;
    let offsetY = e.clientY - this.camera.panStartY;
    this.camera.panOffsetX = this.camera.currentOffsetX + offsetX;
    this.camera.panOffsetY = this.camera.currentOffsetY + offsetY;
  }

  startPan = (e) => {
    this.canvas.addEventListener("mousemove", this.trackMouse);

    this.canvas.addEventListener("mousemove", (e) => {
      this.drawMap();
    });

    this.camera.panStartX = e.clientX;
    this.camera.panStartY = e.clientY;
  }

  stopPan = (e) => {
    this.canvas.removeEventListener("mousemove", this.trackMouse);
    this.canvas.removeEventListener("mousemove", this.drawMap);
    this.camera.panStartX = null;
    this.camera.panStartY = null;
    this.camera.currentOffsetX = this.camera.panOffsetX;
    this.camera.currentOffsetY = this.camera.panOffsetY;
  }
}