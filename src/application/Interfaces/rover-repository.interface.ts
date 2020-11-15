import { Rover } from "src/domain";

export interface IRoverRepository {
  insert(rover: Rover): Promise<Rover>
  update(rover: Rover): Promise<Rover>
  findById(id: string): Promise<Rover>
  findAll(): Promise<Rover[]>
}
