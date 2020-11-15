import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { DeployRoverCommand } from './commands';

@Injectable()
export class RoverService {
  constructor(private commandBus: CommandBus) {}
  
  async Deploy(
    id: string,
    plateau: { upper: number, right: number },
    position: { x: number, y: number }
  ) {     
    return this.commandBus.execute(
      new DeployRoverCommand(id, plateau, position)
    );
  }

}
