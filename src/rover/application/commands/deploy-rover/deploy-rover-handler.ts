import { RoverOrientationType } from './../../../domain/value-objects/rover-orientation-type.enum';
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { DeployRoverCommand } from "./deploy-rover-command";
import { Coordinate, Plateau, Rover, RoverLocation, RoverOrientation } from "../../../domain";
import { RoverDto } from '../../dtos';
import { DIIdentifiers, IRoverRepository } from '../../Interfaces';

@CommandHandler(DeployRoverCommand)
export class DeployRoverHandler implements ICommandHandler<DeployRoverCommand> {
  constructor(
    @Inject(DIIdentifiers.IRoverRepository) private readonly repo: IRoverRepository 
  ) {}

  async execute(command: DeployRoverCommand) {    
    const { right, upper } =  command.plateau;
    const { x, y } =  command.position;
    
    const orientation = !!command?.orientation 
      ? RoverOrientationType[command?.orientation]
      : RoverOrientationType.N;
x
    const rover = await this.repo.insert(new Rover({
      id: command.id,
      location: new RoverLocation({
        plateau: new Plateau({ right, upper }), 
        coordinate: new Coordinate({ x, y })
      }),
      orientation: new RoverOrientation({ value: orientation })
    }));

    return { ...rover, position: rover.getPosition() } as RoverDto;
  }
}
