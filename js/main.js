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

const oHexGrid = new MyHexagonGrid(10, 10, document.getElementById('grid-container'));

oHexGrid.drawMap();