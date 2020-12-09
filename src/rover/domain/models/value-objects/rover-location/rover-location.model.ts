import { Plateau } from '../plateau';
import { Coordinate } from '../coordinate.model';
import { RoverOrientationType } from '../rover-orientation-type.enum';

export class RoverLocation {
  public readonly plateauId: string;
  private readonly plateau: Plateau;
  private coordinate: Coordinate;

  constructor(data?: {
    plateauId: string,
    plateau?: Plateau,
    coordinate?: Coordinate
  }) {
    this.plateauId = data.plateauId;
    this.plateau = data?.plateau || new Plateau();
    this.coordinate = data?.coordinate || new Coordinate();
  }

  getCoordinate() {
    return this.coordinate;
  }
  
  getPlateau() {
    return this.plateau;
  }


  moveTo(orientationType: RoverOrientationType) {
    const xCoord = this.coordinate.x;
    const yCoord = this.coordinate.y;

    const mapXValue = {
      [RoverOrientationType.E]: xCoord + 1,
      [RoverOrientationType.W]: xCoord - 1,
    }
    const mapYValue = {
      [RoverOrientationType.N]: yCoord + 1,
      [RoverOrientationType.S]: yCoord - 1,
    }

    const x = mapXValue[orientationType] !== undefined
      ? mapXValue[orientationType]
      : xCoord;
    const y = mapYValue[orientationType] !== undefined 
      ? mapYValue[orientationType]
      : yCoord
    
    const newCoord = new Coordinate({ x, y });
    if (this.plateau.boundariesOverpassed(newCoord)) {
      throw new Error("Cannot move to outside of the plateau.");
    }
    
    this.coordinate = newCoord;
  }      
}
