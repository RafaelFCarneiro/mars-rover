import { IPlateauRepositoryFilters } from "../../interfaces";

export class SearchPlateauQuery implements IPlateauRepositoryFilters{
  constructor(public readonly name?: string) {
    this.name = name;    
  }
}