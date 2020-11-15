import { Injectable } from "@nestjs/common";
import { IRoverRepository } from "../../application/Interfaces";
import { Rover } from "../../domain";

@Injectable()
export class RoverRepository implements IRoverRepository {
  async insert(rover: Rover): Promise<Rover> {
    rovers.push(rover);
    return this.findById(rover.getId());
  }

  async update(rover: Rover): Promise<Rover> {
    const index = rovers.findIndex(
      r => r.getId() === rover.getId()
    );    
    rover[index] = rover;    
    return this.findById(rover.getId());
  }

  async findById(id: string): Promise<Rover> {
    return rovers.find(r => r.getId() === id);
  }

  async findAll(): Promise<Rover[]> {
    return rovers;
  }
}

const rovers: Rover[] = [];
