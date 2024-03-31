import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  IsString,
} from "class-validator";
import { CreatePlateauCommand } from "../../application";
import { ApiProperty } from "@nestjs/swagger";

export class PlateauDimensionDto {  
  constructor(width: any, height: any) {
    this.width = width;
    this.height = height;
  }

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  width: number;

  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  height: number;
}

export class PlateauDto extends CreatePlateauCommand {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmptyObject()
  dimension: PlateauDimensionDto;
}
