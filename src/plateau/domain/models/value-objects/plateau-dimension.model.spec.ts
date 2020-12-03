import { PlateauDimensionErrors, PlateauDimension } from './plateau-dimension.model';

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
        .toThrow(PlateauDimensionErrors.MustHaveValidHeight)
    });  

    it('should throw validation with height equals null', () => {
      expect(() =>  new PlateauDimension({ height: null, width }))
        .toThrow(PlateauDimensionErrors.MustHaveValidHeight)
    });  

    it('should throw validation with height equals 0', () => {
      expect(() =>  new PlateauDimension({ height: 0, width }))
        .toThrow(PlateauDimensionErrors.MustHaveValidHeight)
    });  

    it('should throw validation with width less then 0', () => {
      expect(() =>  new PlateauDimension({ height: -1, width }))
        .toThrow(PlateauDimensionErrors.MustHaveValidHeight)
    });  
  }); 

  describe("New - Width validations", () =>{
    it('should throw validation with width equals undefined', () => {
      expect(() =>  new PlateauDimension({ height, width: undefined }))
        .toThrow(PlateauDimensionErrors.MustHaveValidWidth)
    });  

    it('should throw validation with width equals null', () => {
      expect(() =>  new PlateauDimension({ height, width: null }))
        .toThrow(PlateauDimensionErrors.MustHaveValidWidth)
    });  

    it('should throw validation with width equals 0', () => {
      expect(() =>  new PlateauDimension({ height, width: 0 }))
        .toThrow(PlateauDimensionErrors.MustHaveValidWidth)
    });  

    it('should throw validation with width less then 0', () => {
      expect(() =>  new PlateauDimension({ height, width: -1 }))
        .toThrow(PlateauDimensionErrors.MustHaveValidWidth)
    });  
  });  

});