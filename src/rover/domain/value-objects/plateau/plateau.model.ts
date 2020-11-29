import { Coordinate } from "../coordinate.model";

export class Plateau {
  private readonly maxCoordinate: Coordinate;
  private readonly minCoordinate: Coordinate;

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
    const newX = newCoord.getX();
    const newY = newCoord.getY();

    if (newX > this.maxCoordinate.getX() 
        || newX < this.minCoordinate.getX()) {
      return true;
    }

    if (newY > this.maxCoordinate.getY() 
        || newY < this.minCoordinate.getY()) {
      return true;
    }

    return false;
  }
}