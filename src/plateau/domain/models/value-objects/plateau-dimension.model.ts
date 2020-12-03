export class PlateauDimension {
  public readonly height: number;
  public readonly width: number;

  constructor(data: {
    height: number,
    width: number,  
  }) {
    const { height, width } = data;

    const notHaveValidHeight = !height || isNaN(height) || height < 0;
    if (notHaveValidHeight) {
      throw new Error(PlateauDimensionErrors.MustHaveValidHeight);
    }

    const notHaveValidWidth = !width || isNaN(data?.width) || width < 0;
    if (notHaveValidWidth) {
      throw new Error(PlateauDimensionErrors.MustHaveValidWidth);
    }

    this.height = height;
    this.width = width; 
  }
}

export const PlateauDimensionErrors = {
  MustHaveValidHeight: "A plateau dimension must have a valid height.",
  MustHaveValidWidth: "A plateau dimension must have a valid width.",
}
