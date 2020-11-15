import { Plateau } from '../plateau/plateau.model';
import { Coordinate } from '../coordinate.model';
import { RoverLocation } from './rover-location.model';
import { RoverOrientationType } from '../rover-orientation-type.enum';

describe('RoverLocation', () => {
  
  describe('New', () => {              
    it('should be defined', () => {
      expect(new RoverLocation()).toBeDefined();
    });

    it('should be defined with default coordinate values', () => {
      const defaultCoord = new Coordinate();
      const rover = new RoverLocation();
      
      expect(rover.getCoordinate()).toEqual(defaultCoord);
    });

    it('should be defined with default plateau values', () => {
      const defaultPlateau = new Plateau();
      const rover = new RoverLocation();
      
      expect(rover.getPlateau()).toEqual(defaultPlateau);
    });

    it('should be defined with specific coordinate and default plateau values', () => {
      const rover = new RoverLocation({
        coordinate: new Coordinate({ x: 1, y: 1 })
      });

      expect(rover.getCoordinate()).toEqual(new Coordinate({ x: 1, y: 1 }));
      expect(rover.getPlateau()).toEqual(new Plateau());
    });

    it('should be defined with specific default coordinate and specific plateau values', () => {
      const rover = new RoverLocation({
        plateau: new Plateau({ upper: 1, right: 1 })
      });

      expect(rover.getCoordinate()).toEqual(new Coordinate());
      expect(rover.getPlateau()).toEqual(new Plateau({ upper: 1, right: 1 }));
    });

  });

  describe('Move - Success', () => {
    let roverLocation: RoverLocation;

    beforeEach(async () => {    
      roverLocation = new RoverLocation({
        plateau: new Plateau({ upper: 2, right: 2 }), 
        coordinate: new Coordinate({ x: 1, y: 1 })
      })

    });

    it('should move to "N" move', () => {
      roverLocation.moveTo(RoverOrientationType.N);
      expect(roverLocation.getCoordinate().toString()).toEqual("2 1");
    });

    it('should move to "E" move', () => {
      roverLocation.moveTo(RoverOrientationType.E);
      expect(roverLocation.getCoordinate().toString()).toEqual("1 2");
    });

    it('should move to "S" move', () => {
      roverLocation.moveTo(RoverOrientationType.S);
      expect(roverLocation.getCoordinate().toString()).toEqual("0 1");
    });

    it('should move to "W" move', () => {
      roverLocation.moveTo(RoverOrientationType.W);
      expect(roverLocation.getCoordinate().toString()).toEqual("1 0");
    });  
  })

  describe('Move - Error: Plateau Boundaries Overpass Validations', () => {
    let roverLocation: RoverLocation;

    beforeEach(async () => {    
      roverLocation = new RoverLocation({
        plateau: new Plateau(), 
        coordinate: new Coordinate()
      })

    });

    it('should throw error after "N" move', () => {
      expect(() => roverLocation.moveTo(RoverOrientationType.N)).toThrow();
    });    

    it('should throw error after "E" move', () => {
      expect(() => roverLocation.moveTo(RoverOrientationType.E)).toThrow();
    });    

    it('should throw error after "S" move', () => {
      expect(() => roverLocation.moveTo(RoverOrientationType.S)).toThrow();
    });    

    it('should throw error after "W" move', () => {
      expect(() => roverLocation.moveTo(RoverOrientationType.S)).toThrow();
    });    
  
  }) 
});
