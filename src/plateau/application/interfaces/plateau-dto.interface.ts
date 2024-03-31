export interface IPlateauDto {
  id: string;
  name: string;
  dimension: IPlateauDimensionDto;
}

export interface IPlateauDimensionDto {
  height: number;
  width: number;
}
