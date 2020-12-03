import { Plateau } from "./../../domain/models";

export interface IPlateauRepository {
  insert(Plateau: Plateau): Promise<Plateau>
  update(Plateau: Plateau): Promise<Plateau>
  findById(id: string): Promise<Plateau>
  findAll(filters?: IPlateauRepositoryFilters): Promise<Plateau[]>
}

export interface IPlateauRepositoryFilters {
  
}
