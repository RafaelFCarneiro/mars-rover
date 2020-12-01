import { Errors, PlateauDimension } from './plateau-dimension.model';

describe('Plateau Dimension', () => {  
  const height = 5;
  const width = 5;

  describe("New - Success", () => {
    it('should be defined', () => {
      expect(new PlateauDimension({ height, width })).toBeDefined();
    });  

    it('should have the defined height', () => {
      const plateauDimension = new PlateauDimension({ 
        height, width 
      });      
      expect(plateauDimension.height).toBe(height);
    });  

    it('should have the defined width', () => {
      const plateauDimension = new PlateauDimension({ 
        height, width 
      });      
      expect(plateauDimension.width).toBe(width);
    });  
  });

  describe("New - Height validations", () => {
    it('should throw validation with height equals undefined', () => {
      expect(() =>  new PlateauDimension({ height: undefined, width }))
        .toThrow(Errors.MustHaveValidHeight)
    });  

    it('should throw validation with height equals null', () => {
      expect(() =>  new PlateauDimension({ height: null, width }))
        .toThrow(Errors.MustHaveValidHeight)
    });  

    it('should throw validation with height equals 0', () => {
      expect(() =>  new PlateauDimension({ height: 0, width }))
        .toThrow(Errors.MustHaveValidHeight)
    });  

    it('should throw validation with width less then 0', () => {
      expect(() =>  new PlateauDimension({ height: -1, width }))
        .toThrow(Errors.MustHaveValidHeight)
    });  
  }); 

  describe("New - Width validations", () =>{
    it('should throw validation with width equals undefined', () => {
      expect(() =>  new PlateauDimension({ height, width: undefined }))
        .toThrow(Errors.MustHaveValidWidth)
    });  

    it('should throw validation with width equals null', () => {
      expect(() =>  new PlateauDimension({ height, width: null }))
        .toThrow(Errors.MustHaveValidWidth)
    });  

    it('should throw validation with width equals 0', () => {
      expect(() =>  new PlateauDimension({ height, width: 0 }))
        .toThrow(Errors.MustHaveValidWidth)
    });  

    it('should throw validation with width less then 0', () => {
      expect(() =>  new PlateauDimension({ height, width: -1 }))
        .toThrow(Errors.MustHaveValidWidth)
    });  
  });  

});