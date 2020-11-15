import { RoverDto } from "../../../application/dtos";

export class MoveRoverCommand {
  constructor(
    public readonly rover: RoverDto,
    public readonly movements: string[],
  ) {} 
}
