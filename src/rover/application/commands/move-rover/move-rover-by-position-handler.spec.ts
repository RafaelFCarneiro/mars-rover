import { Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { DIIdentifiers, IRoverRepository } from '../../Interfaces';
import { MoveRoverByPositionHandler } from './move-rover-by-position-handler';
import { Coordinate, Plateau, Rover, RoverLocation, RoverOrientation, RoverOrientationType } from './../../../domain';
import { MoveRoverByPositionCommand } from './move-rover-by-position-command';

describe('MoveRoverHandler', (): void => {
  const repoMock = mock<IRoverRepository>();  

  describe("New", () => {
    it('should be defined', () => {
      expect(new MoveRoverByPositionHandler(repoMock)).toBeDefined();
    });
  })

  describe("Execute", () => {
    let commandHandler: MoveRoverByPositionHandler;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          MoveRoverByPositionHandler,
          {  provide: DIIdentifiers.IRoverRepository, useValue: repoMock },
        ],
      }).compile();

      commandHandler = moduleRef.get<MoveRoverByPositionHandler>(MoveRoverByPositionHandler);
    }); 

    it('should move Rover in plateau 5 5 from position 1 2 N to 1 3 N', async () => {      
      const mockedRover = createRoverMock({
        coordinate: { x: 1, y: 2},
        orientation: RoverOrientationType.N
      })

      repoMock.findAll.mockReturnValue(
        Promise.resolve([ mockedRover ])
      );

      const rover = await commandHandler.execute(
        new MoveRoverByPositionCommand( 
          { x: 1, y: 1, orientation: "N" },
          ["L", "M", "L", "M", "L", "M", "L", "M", "M"]
        )
      );
  
      expect(rover).toBeDefined();
      expect(rover.position).toEqual("1 3 N");
    });

    it('should move Rover in plateau 5 5 from position 1 2 W to 1 3 N', async () => {      
      const mockedRover = createRoverMock({
        coordinate: { x: 1, y: 2},
        orientation: RoverOrientationType.W
      })

      repoMock.findAll.mockReturnValue(
        Promise.resolve([ mockedRover ])
      );

      const rover = await commandHandler.execute(
        new MoveRoverByPositionCommand( 
          { x: 1, y: 1, orientation: "N" },
          ["L", "M", "L", "M", "L", "M", "L", "M", "M"]
        )
      );
  
      expect(rover).toBeDefined();
      expect(rover.position).toEqual("1 3 N");
    });    

    it('should move Rover in plateau 5 5 from position 3 3 E to 5 1 E', async () => {      
      const mockedRover = createRoverMock({
        coordinate: { x: 3, y: 3},
        orientation: RoverOrientationType.E
      })

      repoMock.findAll.mockReturnValue(
        Promise.resolve([ mockedRover ])
      );

      const rover = await commandHandler.execute(
        new MoveRoverByPositionCommand( 
          { x: 3, y: 3, orientation: "E" },
          [ "M", "M", "R", "M", "M", "R", "M", "R", "R", "M" ]
        )
      );
  
      expect(rover).toBeDefined();
      expect(rover.position).toEqual("5 1 E");
    });

    it('should move Rover in plateau 5 5 from position 3 3 N to 5 1 E', async () => {      
      const mockedRover = createRoverMock({
        coordinate: { x: 3, y: 3},
        orientation: RoverOrientationType.N
      })
  
      repoMock.findAll.mockReturnValue(
        Promise.resolve([ mockedRover ])
      );
  
      const rover = await commandHandler.execute(
        new MoveRoverByPositionCommand( 
          { x: 3, y: 3, orientation: "E" },
          [ "M", "M", "R", "M", "M", "R", "M", "R", "R", "M" ]
        )
      );
  
      expect(rover).toBeDefined();
      expect(rover.position).toEqual("5 1 E");
    });       
  }) 
});

const createRoverMock = (data: {
    coordinate: { x: number, y: number }, 
    orientation: RoverOrientationType
  }) => {
    const { coordinate, orientation } = data;
    return new Rover({
      id: 'rover1', 
      location: new RoverLocation({
        plateau: new Plateau({ upper: 5, right: 5 }), 
        coordinate: new Coordinate(coordinate)
      }),
      orientation: new RoverOrientation({ value: orientation })
    });
};

