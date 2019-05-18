'use strict';

class MyHexagonGrid {
  constructor(x, y, container) {
    this.x = x;
    this.y = y;
    this.hexagons = [];

    this.GenerateHexagons();
  }

  GenerateHexagons() {
    for (let rows = 0; this.y > rows; rows++)
      for (let cols = 0; this.x > cols; cols++)
        this.hexagons.push(new MyHexagon(cols, rows));
  }
}