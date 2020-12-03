import { PlateauErrors, Plateau } from "./plateau.model";
import { PlateauDimension } from "./value-objects";

describe('Plateau', () => {  
  const id = 'plateau1';
  const dimension = new PlateauDimension({
    height: 5, width: 5
  });

  describe("New - Success", () => {
    it('should be defined', () => {
      expect(new Plateau({ id, dimension })).toBeDefined();
    });  

    it('should have the defined id', () => {
      const plateau = new Plateau({ id, dimension });      
      expect(plateau.id).toBe(id);
    });  

    it('should have the defined dimension', () => {
      const plateau = new Plateau({ id, dimension });
      expect(plateau.dimension).toEqual(dimension);
    });  
  });

  describe("New - Id validations", () => {
    it('should throw validation with id equals undefined', () => {
      expect(() =>  new Plateau({ id: undefined, dimension }))
        .toThrow(PlateauErrors.MustHaveValidId)
    });  

    it('should throw validation with id equals null', () => {
      expect(() =>  new Plateau({ id: null, dimension }))
        .toThrow(PlateauErrors.MustHaveValidId)
    });  

    it('should throw validation with id equals empty string', () => {
      expect(() =>  new Plateau({ id: '  ', dimension }))
        .toThrow(PlateauErrors.MustHaveValidId)
    });  
  });

  describe("New - Dimension validations", () => {
    it('should throw validation with dimension equals undefined', () => {
      expect(() =>  new Plateau({ id, dimension: undefined }))
        .toThrow(PlateauErrors.MustHaveDimension)
    });  

    it('should throw validation with dimension equals null', () => {
      expect(() =>  new Plateau({ id, dimension: null }))
        .toThrow(PlateauErrors.MustHaveDimension)
    });  

    it('should throw validation with dimension equals literal object', () => {
      expect(() =>  new Plateau({ id, dimension: { height: 1, width: -1 } }))
        .toThrow(PlateauErrors.MustHaveDimension)
    });  
  });    

});