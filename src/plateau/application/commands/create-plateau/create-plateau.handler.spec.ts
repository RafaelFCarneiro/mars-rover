import { CqrsModule, EventPublisher } from "@nestjs/cqrs";
import { Test } from "@nestjs/testing";
import { mock } from "jest-mock-extended";
import { DIIdentifiers, IPlateauRepository } from "../../interfaces";
import { CreatePlateauCommand } from "./create-plateau.command";
import {
  CreatePlateauHandler,
  CreatePlateauErrors,
} from "./create-plateau.handler";
import { Plateau, PlateauDimension } from "./../../../domain/models";
import { v4 as uuid } from "uuid";

jest.mock("uuid", () => ({ v4: () => "6b2ee66c-5a09-49b9-a2e6-5eb75be54972" }));

describe("CreatePlateauHandler", () => {
  const repoMock = mock<IPlateauRepository>();
  const mockedValues = {
    id: uuid(),
    name: "plateau_name",
    dimension: { height: 5, width: 5 },
  };

  describe("Instantiable", () => {
    let publisher: EventPublisher;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [CqrsModule],
        providers: [
          CreatePlateauHandler,
          { provide: DIIdentifiers.IPlateauRepository, useValue: repoMock },
        ],
      }).compile();

      publisher = moduleRef.get<EventPublisher>(EventPublisher);
    });

    it("should be defined", () => {
      expect(new CreatePlateauHandler(repoMock, publisher)).toBeDefined();
    });
  });

  describe("Execute - Success", () => {
    let commandHandler: CreatePlateauHandler;
    let publisher: EventPublisher;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [CqrsModule],
        providers: [
          CreatePlateauHandler,
          { provide: DIIdentifiers.IPlateauRepository, useValue: repoMock },
        ],
      }).compile();

      commandHandler =
        moduleRef.get<CreatePlateauHandler>(CreatePlateauHandler);
      publisher = moduleRef.get<EventPublisher>(EventPublisher);

      repoMock.findAll.mockReturnValue(Promise.resolve([]));
    });

    it("should create a plateau with valid id, name and dimension", async () => {
      const { id, name, dimension } = mockedValues;
      const mockedPlateau = createPlateauMock(mockedValues);
      const commitSpy = jest.spyOn(mockedPlateau, "commit");
      const publishMergeObjectContextSpy = jest.spyOn(
        publisher,
        "mergeObjectContext"
      );

      repoMock.insert.mockReturnValue(Promise.resolve(mockedPlateau));

      const plateau = await commandHandler.execute(
        new CreatePlateauCommand(name, dimension)
      );

      expect(plateau).toBeDefined();
      expect(plateau.id).toEqual(id);
      expect(plateau.name).toEqual(name);
      expect(plateau.dimension).toEqual(dimension);
      expect(publishMergeObjectContextSpy).toBeCalled();
      expect(commitSpy).toBeCalled();
      expect(repoMock.insert).toHaveBeenCalledWith(
        createPlateauMock(mockedValues)
      );
    });

    it("should call findAll method of IPlateauRepository with rightfully name param", () => {
      const { name, dimension } = mockedValues;

      repoMock.insert.mockReturnValue(
        Promise.resolve(createPlateauMock(mockedValues))
      );

      commandHandler.execute(new CreatePlateauCommand(name, dimension));

      expect(repoMock.findAll).toHaveBeenCalledWith({ name });
    });

    it("should call insert method of IPlateauRepository with rightfully Plateau param", () => {
      const { name, dimension } = mockedValues;

      repoMock.insert.mockReturnValue(
        Promise.resolve(createPlateauMock(mockedValues))
      );

      commandHandler.execute(new CreatePlateauCommand(name, dimension));

      expect(repoMock.insert).toHaveBeenCalledWith(
        createPlateauMock(mockedValues)
      );
    });

    it("should call publish method of EventPublisher", async () => {
      const { name, dimension } = mockedValues;
      const mockedPlateau = createPlateauMock(mockedValues);

      const spyPublisher = jest
        .spyOn(publisher, "mergeObjectContext")
        .mockReturnValue(mock<Plateau>());

      repoMock.insert.mockReturnValue(Promise.resolve(mockedPlateau));

      await commandHandler.execute(new CreatePlateauCommand(name, dimension));

      expect(spyPublisher).toHaveBeenCalledWith(mockedPlateau);
    });
  });

  describe("Execute - Validations", () => {
    let commandHandler: CreatePlateauHandler;

    beforeEach(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [CqrsModule],
        providers: [
          CreatePlateauHandler,
          { provide: DIIdentifiers.IPlateauRepository, useValue: repoMock },
        ],
      }).compile();

      commandHandler =
        moduleRef.get<CreatePlateauHandler>(CreatePlateauHandler);
    });

    it("should throw validation plateau already exists for the given id", async () => {
      const { name, dimension } = mockedValues;

      repoMock.findAll.mockReturnValue(
        Promise.resolve([createPlateauMock(mockedValues)])
      );

      await expect(async () => commandHandler.execute(new CreatePlateauCommand(name, dimension))
      ).rejects.toThrow(CreatePlateauErrors.PlateauAlreadyExist);
    });
  });
});

const createPlateauMock = ({ id, name, dimension }) => {
  return new Plateau({
    id,
    name,
    dimension: new PlateauDimension(dimension),
  });
};
