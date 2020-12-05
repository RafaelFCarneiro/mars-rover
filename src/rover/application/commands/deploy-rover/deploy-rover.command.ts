export class DeployRoverCommand {
  /**
   * 
   * @param id 
   * @param plateau 
   * @param position 
   * @param orientation 
   */
  constructor(
    public readonly id: string,
    public readonly plateau: { upper: number, right: number },
    public readonly position: { x: number, y: number },
    public readonly orientation?: string,
  ) {} 
}