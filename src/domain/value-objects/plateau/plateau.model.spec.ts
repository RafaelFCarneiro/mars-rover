import { Coordinate } from '../coordinate.model';
import { Plateau } from './plateau.model';

describe('Plateau', () => {  

  let plateau: Plateau;

  beforeEach(async () => {    
    plateau = new Plateau();    
  });

  it('should not overpass boundaries to "0 0"', () => {
    expect(plateau.boundariesOverpassed(new Coordinate())).toBeFalsy();
  });

  it('should overpass boundaries to "1 0"', () => {
    expect(plateau.boundariesOverpassed(new Coordinate({ x:1 }))).toBeTruthy();
  });

  it('should overpass boundaries to "0 1"', () => {
    expect(plateau.boundariesOverpassed(new Coordinate({ y: 1 }))).toBeTruthy();
  });
  
  it('should overpass boundaries to "1 1"', () => {
    expect(plateau.boundariesOverpassed(new Coordinate({ x: 1, y: 1}))).toBeTruthy();
  });

  it('should overpass boundaries to "-1 0"', () => {
    expect(plateau.boundariesOverpassed(new Coordinate({ x: -1, y: 0}))).toBeTruthy();
  });

  it('should overpass boundaries to "0 -1"', () => {
    expect(plateau.boundariesOverpassed(new Coordinate({ y: -1}))).toBeTruthy();
  });

  it('should overpass boundaries to "-1 -1"', () => {
    expect(plateau.boundariesOverpassed(new Coordinate({ x: -1, y: -1 }))).toBeTruthy();
  });

});