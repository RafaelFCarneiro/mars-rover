export class MoveRoverCommand {
  constructor(
    public readonly position: { x: number, y: number, orientation: string },
    public readonly movements: string[],
  ) {} 
}
