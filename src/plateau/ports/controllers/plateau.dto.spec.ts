import { PlateauDimensionDto, PlateauDto } from "./plateau.dto";
import { validateSync } from "class-validator";

describe("PlateauDimensionDto", () => {
  it("should validate a valid PlateauDimensionDto instance", () => {
    const dto = new PlateauDimensionDto("5", "5")
    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail validation when width is not a number string", () => {
    const dto = new PlateauDimensionDto("invalid", "5")
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should fail validation when width is empty", () => {
    const dto = new PlateauDimensionDto(null, "5")
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should fail validation when height is not a number string", () => {
    const dto = new PlateauDimensionDto("5", "invalid",)
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should fail validation when height is empty", () => {
    const dto = new PlateauDimensionDto("5", null)
    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});

describe("PlateauDto", () => {
  it("should validate a valid PlateauDto instance", () => {
    const dto = new PlateauDto("123", new PlateauDimensionDto("5", "5"));

    const errors = validateSync(dto);
    expect(errors.length).toBe(0);
  });

  it("should fail validation when name is empty", () => {
    const dto = new PlateauDto("", new PlateauDimensionDto("5", "5"));

    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it("should fail validation when dimension is empty", () => {
    const dto = new PlateauDto("123", null);

    const errors = validateSync(dto);
    expect(errors.length).toBeGreaterThan(0);
  });
});
