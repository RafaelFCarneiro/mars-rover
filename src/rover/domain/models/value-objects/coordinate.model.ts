export class Coordinate {
  public readonly x: number;
  public readonly y: number;

  constructor(data?: {
    x?: number;
    y?: number;
  }
  ) {
    this.x = data?.x || 0;
    this.y = data?.y || 0;
  }
  
  toString() {
    return `${this.x} ${this.y}`;
  }
}