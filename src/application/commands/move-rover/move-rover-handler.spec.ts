import { Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { DIIdentifiers, IRoverRepository } from './../../Interfaces';
import { MoveRoverHandler } from './move-rover-handler';
import { Coordinate, Plateau, Rover, RoverLocation, RoverOrientation, RoverOrientationType } from './../../../domain';
import { MoveRoverCommand } from './move-rover-command';

describe('MoveRoverHandler', () => {
  const repoMock = mock<IRoverRepository>();  

  describe("New", () => {
    it('should be defined', () => {
      expect(new MoveRoverHandler(repoMock)).toBeDefined();
    });
  })

  describe("Execute", () => {
    let commandHandler: MoveRoverHandler;

    const id = 'rover1';
    const mockedRover = new Rover({
      id, 
      location: new RoverLocation({
        plateau: new Plateau({ upper: 5, right: 5 }), 
        coordinate: new Coordinate({ x: 1, y: 2 })
      }),
      orientation: new RoverOrientation({  
        value: RoverOrientationType.W
      })
    });    
    
    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        providers: [
          MoveRoverHandler,
          {  provide: DIIdentifiers.IRoverRepository, useValue: repoMock },
        ],
      }).compile();

      commandHandler = moduleRef.get<MoveRoverHandler>(MoveRoverHandler);
    }); 

    it('should move Rover in plateau 5 5 to position 1 3 N', async () => {      
      repoMock.findAll.mockReturnValue(
        Promise.resolve([ mockedRover ])
      );

      const rover = await commandHandler.execute(
        new MoveRoverCommand( 
          { x: 1, y: 1, orientation: "N" },
          ["L", "M", "L", "M", "L", "M", "L", "M", "M"]
        )
      );
  
      expect(rover).toBeDefined();
      expect(rover.position).toEqual("1 3 N");
    });     
  })  
});
