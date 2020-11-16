import { RoverOrientationType } from '../rover-orientation-type.enum';
import { RoverOrientation } from './rover-orientation.model';

describe('RoverOrientation', () => {  

  describe('New', () => {        
    it('should return default position "N"', () => {
      const roverOrientation = new RoverOrientation();
      expect(roverOrientation.toString()).toEqual("N");
    });

    it('should return specified position "E"', () => {
      const roverOrientation = new RoverOrientation({
        value: RoverOrientationType.E
      });
      expect(roverOrientation.toString()).toEqual("E");
    });

    it('should throw error when rover orientation type is invalid', () => {
      const value = RoverOrientationType['a'];
      expect(() => new RoverOrientation({ value })).toThrow("Invalid orientation type!");
    });    

  });

  describe('Turn Right', () => {        
    it('should return position "E" after "N"', () => {
      const roverOrientation = new RoverOrientation();
      
      roverOrientation.turnRight();
      
      expect(roverOrientation.toString()).toEqual("E");
    });

    it('should return position "N" if current is "W"', () => {
      const roverOrientation = new RoverOrientation({
        value: RoverOrientationType.W
      });
      
      roverOrientation.turnRight();

      expect(roverOrientation.toString()).toEqual("N");
    });
  });

  describe('Turn Left', () => {        
    it('should return position "W" if current is "N"', () => {
      const roverOrientation = new RoverOrientation();
      
      roverOrientation.turnLeft();
      
      expect(roverOrientation.toString()).toEqual("W");
    });

    it('should return position "S" if current id "W"', () => {
      const roverOrientation = new RoverOrientation({
        value: RoverOrientationType.W
      });
      
      roverOrientation.turnLeft();

      expect(roverOrientation.toString()).toEqual("S");
    });
  }); 

});
