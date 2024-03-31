import { Plateau } from "./../../domain";

export interface IPlateauRepository {
  insert(Plateau: Plateau): Promise<Plateau>
  update(Plateau: Plateau): Promise<Plateau>
  find(filters?: IPlateauRepositoryFilters): Promise<Plateau>
  search(filters?: IPlateauRepositoryFilters): Promise<Plateau[]>
  delete(id: string): Promise<void>
}

export interface IPlateauRepositoryFilters {
  id?: string;
  name?: string;
}
