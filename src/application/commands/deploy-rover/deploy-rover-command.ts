export class DeployRoverCommand {
  constructor(
    public readonly id: string,
    public readonly plateau: { upper: number, right: number },
    public readonly position: { x: number, y: number },
  ) {} 
}