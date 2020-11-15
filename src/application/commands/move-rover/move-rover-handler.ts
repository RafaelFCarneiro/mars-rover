import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RoverDto } from './../../dtos';
import { DIIdentifiers, IRoverRepository } from './../../Interfaces';
import { Coordinate, RoverMovementType, RoverOrientationType } from '../../../domain';
import { MoveRoverCommand } from './move-rover-command';

@CommandHandler(MoveRoverCommand)
export class MoveRoverHandler implements ICommandHandler<MoveRoverCommand> {
  constructor(
    @Inject(DIIdentifiers.IRoverRepository) private readonly repo: IRoverRepository 
  ) {}
    
  async execute(command: MoveRoverCommand) {
    const { position, movements } = command;
    
    const movTypes = movements
      .map(mov => RoverMovementType[mov]);
    
    const rover = (await this.repo.findAll({
      coordinate: new Coordinate(position)
    }) || []).shift();
    
    if (!rover) {
      throw new Error('Could not find a Rover on that position!');
    }

    rover.redirectOrientation(RoverOrientationType[position.orientation]);
    
    rover.move(movTypes);

    return { ...rover, position: rover.getPosition() } as RoverDto;
  }

} 
