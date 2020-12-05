import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RoverDto } from '../../dtos';
import { DIIdentifiers, IRoverRepository } from '../../Interfaces';
import { MoveRoverByPositionCommand } from './move-rover-by-position.command';
import { 
  Coordinate, 
  RoverMovementType, 
  RoverOrientationType 
} from './../../../domain';

@CommandHandler(MoveRoverByPositionCommand)
export class MoveRoverByPositionHandler implements ICommandHandler<MoveRoverByPositionCommand> {
  constructor(
    @Inject(DIIdentifiers.IRoverRepository) private readonly repo: IRoverRepository 
  ) {}
    
  async execute(command: MoveRoverByPositionCommand) {
    const { position, movements } = command;
    
    let movTypes = movements
      .map(mov => RoverMovementType[mov]);
    
    const rover = (await this.repo.findAll({
      coordinate: new Coordinate(position)
    }) || []).shift();
    
    if (!rover) {
      throw new Error('Could not find a Rover on that position!');
    }

    const sendedOrientation = RoverOrientationType[position.orientation];
    if (rover.getOrientation() !== sendedOrientation) {
      movTypes = this.getOrientationChangeMovements({
        initial: rover.getOrientation(),
        final: sendedOrientation
      }).concat(movTypes);
    }
    
    rover.move(movTypes);

    const updatedRover = await this.repo.update(rover);

    return { 
      ...updatedRover,
      location: rover.getLocation(),
      position: rover.getPosition(),
      orientation: rover.getOrientation().toString(),
    } as RoverDto;
  }

  private getOrientationChangeMovements(orientations: {
    initial: RoverOrientationType, 
    final: RoverOrientationType
  }) : Array<RoverMovementType> {
    const movements: RoverMovementType[] = [];
    const { initial, final } = orientations;
    
    if (!initial) {
      throw new Error(`A valid initial orientation must be passed!`);
    }    
    
    if (!final) {
      throw new Error(`A valid final orientation must be passed!`);
    }

    const orientationsDiff = final - initial;
    let moveTo = orientationsDiff > 0 ? RoverMovementType.R : RoverMovementType.L;
    let qtdMovs = orientationsDiff;

    const invertDirection = Math.abs(orientationsDiff) > 2;
    if (invertDirection) {
      qtdMovs = 1;
      moveTo = orientationsDiff < 0 ? RoverMovementType.R : RoverMovementType.L;
    }
    
    for (let i = 0; i < Math.abs(qtdMovs); i++) {
      movements.push(moveTo);
    }

    return movements;
  }
} 
