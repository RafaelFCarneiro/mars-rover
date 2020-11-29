import { mock } from 'jest-mock-extended';
import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { DIIdentifiers, IRoverRepository } from '../../Interfaces';
import { DeployRoverCommand } from './deploy-rover-command';
import { DeployRoverHandler } from './deploy-rover-handler';
import { Coordinate, Plateau, RoverLocation, Rover, RoverOrientationType, RoverOrientation } from '../../../domain';

describe('DeployRoverHandler', () => {
  const repoMock = mock<IRoverRepository>();
  
  const id = 'rover1';
  const plateau = { upper: 5, right: 5 };
  const coordinate = { x: 1, y: 2};
  const orientation = RoverOrientationType.N;
    
  describe("New", () => {
    it('should be defined', () => {
      expect(new DeployRoverHandler(repoMock)).toBeDefined();
    });
  });

  describe("Execute", () => {
    
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
      const mockedRover = createRoverMock({
        id, plateau, coordinate, orientation
      }); 

      repoMock.insert.mockReturnValue(
        Promise.resolve(mockedRover)
      );

      const rover = await commandHandler.execute(
        new DeployRoverCommand(id, plateau, coordinate)
      );
  
      expect(rover).toBeDefined();
      expect(rover.location.plateau.maxCoordinate.x).toEqual(5);
      expect(rover.location.plateau.maxCoordinate.y).toEqual(5);
      expect(rover.position).toEqual("1 2 N");
    }); 
    
    it('should call RoverRepository insert method with rightfully params and "N" orientation', async () => {      
      const mockedRover = createRoverMock({
        id, plateau, coordinate, orientation
      }); 

      repoMock.insert.mockReturnValue(
        Promise.resolve(mockedRover)
      );

      const rover = await commandHandler.execute(
        new DeployRoverCommand(id, plateau, coordinate)
      );
  
      expect(repoMock.insert).toHaveBeenCalledWith(mockedRover);
    });  
    

    it('should deploy a rover in plateau 5 5 at position 1 2 W', async () => {      
      const mockedRover = createRoverMock({
        id, plateau, coordinate,
        orientation: RoverOrientationType.W
      }); 

      repoMock.insert.mockReturnValue(Promise.resolve(mockedRover));
      
      const rover = await commandHandler.execute(
        new DeployRoverCommand(id, plateau, coordinate, 'W')
      );

      expect(rover).toBeDefined();
      expect(rover.location.plateau.maxCoordinate.x).toEqual(5);
      expect(rover.location.plateau.maxCoordinate.y).toEqual(5);
      expect(rover.position).toEqual("1 2 W");      
    });  

    it('should call RoverRepository insert method with rightfully params and "W" orientation', async () => {      
      const mockedRover = createRoverMock({
        id, plateau, coordinate,
        orientation: RoverOrientationType.W
      }); 

      repoMock.insert.mockReturnValue(Promise.resolve(mockedRover));
      
      const rover = await commandHandler.execute(
        new DeployRoverCommand(id, plateau, coordinate, 'W')
      );

      expect(repoMock.insert).toHaveBeenCalledWith(mockedRover);
    });      
  });
});

const createRoverMock = (data: {
  id: string,
  plateau: { upper: number, right: number }
  coordinate: { x: number, y: number }, 
  orientation: RoverOrientationType
}) => {
  const { id, plateau, coordinate, orientation } = data;
  return new Rover({
    id,
    location: new RoverLocation({
      plateau: new Plateau(plateau), 
      coordinate: new Coordinate(coordinate)
    }),
    orientation: new RoverOrientation({ value: orientation })
  });
};
