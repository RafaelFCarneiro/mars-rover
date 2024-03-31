import { Injectable } from "@nestjs/common";
import { IPlateauRepository, IPlateauRepositoryFilters } from "../../application/interfaces";
import { Plateau } from "../../domain";

@Injectable()
export class PlateauRepository implements IPlateauRepository {
  async insert(plateau: Plateau): Promise<Plateau> {
    plateaus.push(plateau);
    return this.find({ id: plateau.id });
  }

  async update(plateau: Plateau): Promise<Plateau> {
    const index = plateaus.findIndex(
      r => r.id === plateau.id
    );    
    plateaus[index] = plateau;    
    return this.find({ id: plateau.id })
  }

  async find(filters?: IPlateauRepositoryFilters): Promise<Plateau> {
    if (filters?.id) {
      return plateaus.find(r => r.id === filters.id) || null;
    }
    if (filters?.name) {
      return plateaus.find(r => r.name === filters.name) || null;
    }
    return null;
  }

  async search(filters?: IPlateauRepositoryFilters): Promise<Plateau[]> {
    if (filters?.id) {
      return plateaus.filter(r => r.id === filters.id);
    }
    if (filters?.name) {
      return plateaus.filter(r => r.name.match(filters.name));
    }
    return plateaus;  
  }

  async delete(id: string): Promise<void> {
    const index = plateaus.findIndex(
      r => r.id === id
    );
    plateaus.splice(index, 1);
  }
}

const plateaus: Plateau[] = [];