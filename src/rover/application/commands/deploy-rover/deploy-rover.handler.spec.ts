import { mock } from 'jest-mock-extended';
import { CqrsModule, EventPublisher } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { DIIdentifiers, IRoverRepository } from '../../Interfaces';
import { DeployRoverCommand } from './deploy-rover.command';
import { DeployRoverHandler, DeployRoverErrors } from './deploy-rover.handler';
import { 
  Coordinate, 
  Plateau, 
  RoverLocation, 
  RoverOrientationType, 
  RoverOrientation, 
  Rover
} from '../../../domain';

describe('DeployRoverHandler', () => {
  const repoMock = mock<IRoverRepository>();  
  
  const id = 'rover1';
  const plateau = { upper: 5, right: 5 };
  const coordinate = { x: 1, y: 2};
  const orientation = RoverOrientationType.N;
    
  describe("New", () => {
    let publisher: EventPublisher;  
    
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [CqrsModule],
        providers: [
          DeployRoverHandler,
          {  provide: DIIdentifiers.IRoverRepository, useValue: repoMock },
        ],
      }).compile();

      publisher = moduleRef.get<EventPublisher>(EventPublisher);
    }); 
    
    it('should be defined', () => {
      expect(new DeployRoverHandler(repoMock, publisher)).toBeDefined();
    });
  });

  describe("Execute - Success", () => {    
    let commandHandler: DeployRoverHandler;
    
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [CqrsModule],
        providers: [
          DeployRoverHandler,
          {  provide: DIIdentifiers.IRoverRepository, useValue: repoMock },
        ],
      }).compile();

      commandHandler = moduleRef.get<DeployRoverHandler>(DeployRoverHandler);
    }); 

    it('should deploy a rover in plateau 5 5 at position 1 2 N', async () => {      
      const mockedRover = createDeployedRoverMock({
        id, plateau, coordinate, orientation
      }); 

      repoMock
        .update
        .mockReturnValue(Promise.resolve(mockedRover));

      const rover = await commandHandler.execute(
        new DeployRoverCommand(id, plateau, coordinate)
      );
  
      expect(rover).toBeDefined();
      expect(rover.location.plateau.maxCoordinate.x).toEqual(5);
      expect(rover.location.plateau.maxCoordinate.y).toEqual(5);
      expect(rover.position).toEqual("1 2 N");
    }); 
    
    it('should call RoverRepository update method with rightfully params and "N" orientation', async () => {      
      repoMock
        .update
        .mockReturnValue(Promise.resolve(new Rover(id)));

      await commandHandler.execute(
        new DeployRoverCommand(id, plateau, coordinate)
      );
  
      const mockedRover =  createDeployedRoverMock({ id, plateau, coordinate, orientation } );
      expect(repoMock.update).toHaveBeenCalledWith(mockedRover);
    });  
    

    it('should deploy a rover in plateau 5 5 at position 1 2 W', async () => {      
      const mockedRover = createDeployedRoverMock({
        id, plateau, coordinate,
        orientation: RoverOrientationType.W
      }); 

      repoMock
        .update
        .mockReturnValue(Promise.resolve(mockedRover));
      
      const rover = await commandHandler.execute(
        new DeployRoverCommand(id, plateau, coordinate, 'W')
      );

      expect(rover).toBeDefined();
      expect(rover.location.plateau.maxCoordinate.x).toEqual(5);
      expect(rover.location.plateau.maxCoordinate.y).toEqual(5);
      expect(rover.position).toEqual("1 2 W");      
    });  

    it('should call RoverRepository update method with rightfully params and "W" orientation', async () => {            
      repoMock
        .update
        .mockReturnValue(Promise.resolve(new Rover(id)));
      
      await commandHandler.execute(
        new DeployRoverCommand(id, plateau, coordinate, 'W')
      );

      const mockedRover = createDeployedRoverMock({ 
        id, plateau, coordinate, orientation: RoverOrientationType.W 
      })
      
      expect(repoMock.update).toHaveBeenCalledWith(mockedRover);
    });   
  });

  describe("Execute - Validations", () => {
    let commandHandler: DeployRoverHandler;

    const mockedValues = {
      id: 'plateau1',
      dimension: { height: 5, width: 5 }
    }
    
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [CqrsModule],
        providers: [
          DeployRoverHandler,
          { provide: DIIdentifiers.IRoverRepository, useValue: repoMock },
        ],
      }).compile();

      commandHandler = moduleRef.get<DeployRoverHandler>(DeployRoverHandler);      
    });

    it('should throw validation rover already deployed', async () => {
      const mockedRover = createDeployedRoverMock({
        id, plateau, coordinate, orientation
      }); 
      
      repoMock
        .findById
        .mockReturnValue(Promise.resolve(mockedRover));

      commandHandler
        .execute(new DeployRoverCommand(id, plateau, coordinate))
        .catch(error => expect(error.message)
          .toEqual(DeployRoverErrors.RoverAlreadyDeployed));
    });      
  });
  
});

const createRoverMock = (id: string) =>  new Rover(id);
const createDeployedRoverMock = (data: {
  id: string,
  plateau: { upper: number, right: number }
  coordinate: { x: number, y: number }, 
  orientation: RoverOrientationType
}) => {
  const { id, plateau, coordinate, orientation } = data;  
  const rover = createRoverMock(id);
  rover.deploy({
    location: new RoverLocation({
      plateau: new Plateau(plateau), 
      coordinate: new Coordinate(coordinate)
    }),
    orientation: new RoverOrientation({ value: orientation })
  })
  return rover;
};
