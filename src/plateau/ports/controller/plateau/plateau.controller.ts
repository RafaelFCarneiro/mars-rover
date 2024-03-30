import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreatePlateauCommand, IPlateauDto } from "../../../application";

@Controller("plateau")
export class PlateauController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  @HttpCode(201)
  createPlateau(@Body() body: IPlateauDto) {
    const { id, dimension } = body;
    const { width, height } = dimension;
    return this.commandBus.execute(
      new CreatePlateauCommand(id, { width, height })
    );
  }
}
