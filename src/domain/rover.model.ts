import { 
  RoverMovementType, 
  RoverOrientation,
  RoverLocation,
  RoverOrientationType, 
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

  redirectOrientation(newOrientation: RoverOrientationType) {
    if (!newOrientation) {
      throw new Error(`A valid orientation value must be passed!`);
    }
    
    const diffOrientations = newOrientation - this.orientation.getValue();    
    let turnTo = diffOrientations > 0 ? 'turnRight' : 'turnLeft';
    let qtdMovs = diffOrientations;

    const invertDirection = Math.abs(diffOrientations) > 2;
    if (invertDirection) {
      qtdMovs = 1;
      turnTo = diffOrientations < 0 ? 'turnRight' : 'turnLeft';
    }
    
    for (let i = 0; i < Math.abs(qtdMovs); i++) {
      this.orientation[turnTo]();
    }
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