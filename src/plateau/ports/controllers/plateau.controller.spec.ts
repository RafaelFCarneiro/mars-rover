import { Test, TestingModule } from "@nestjs/testing";
import { PlateauController } from "./plateau.controller";
import { CommandBus, CqrsModule } from "@nestjs/cqrs";
import { CreatePlateauCommand } from "../../application";
import { BadRequestException } from "@nestjs/common";
import {
  PlateauDimensionDto,
  PlateauDto,
} from "./plateau.dto";

describe("PlateauController", () => {
  let controller: PlateauController;
  let commandBus: CommandBus;

  const mockedPlateauValues: PlateauDto = {
    id: "plateau1",
    dimension: {
      width: 5,
      height: 5,
    } as PlateauDimensionDto,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [PlateauController],
    }).compile();

    controller = module.get<PlateauController>(PlateauController);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should create a plateau", async () => {
    const { id, dimension } = mockedPlateauValues;

    commandBus.execute = jest.fn().mockReturnValue({ id, dimension });
    const result = await controller.createPlateau(mockedPlateauValues);

    expect(commandBus.execute).toBeCalledWith(
      new CreatePlateauCommand(id, dimension)
    );
    expect(result).toEqual({
      id,
      dimension,
    });
  });

  it("should return bad request if handler throws error", async () => {
    const error = new Error("test error");

    commandBus.execute = jest.fn().mockImplementation(() => {
      throw error;
    });

    await expect(controller.createPlateau(mockedPlateauValues)).rejects.toEqual(
      new BadRequestException(error.message)
    );
  });
});
