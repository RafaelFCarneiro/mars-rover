import { NotDeployed, Rover, Errors } from './rover.model';
import { 
  Coordinate, 
  Plateau, 
  RoverLocation, 
  RoverMovementType, 
} from './value-objects';

describe('Rover', () => {
  const id = 'rover1';
  
  describe('New', () => {              
    it('should return deployed false', () => {
      const rover = new Rover(id);           
      expect(rover.isDeployed()).toEqual(false);
    });

    it('should return position with not deployed signalization', () => {
      const rover = new Rover(id);           
      expect(rover.getPosition()).toEqual(NotDeployed);
    });

    it('should throw must have valid id error with empty string parameter', () => {
      expect(() =>  new Rover('')).toThrow(Errors.MustHaveValidId)
    });

    it('should throw must have valid id error with spaced string parameter', () => {
      expect(() =>  new Rover('')).toThrow(Errors.MustHaveValidId)
    });

    it('should throw must have valid id error with null parameter', () => {
      expect(() =>  new Rover('')).toThrow(Errors.MustHaveValidId)
    });

    it('should throw must have valid id error with undefined parameter', () => {
      expect(() =>  new Rover('')).toThrow(Errors.MustHaveValidId)
    });
  });
  

  describe('Deploy', () => {              
    it('should return position "0 0 N"', () => {
      const rover = new Rover(id);
      rover.deploy();
      expect(rover.getPosition()).toEqual("0 0 N");
    });
  });

  describe('Move - Success | Plateau 1 1; Start Position 0 0 N ', () => {
    let rover: Rover;

    beforeEach(async () => {    
      rover = new Rover(id);      
      rover.deploy({
        location: new RoverLocation({
          plateau: new Plateau({
            upper: 1,
            right: 1
          })
        })
      });
    });

    it('should return position "0 0 E" after "R" move', () => {
      rover.move(RoverMovementType.R);
      expect(rover.getPosition()).toEqual("0 0 E");
    });

    it('should return position "0 0 W" after "L" move', () => {
      rover.move(RoverMovementType.L);
      expect(rover.getPosition()).toEqual("0 0 W");
    });

    it('should return position "0 1 N" after "M" move', () => {
      rover.move(RoverMovementType.M);
      expect(rover.getPosition()).toEqual("0 1 N");
    });

    it('should return position "0 1 E" after "R" and "M" move', () => {
      rover.move([
        RoverMovementType.R,
        RoverMovementType.M
      ]);
      expect(rover.getPosition()).toEqual("1 0 E");
    });

    it('should return position "0 0 W" after "L" and "M" move', () => {
      rover.move([
        RoverMovementType.R,
        RoverMovementType.M,
        RoverMovementType.L,
        RoverMovementType.L,
        RoverMovementType.M
      ]);
      expect(rover.getPosition()).toEqual("0 0 W");
    });

    it('should return position "0 0 S" after "R", "R" and "M" move', () => {
      rover.move([
        RoverMovementType.M,
        RoverMovementType.R,
        RoverMovementType.R,
        RoverMovementType.M
      ]);
      expect(rover.getPosition()).toEqual("0 0 S");
    });    
  })

  describe('Move - Success | Plateau 5 5; Start Position 1 2 N ', () => {
    let rover: Rover;

    beforeEach(async () => {    
      rover = new Rover(id);
      rover.deploy({
        location: new RoverLocation({
          plateau: new Plateau({ upper: 5, right: 5 }),
          coordinate: new Coordinate({ x: 1, y: 2 })
        })
      });
    });

    it('should return position "1 2 W" after "L" move', () => {
      rover.move(RoverMovementType.L);
      expect(rover.getPosition()).toEqual("1 2 W");
    });

    it('should return position "1 3 N" after "M" move', () => {
      rover.move(RoverMovementType.M);
      expect(rover.getPosition()).toEqual("1 3 N");
    });
  }) 

  describe('Move - Error', () => {
    let rover: Rover;

    beforeEach(async () => {    
      rover = new Rover(id);
      rover.deploy({
        location: new RoverLocation({
          coordinate: new Coordinate()
        }),
      });
    });

    it('should throw error after "M" move', () => {
      expect(() => rover.move(RoverMovementType.M)).toThrow();
    });

    it('should throw error after "R" and "M" move', () => {
      const movements = [ RoverMovementType.R, RoverMovementType.M ];
      expect(() => rover.move(movements)).toThrow()
    });

    it('should throw error with invalid move', () => {
      expect(() =>  rover.move(null)).toThrow("Invalid movement!");
    });
  });
  
});
