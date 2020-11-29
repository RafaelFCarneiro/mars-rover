import { Coordinate, Rover } from "../../domain";

export interface IRoverRepository {
  insert(rover: Rover): Promise<Rover>
  update(rover: Rover): Promise<Rover>
  findById(id: string): Promise<Rover>
  findAll(filters?: IRoverRepositoryFilters): Promise<Rover[]>
}

export interface IRoverRepositoryFilters {
  coordinate?: Coordinate;
}
