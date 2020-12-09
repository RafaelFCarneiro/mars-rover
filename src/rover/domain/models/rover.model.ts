import { Coordinate } from './value-objects/coordinate.model';
import { RoverMovedEvent } from './../events/rover-moved.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { 
  RoverDeployedEvent,
  RoverStatusChangedToDeployed, 
  RoverStatusChangedToInDeployProcess 
} from '../events';
import { 
  RoverMovementType, 
  RoverOrientation,
  RoverLocation,
  RoverStatusType,
} from './value-objects';

export class Rover extends AggregateRoot {
  private location: RoverLocation;
  private orientation: RoverOrientation;
  private status: RoverStatusType;
  
  constructor(public readonly id: string) { 
    super();       
    this.location = null;
    this.orientation = null;
    this.status = RoverStatusType.NotDeployed;
    
    this.id = id;
    if (!this.id || !this.id.trim().length) {
      throw new Error(Errors.MustHaveValidId); 
    }
  }


  deploy(data?: {
    location: RoverLocation,
    orientation?: RoverOrientation
  }) {
    this.location = data.location;
    this.orientation = data.orientation ?? new RoverOrientation();

    this.setStatus(RoverStatusType.Deployed);
    
    this.apply(new RoverDeployedEvent(
      this.id, 
      this.location.plateauId,
      this.location.getCoordinate(),
      this.orientation.getValue().toString()
    ));
  }
  
  setStatus(status: RoverStatusType) {
    this.status = status;
    switch (status) {
      case RoverStatusType.InDeployProcess:
        this.apply(new RoverStatusChangedToInDeployProcess(this.id));
        break;
      case RoverStatusType.Deployed:
        this.apply(new RoverStatusChangedToDeployed(this.id));
        break;  
      default:
        break;
    }
  }

  getStatus() {
    return this.status;
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
    
    const { x, y } = this.location.getCoordinate();    
    this.apply(new RoverMovedEvent(this.id, 'teste', { x, y }));
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
