import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { DeployRoverCommand } from "./deploy-rover-command";
import { DIIdentifiers, IRoverRepository } from '../../Interfaces';
import { RoverDto } from '../../dtos';
import { 
  Coordinate, 
  Plateau, 
  Rover, 
  RoverLocation, 
  RoverOrientation, 
  RoverOrientationType
} from "../../../domain";

@CommandHandler(DeployRoverCommand)
export class DeployRoverHandler implements ICommandHandler<DeployRoverCommand> {
  constructor(
    @Inject(DIIdentifiers.IRoverRepository) private readonly repo: IRoverRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DeployRoverCommand) {    
    const { id, plateau, position } = command;
    
    const orientation = !!command?.orientation 
      ? RoverOrientationType[command?.orientation]
      : RoverOrientationType.N;

    const rover = await this.repo.findById(id) ?? new Rover(id);
    if (rover.isDeployed()) {
      throw new Error(DeployRoverErrors.RoverAlreadyDeployed);
    }

    rover.deploy({
      location: new RoverLocation({
        plateau: new Plateau(plateau), 
        coordinate: new Coordinate(position)
      }),
      orientation: new RoverOrientation({ value: orientation })
    });
    
    const updatedRover = this.publisher.mergeObjectContext(
      await this.repo.update(rover)
    );
    
    updatedRover.commit();
 
    return { 
      ...updatedRover,
      location: rover.getLocation(),
      position: rover.getPosition(),
      orientation: rover.getOrientation().toString(),
    } as RoverDto;
  }
}

export const DeployRoverErrors = {
  RoverAlreadyDeployed: 'Rover is already deployed.',
}