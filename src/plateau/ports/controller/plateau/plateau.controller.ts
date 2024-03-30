import { BadRequestException, Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreatePlateauCommand, IPlateauDto } from "../../../application";

@Controller("plateau")
export class PlateauController {
  constructor(private commandBus: CommandBus) {}

  @Post()
  createPlateau(@Body() body: IPlateauDto) {
    const { id, dimension } = body;
    const { width, height } = dimension;
        
    try {
      return this.commandBus.execute(
        new CreatePlateauCommand(id, { width, height })
      );
    } catch (error) {
      throw new BadRequestException(error);      
    }
  }
}
