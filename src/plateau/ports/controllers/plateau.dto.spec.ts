import { PlateauDimensionDto, PlateauDto } from "./plateau.dto";
import { validateSync } from "class-validator";

describe("PlateauDimensionDto", () => {
  it("should validate a valid PlateauDimensionDto instance", () => {
    const dto = new PlateauDimensionDto();
    dto.width = "5";
    dto.height = "5";

    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail validation when width is not a number string", () => {
    const dto = new PlateauDimensionDto();
    dto.width = "invalid";
    dto.height = "5";

    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should fail validation when width is empty", () => {
    const dto = new PlateauDimensionDto();
    dto.width = null;
    dto.height = "5";

    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should fail validation when height is not a number string", () => {
    const dto = new PlateauDimensionDto();
    dto.width = "5";
    dto.height = "invalid";

    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should fail validation when height is empty", () => {
    const dto = new PlateauDimensionDto();
    dto.width = "5";
    dto.height = null;

    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe("PlateauDto", () => {
  it("should validate a valid PlateauDto instance", () => {
    const dto = new PlateauDto();
    dto.id = "123";
    dto.dimension = new PlateauDimensionDto();
    dto.dimension.width = "5";
    dto.dimension.height = "5";

    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail validation when id is empty", () => {
    const dto = new PlateauDto();
    dto.id = "";
    dto.dimension = new PlateauDimensionDto();
    dto.dimension.width = "5";
    dto.dimension.height = "5";

    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should fail validation when dimension is empty", () => {
    const dto = new PlateauDto();
    dto.id = "123";
    dto.dimension = null;

    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
