'use strict';

let oCamera = {
  zoom: 1,
  currentOffsetX: 0,
  currentOffsetY: 0,
  panStartX: null,
  panStartY: null,
  panOffsetX: 0,
  panOffsetY: 0,
};

const mapContainer = document.getElementById('grid-container');
const oCanvas = mapContainer.getElementsByTagName('canvas')[0];
const oContext = oCanvas.getContext("2d");

oCanvas.width = mapContainer.offsetWidth;
oCanvas.height = mapContainer.offsetHeight - 4;

const oHexGrid = new MyHexagonGrid(10, 10, mapContainer);

const draw = () => {
  oContext.setTransform(1, 0, 0, 1, 0, 0);
  oContext.clearRect(0, 0, oCanvas.width, oCanvas.height);
  oContext.scale(oCamera.zoom, oCamera.zoom);
  oContext.translate(oCamera.panOffsetX, oCamera.panOffsetY);

  oHexGrid.hexagons.forEach(hexagon => {
    oContext.beginPath();
    hexagon.cornersPoints.forEach(point => {
      oContext.lineTo(point[0], point[1]);
    });
    oContext.fillText(`${hexagon.x} x ${hexagon.y}`, hexagon.CenterPoint()[0], hexagon.CenterPoint()[1]);
    oContext.closePath();

    // Style
    oContext.strokeStyle = "#CCCCCC";
    oContext.stroke();
  });
}

const trackMouse = (e) => {
  var offsetX = e.clientX - oCamera.panStartX;
  var offsetY = e.clientY - oCamera.panStartY;
  oCamera.panOffsetX = oCamera.currentOffsetX + offsetX;
  oCamera.panOffsetY = oCamera.currentOffsetY + offsetY;
}

const startPan = (e) => {
  oCanvas.addEventListener("mousemove", trackMouse);
  oCanvas.addEventListener("mousemove", draw);
  oCamera.panStartX = e.clientX;
  oCamera.panStartY = e.clientY;
}

const endPan = (e) => {
  oCanvas.removeEventListener("mousemove", trackMouse);
  oCamera.panStartX = null;
  oCamera.panStartY = null;
  oCamera.currentOffsetX = oCamera.panOffsetX;
  oCamera.currentOffsetY = oCamera.panOffsetY;
}

const zoom = (e) => {
  const sensitivity = 0.01;

  if (e.deltaY > 0)
    oCamera.zoom += sensitivity;
  else
    oCamera.zoom -= sensitivity;

    draw();
}

oCanvas.addEventListener("mousedown", startPan);
oCanvas.addEventListener("mouseleave", endPan);
oCanvas.addEventListener("mouseup", endPan);
oCanvas.addEventListener('wheel', zoom);

draw();