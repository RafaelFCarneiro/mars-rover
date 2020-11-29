export class MoveRoverByPositionCommand {
  constructor(
    public readonly position: { x: number, y: number, orientation: string },
    public readonly movements: string[],
  ) {} 
}
