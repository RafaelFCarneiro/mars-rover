export class RoverDto {
  readonly location: RoverLocationDto;
  readonly orientation: string;
  readonly position: string;
}

export class RoverLocationDto {
  plateau: PlateauDto; 
  coordinate: CoordinateDto;
}

export class PlateauDto {
  readonly maxCoordinate: CoordinateDto;
  readonly minCoordinate: CoordinateDto;
}

export class CoordinateDto {
  x: number; 
  y: number;
}