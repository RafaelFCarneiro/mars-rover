import { Injectable } from "@nestjs/common";
import { IPlateauRepository, IPlateauRepositoryFilters } from "../../application/interfaces";
import { Plateau } from "../../domain";

@Injectable()
export class PlateauRepository implements IPlateauRepository {
  async insert(plateau: Plateau): Promise<Plateau> {
    plateaus.push(plateau);
    return this.findById(plateau.id);
  }

  async update(plateau: Plateau): Promise<Plateau> {
    const index = plateaus.findIndex(
      r => r.id === plateau.id
    );    
    plateau[index] = plateau;    
    return this.findById(plateau.id);
  }

  async findById(id: string): Promise<Plateau> {
    return plateaus.find(r => r.id === id);
  }

  async findAll(filters?: IPlateauRepositoryFilters): Promise<Plateau[]> {
    return plateaus;
  }
}

const plateaus: Plateau[] = [];