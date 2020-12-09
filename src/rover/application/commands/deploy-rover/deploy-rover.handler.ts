import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { DeployRoverCommand } from "./deploy-rover.command";
import { DIIdentifiers, IRoverRepository } from '../../Interfaces';
import { RoverDto } from '../../dtos';
import { 
  Coordinate, 
  Rover, 
  RoverDeployService, 
  RoverOrientationType
} from "../../../domain";

@CommandHandler(DeployRoverCommand)
export class DeployRoverHandler implements ICommandHandler<DeployRoverCommand> {
  constructor(
    @Inject(DIIdentifiers.IRoverRepository) private readonly roverRepository: IRoverRepository,
    private readonly publisher: EventPublisher,
    private readonly roverDeployService: RoverDeployService
  ) {}

  async execute(command: DeployRoverCommand) {    
    const { id, plateauId, position } = command;
    
    const orientation = !!command?.orientation 
      ? RoverOrientationType[command?.orientation]
      : RoverOrientationType.N;
    
    const rover = this.roverDeployService.start({
      rover: await this.roverRepository.findById(id) ?? new Rover(id),
      coordinate: new Coordinate(position),
      plateauId,
      orientation,      
    });
    
    const updatedRover = this.publisher.mergeObjectContext(
      await this.roverRepository.update(rover)
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