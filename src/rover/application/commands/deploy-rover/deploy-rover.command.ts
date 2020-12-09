export class DeployRoverCommand {
  /**
   * 
   * @param id 
   * @param plateauId
   * @param position 
   * @param orientation 
   */
  constructor(
    public readonly id: string,
    public readonly plateauId: string,
    public readonly position: { x: number, y: number },
    public readonly orientation?: string,
  ) {} 
}