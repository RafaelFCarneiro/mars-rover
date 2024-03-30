import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  IsString,
} from "class-validator";
import { IPlateauDimensionDto, IPlateauDto } from "../../../application";
import { ApiProperty } from "@nestjs/swagger";

export class PlateauDimensionDto implements IPlateauDimensionDto {  
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  width: number;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  height: number;
}

export class PlateauDto implements IPlateauDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmptyObject()
  dimension: PlateauDimensionDto;
}
