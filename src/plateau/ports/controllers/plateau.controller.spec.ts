import { Test, TestingModule } from "@nestjs/testing";
import { PlateauController } from "./plateau.controller";
import { CommandBus, CqrsModule, QueryBus } from "@nestjs/cqrs";
import { CreatePlateauCommand, SearchPlateauQuery } from "../../application";
import { BadRequestException } from "@nestjs/common";
import { PlateauDimensionDto, PlateauDto } from "./plateau.dto";

describe("PlateauController", () => {
  let controller: PlateauController;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  const mockedPlateauValues: PlateauDto = {
    name: "plateau1",
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
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("createPlateau", () => {
    it("should create a plateau", async () => {
      const { name, dimension } = mockedPlateauValues;

      commandBus.execute = jest.fn().mockReturnValue({ name, dimension });
      const result = await controller.createPlateau(mockedPlateauValues);

      expect(commandBus.execute).toBeCalledWith(
        new CreatePlateauCommand(name, dimension)
      );
      expect(result).toEqual({
        name,
        dimension,
      });
    });

    it("should return bad request if handler throws error", async () => {
      const error = new Error("test error");

      commandBus.execute = jest.fn().mockImplementation(() => {
        throw error;
      });

      await expect(
        controller.createPlateau(mockedPlateauValues)
      ).rejects.toEqual(new BadRequestException(error.message));
    });
  });

  describe("SearchPlateaus", () => {
    it("should search plateaus without filters", async () => {
      queryBus.execute = jest.fn().mockReturnValue([mockedPlateauValues]);
      
      const result = await controller.getPlateaus();

      expect(queryBus.execute).toBeCalledWith(new SearchPlateauQuery());
      expect(result).toEqual([mockedPlateauValues]);
    });

    it("should search plateaus passing name", async () => {
      queryBus.execute = jest.fn().mockReturnValue([mockedPlateauValues]);
      
      const result = await controller.getPlateaus(mockedPlateauValues.name);
      
      expect(queryBus.execute).toBeCalledWith(
        new SearchPlateauQuery(mockedPlateauValues.name)
      );
      expect(result).toEqual([mockedPlateauValues]);
    });
  });
});
