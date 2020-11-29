import { Coordinate } from "../coordinate.model";

export class Plateau {
  public readonly maxCoordinate: Coordinate;
  public readonly minCoordinate: Coordinate;

  constructor(data?: {
    right: number,
    upper: number, 
  }) {
    this.maxCoordinate = new Coordinate({
      x: data?.right,
      y: data?.upper,
    });
    this.minCoordinate = new Coordinate();
  }

  boundariesOverpassed(newCoord: Coordinate) {
    const newX = newCoord.x;
    const newY = newCoord.y;

    if (newX > this.maxCoordinate.x 
        || newX < this.minCoordinate.x) {
      return true;
    }

    if (newY > this.maxCoordinate.y 
        || newY < this.minCoordinate.y) {
      return true;
    }

    return false;
  }
}