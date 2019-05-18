'use strict';

class MyHexagon {
  constructor(x, y) {
    this.size = 146;
    this.width = Math.sqrt(3) * this.size;
    this.height = 2 * this.size

    this.x = x;
    this.y = y;

    this.centerPoint = this.CenterPoint();
    this.cornersPoints = this.CornerPoints();
  }

  CenterPoint() {
    let center_x = this.width * this.x;
    let center_y = (this.height * 0.75) * this.y;

    if (this.y != 0 && this.y % 2 != 0) {
      center_x = center_x + (this.width / 2);
    }
    
    return [center_x, center_y];
  }

  CornerPoints() {
    let cornersPoints = [];
    let angle_deg = 30;

    for (let i = 0; i <= 6; i++) {
      const angle_rad = Math.PI / 180 * angle_deg;
      cornersPoints.push([this.centerPoint[0] + this.size * Math.cos(angle_rad), this.centerPoint[1] + this.size * Math.sin(angle_rad)]);
      angle_deg += 60;
    }

    return cornersPoints;
  }
}