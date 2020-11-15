import { 
  RoverMovementType, 
  RoverOrientation,
  RoverLocation, 
} from './value-objects';

export class Rover {
  private readonly id: string;
  private location: RoverLocation;
  private orientation: RoverOrientation;
  
  constructor(data: {
    id: string,
    location?: RoverLocation,
    orientation?: RoverOrientation,
  }) {    
    this.id = data.id;
    this.location = data.location || new RoverLocation();
    this.orientation = data.orientation || new RoverOrientation();
  }

  getId() {
    return this.id;
  }

  move(movement: RoverMovementType | RoverMovementType[]) {
    const movements = Array.isArray(movement) ? movement : [ movement ] ;    
    movements.forEach(mov => {
      switch (mov) {
        case RoverMovementType.R:
          this.orientation.turnRight();
          break;
        case RoverMovementType.L:
          this.orientation.turnLeft();
          break;
        case RoverMovementType.M:
          this.location.moveTo(this.orientation.getValue());
          break;          
        default:
          throw new Error("Invalid movement!");
      }
    });
  }
  
  getPosition(): string {
    return `${this.location.getCoordinate().toString()} ${this.orientation}`;
  }
}