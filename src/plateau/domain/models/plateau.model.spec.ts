import { PlateauCreatedEvent } from "../events";
import { PlateauErrors, Plateau } from "./plateau.model";
import { PlateauDimension } from "./value-objects";

describe("Plateau", () => {
  const id = "6b2ee66c-5a09-49b9-a2e6-5eb75be54972";
  const name = "plateau_name";
  const dimension = new PlateauDimension({
    height: 5,
    width: 5,
  });

  describe("New - Success", () => {
    it("should be defined", () => {
      expect(new Plateau({ id, name, dimension })).toBeDefined();
    });

    it("should have the defined id, name and dimension", () => {
      const plateau = new Plateau({ id, name, dimension });
      
      expect(plateau.id).toBe(id);
      expect(plateau.name).toBe(name);
      expect(plateau.dimension).toEqual(dimension);
    });

    it("should have the PlateauCreatedEvent event", () => {
      const plateau = new Plateau({ id, name, dimension });
      const events = plateau.getUncommittedEvents();

      expect(events.length).toBe(1);
      expect(events).toContainEqual(
        new PlateauCreatedEvent(id, name, dimension)
      );
    });
  });

  describe("New - id validations", () => {
    it("should throw validation with name is empty", () => {
      expect(() => new Plateau({ id: undefined, name, dimension })).toThrow(
        PlateauErrors.MustHaveValidId
      );
      expect(() => new Plateau({ id: null, name, dimension })).toThrow(
        PlateauErrors.MustHaveValidId
      );
      expect(() => new Plateau({ id: "  ", name, dimension })).toThrow(
        PlateauErrors.MustHaveValidId
      );
      expect(() => new Plateau({ id: "", name, dimension })).toThrow(
        PlateauErrors.MustHaveValidId
      );
    });
  });

  describe("New - name validations", () => {
    it("should throw validation with name is empty", () => {
      expect(() => new Plateau({ id, name: undefined, dimension })).toThrow(
        PlateauErrors.MustHaveValidName
      );
      expect(() => new Plateau({ id, name: null, dimension })).toThrow(
        PlateauErrors.MustHaveValidName
      );
      expect(() => new Plateau({ id, name: "  ", dimension })).toThrow(
        PlateauErrors.MustHaveValidName
      );
      expect(() => new Plateau({ id, name: "", dimension })).toThrow(
        PlateauErrors.MustHaveValidName
      );
    });
  });

  describe("New - Dimension validations", () => {
    it("should throw validation with dimension is empty", () => {
      expect(() => new Plateau({ id, name, dimension: undefined })).toThrow(
        PlateauErrors.MustHaveDimension
      );
      expect(() => new Plateau({ id, name, dimension: null })).toThrow(
        PlateauErrors.MustHaveDimension
      );
      expect(
        () => new Plateau({ id, name, dimension: { height: 1, width: -1 } })
      ).toThrow(PlateauErrors.MustHaveDimension);
    });

  });
});
