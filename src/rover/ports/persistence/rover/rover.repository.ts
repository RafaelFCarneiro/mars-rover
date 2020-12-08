import { Injectable } from "@nestjs/common";
import { IRoverRepository, IRoverRepositoryFilters } from "./../../../application/Interfaces";
import { Rover } from "./../../../domain";

@Injectable()
export class RoverRepository implements IRoverRepository {
  async insert(rover: Rover): Promise<Rover> {
    rovers.push(rover);
    return this.findById(rover.id);
  }

  async update(rover: Rover): Promise<Rover> {
    const index = rovers.findIndex(
      r => r.id === rover.id
    );    
    rover[index] = rover;    
    return this.findById(rover.id);
  }

  async findById(id: string): Promise<Rover> {
    return rovers.find(r => r.id === id);
  }

  async findAll(filters?: IRoverRepositoryFilters): Promise<Rover[]> {
    return rovers;
  }
}

const rovers: Rover[] = [];
