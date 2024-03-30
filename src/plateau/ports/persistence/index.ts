import { DIIdentifiers } from "../../application/interfaces";
import { PlateauRepository } from "./plateau.repository";

export const PlateauRepositories = [
  { provide: DIIdentifiers.IPlateauRepository, useClass: PlateauRepository }
]