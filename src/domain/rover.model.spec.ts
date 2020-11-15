import { Rover } from './rover.model';
import { 
  Coordinate, 
  Plateau, 
  RoverLocation, 
  RoverMovementType, 
} from './value-objects';

describe('Rover', () => {
  const id = 'rover1';
  
  describe('New', () => {              
    it('should return position "0 0 N"', () => {
      const rover = new Rover({ id });           
      expect(rover.getPosition()).toEqual("0 0 N");
    });
  });

  describe('Move - Success', () => {
    let rover: Rover;

    beforeEach(async () => {    
      rover = new Rover({ 
        id,
        location: new RoverLocation({
          plateau: new Plateau({
            upper: 1,
            right: 1
          })
        })
      })
    });

    it('should return position "0 0 E" after "R" move', () => {
      rover.move(RoverMovementType.Right);
      expect(rover.getPosition()).toEqual("0 0 E");
    });

    it('should return position "0 0 W" after "L" move', () => {
      rover.move(RoverMovementType.Left);
      expect(rover.getPosition()).toEqual("0 0 W");
    });

    it('should return position "1 0 N" after "M" move', () => {
      rover.move(RoverMovementType.Move);
      expect(rover.getPosition()).toEqual("1 0 N");
    });

    it('should return position "0 1 E" after "R" and "M" move', () => {
      rover.move([
        RoverMovementType.Right,
        RoverMovementType.Move
      ]);
      expect(rover.getPosition()).toEqual("0 1 E");
    });

    it('should return position "0 0 W" after "L" and "M" move', () => {
      rover.move([
        RoverMovementType.Right,
        RoverMovementType.Move,
        RoverMovementType.Left,
        RoverMovementType.Left,
        RoverMovementType.Move
      ]);
      expect(rover.getPosition()).toEqual("0 0 W");
    });

    it('should return position "0 0 S" after "R", "R" and "M" move', () => {
      rover.move([
        RoverMovementType.Move,
        RoverMovementType.Right,
        RoverMovementType.Right,
        RoverMovementType.Move
      ]);
      expect(rover.getPosition()).toEqual("0 0 S");
    });    
  })

  describe('Move - Error', () => {
    let rover: Rover;

    beforeEach(async () => {    
      rover = new Rover({
        id,
        location: new RoverLocation({
          coordinate: new Coordinate()
        }),
      })
    });

    it('should throw error after "M" move', () => {
      expect(() => rover.move(RoverMovementType.Move)).toThrow();
    });

    it('should throw error after "R" and "M" move', () => {
      const movements = [ RoverMovementType.Right, RoverMovementType.Move ];
      expect(() => rover.move(movements)).toThrow()
    });

    it('should throw error with invalid move', () => {
      expect(() =>  rover.move(null)).toThrow("Invalid movement!");
    });
  });
  
});
