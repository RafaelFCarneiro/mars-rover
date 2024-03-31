import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { CreatePlateauCommand, SearchPlateauQuery } from "../../application";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { PlateauDto } from "./plateau.dto";

@ApiTags("Plateau")
@Controller("plateau")
export class PlateauController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Get()
  @ApiQuery({ name: 'name', required: false, type: String })
  async getPlateaus(@Query("name") name?: string) {
    return this.queryBus.execute(new SearchPlateauQuery(name));
  }

  @Post()
  async createPlateau(@Body() body: PlateauDto) {
    const { name, dimension } = body;
    const { width, height } = dimension;

    try {
      return await this.commandBus.execute(
        new CreatePlateauCommand(name, { width, height })
      );
    } catch (error) {
      console.error(error);
      throw new BadRequestException(error.message);
    }
  }
}
