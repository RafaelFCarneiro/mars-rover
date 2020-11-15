import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { DeployRoverCommand } from "./deploy-rover-command";
import { Coordinate, Plateau, Rover, RoverLocation } from "../../../domain";
import { RoverDto } from './../../dtos';
import { DIIdentifiers, IRoverRepository } from './../../Interfaces';

@CommandHandler(DeployRoverCommand)
export class DeployRoverHandler implements ICommandHandler<DeployRoverCommand> {
  constructor(
    @Inject(DIIdentifiers.IRoverRepository) private readonly repo: IRoverRepository 
  ) {}

  async execute(command: DeployRoverCommand) {    
    const { right, upper } =  command.plateau;
    const { x, y } =  command.position;

    const rover = await this.repo.insert(new Rover({
      id: command.id,
      location: new RoverLocation({
        plateau: new Plateau({ right, upper }), 
        coordinate: new Coordinate({ x, y })
      })
    }));

    return { ...rover, position: rover.getPosition() } as RoverDto;
  }
}
