import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreatePlateauCommand } from "../../application";
import { ApiTags } from "@nestjs/swagger";
import { PlateauDto } from "./plateau.dto";

@ApiTags("Plateau")
@Controller("plateau")
export class PlateauController {
  constructor(private commandBus: CommandBus) {}

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
