import { Injectable } from '@nestjs/common';
import { RoverDeployStartedEvent } from '../../events';
import { Coordinate, Plateau, Rover, RoverLocation, RoverOrientation, RoverStatusType } from '../../models';

@Injectable()
export class RoverDeployService {
  
  start(data: {
    rover: Rover,
    plateauId: string,
    coordinate: Coordinate,
    orientation?: RoverOrientation
  }) {
    const { rover, plateauId, coordinate, orientation } = data;    
    
    if (rover.isDeployed()) {
      throw new Error(RoverDeployServiceErrors.RoverAlreadyDeployed);
    }
    
    rover.setStatus(RoverStatusType.InDeployProcess);    
    
    rover.apply(new RoverDeployStartedEvent(
      rover.id, plateauId, coordinate, orientation?.getValue()?.toString()
    ));

    return rover;
  }

  finalize(data: {
    rover: Rover,
    plateauId: string,
    coordinate: Coordinate,
    orientation?: RoverOrientation
  }) {
    const { rover, plateauId, coordinate, orientation } = data;    

    rover.deploy({
      location: new RoverLocation({ 
        plateauId, coordinate
      }),
      orientation: orientation ?? new RoverOrientation()
    });    

    return rover;
  }

  reject(data: {
    rover: Rover,
  }) {
    const { rover } = data;
    rover.setStatus(RoverStatusType.NotDeployed);
    return rover;
  }
}

export const RoverDeployServiceErrors = {
  RoverAlreadyDeployed: 'Rover is already deployed.',
}