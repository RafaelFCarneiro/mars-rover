export class MoveRoverByPositionCommand {
  /**
   * 
   * @param position 
   * @param movements 
   */
  constructor(
    public readonly position: { x: number, y: number, orientation: string },
    public readonly movements: string[],
  ) {} 
}
