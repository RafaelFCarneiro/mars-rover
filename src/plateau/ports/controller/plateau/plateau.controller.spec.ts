import { Test, TestingModule } from "@nestjs/testing";
import { PlateauController } from "./plateau.controller";
import { CommandBus, CqrsModule } from "@nestjs/cqrs";
import { CreatePlateauCommand, IPlateauDto } from "../../../application";

describe("PlateauController", () => {
  let controller: PlateauController;
  let commandBus: CommandBus;

  const mockedPlateauValues: IPlateauDto = {
    id: "plateau1",
    dimension: {
      width: 5,
      height: 5,
    },
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

  it("should create a plateau", () => {
    const { id, dimension } = mockedPlateauValues;

    commandBus.execute = jest.fn().mockReturnValue({ id, dimension });
    const result = controller.createPlateau(mockedPlateauValues);

    expect(commandBus.execute).toBeCalledWith(
      new CreatePlateauCommand(id, dimension)
    );
    expect(result).toEqual({
      id,
      dimension,
    });
  });
});
