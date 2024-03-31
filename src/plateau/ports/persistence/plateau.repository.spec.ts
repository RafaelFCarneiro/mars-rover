import { Test, TestingModule } from "@nestjs/testing";
import { PlateauRepository } from "./plateau.repository";
import { Plateau, PlateauDimension } from "../../domain";

describe("PlateauRepository", () => {
  let repository: PlateauRepository;
  const plateauId = "6b2ee66c-5a09-49b9-a2e6-5eb75be54972";
  const plateauName = "plateau_name";
  const getMockedPlateau = (name?: string) =>
    new Plateau({
      id: plateauId,
      dimension: new PlateauDimension({
        height: 5,
        width: 5,
      }),
      name: plateauName || name,
    });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlateauRepository],
    }).compile();

    repository = module.get<PlateauRepository>(PlateauRepository);
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });

  it("should insert and delete plateau", async () => {
    const plateau = await repository.insert(getMockedPlateau());

    expect(plateau).toEqual(plateau);

    await repository.delete(plateauId);
  });

  it("should update a plateau", async () => {
    await repository.insert(getMockedPlateau());

    const updatedPlateau: Plateau = getMockedPlateau("new_name");
    const result: Plateau = await repository.update(updatedPlateau);

    expect(result).toEqual<Plateau>(updatedPlateau);

    await repository.delete(plateauId);
  });

  describe("find", () => {
    beforeAll(async () => {
      await repository.insert(getMockedPlateau());
    });

    it("should find plateaus with id", async () => {
      const result: Plateau = await repository.find({
        id: plateauId,
      });
      expect(result).toEqual(getMockedPlateau());
    });

    it("should find plateaus with name", async () => {
      const result: Plateau = await repository.find({
        name: plateauName,
      });
      expect(result).toEqual(getMockedPlateau());
    });

    it("should return null if not find", async () => {
      const result: Plateau = await repository.find({
        name: "not_found",
      });
      expect(result).toBeNull();
    });

    afterAll(async () => {
      await repository.delete(plateauId);
    });
  });

  describe("search", () => {
    beforeAll(async () => {
      await repository.insert(getMockedPlateau());
    });

    it("should search for plateaus with name", async () => {
      const result: Plateau[] = await repository.search({ name: plateauName });
      expect(result).toEqual([getMockedPlateau()]);
    });

    it("should search for plateaus with part name", async () => {
      const result: Plateau[] = await repository.search({
        name: plateauName.substring(0, 3),
      });
      expect(result).toEqual([getMockedPlateau()]);
    });

    it("should return empty array if not found", async () => {
      const result: Plateau[] = await repository.search({ name: "not_found" });
      expect(result).toEqual([]);
    });

    afterAll(async () => {
      await repository.delete(plateauId);
    });
  });
});
