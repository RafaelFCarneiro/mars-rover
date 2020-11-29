import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeployRoverCommand } from './commands';

@Injectable()
export class RoverService {
  constructor(private commandBus: CommandBus) {}
  
  async Deploy(
    id: string,
    plateau: string,
    position: string,
  ) {         
    const plateauCoords = plateau
      .split(SplintIdentifier)
      .map(v => parseInt(v));
    
    if (plateauCoords.length < 2) {
      throw new Error("Invalid plateau specifications");
    }
    
    const positionCoords = position.split(SplintIdentifier);
    if (positionCoords.length < 2) {
      throw new Error("Invalid position specifications");
    }
          
    return this.commandBus.execute(new DeployRoverCommand(
      id, 
      { 
        upper: plateauCoords[0], 
        right: plateauCoords[1] 
      }, 
      {
        x: parseInt(positionCoords[0]),
        y: parseInt(positionCoords[1]),
      },
      positionCoords[2]
    ));
  }
}

const SplintIdentifier = " ";

