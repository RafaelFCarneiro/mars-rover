import { AggregateRoot } from '@nestjs/cqrs';
import { 
  RoverMovementType, 
  RoverOrientation,
  RoverLocation,
} from './value-objects';

export class Rover extends AggregateRoot {
  private location: RoverLocation;
  private orientation: RoverOrientation;
  
  constructor(public readonly id: string) { 
    super();   
    this.location = null;
    this.orientation = null;
    this.id = id;
    
    if (!this.id || !this.id.trim().length)
      throw new Error(Errors.MustHaveValidId); 
  }
  
  deploy(data?: {
    location?: RoverLocation,
    orientation?: RoverOrientation
  }) {
    this.location = data?.location || new RoverLocation();
    this.orientation = data?.orientation || new RoverOrientation();
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
          throw new Error(Errors.InvalidMovement);
      }
    });
  }
  
  isDeployed() {
    return !!this.location?.getPlateau();
  }
  
  getLocation() {
    return {
      coordinate: this.location.getCoordinate(),
      plateau: this.location.getPlateau(),
    };
  } 

  getOrientation() {
    return this.orientation?.getValue();
  } 

  getPosition(): string {
    if (this.isDeployed()) {
      return `${this.location?.getCoordinate().toString()} ${this.orientation}`;
    }
    return NotDeployed;
  }
}

export const NotDeployed = 'Not Deployed';

export const Errors = {
  MustHaveValidId: 'Rover must have a valid id!',
  InvalidMovement: "Invalid movement!",
}
