import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { DeployRoverCommand } from "./deploy-rover-command";
import { DIIdentifiers, IRoverRepository } from '../../Interfaces';
import { RoverDto } from '../../dtos';
import { 
  Coordinate, 
  Plateau, 
  RoverLocation, 
  RoverOrientation, 
  RoverOrientationType
} from "../../../domain";

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

    const rover = await this.repo.findById(command.id);
    rover.deploy({
      location: new RoverLocation({
        plateau: new Plateau({ right, upper }), 
        coordinate: new Coordinate({ x, y })
      }),
      orientation: new RoverOrientation({ value: orientation })
    })

    const updatedRover = await this.repo.update(rover);

    return { 
      ...updatedRover,
      location: rover.getLocation(),
      position: rover.getPosition(),
      orientation: rover.getOrientation().toString(),
    } as RoverDto;
  }
}
