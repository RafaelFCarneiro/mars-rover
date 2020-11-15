import { mock } from 'jest-mock-extended';
import { CqrsModule } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { DIIdentifiers, IRoverRepository } from '../../Interfaces';
import { DeployRoverCommand } from './deploy-rover-command';
import { DeployRoverHandler } from './deploy-rover-handler';
import { Coordinate, Plateau, RoverLocation, Rover } from '../../../domain';

describe('DeployRoverHandler', () => {
  const repoMock = mock<IRoverRepository>();  
    
  describe("New", () => {
    it('should be defined', () => {
      expect(new DeployRoverHandler(repoMock)).toBeDefined();
    });
  });

  describe("Execute", () => {
    
    const id = 'rover1';
    const plateau = { upper: 5, right: 5 };
    const coordinate = { x: 1, y: 2 };
    const mockedRover = new Rover({
      id, 
      location: new RoverLocation({
        plateau: new Plateau(plateau), 
        coordinate: new Coordinate(coordinate)
      })
    });

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
  });
});