export interface IPlateauDto {
  id: string;
  dimension: IPlateauDimensionDto;
}

export interface IPlateauDimensionDto {
  height: number;
  width: number;
}
