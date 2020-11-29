export class Coordinate {
  private readonly x;
  private readonly y;

  constructor(data?: {
    x?: number;
    y?: number;
  }
  ) {
    this.x = data?.x || 0;
    this.y = data?.y || 0;
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }
  
  toString() {
    return `${this.x} ${this.y}`;
  }
}