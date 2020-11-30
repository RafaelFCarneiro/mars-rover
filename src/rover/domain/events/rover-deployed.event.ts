export class RoverDeployedEvent {
  /**
   * 
   * @param roverId Rover identifier
   * @param plateauId Plateau identifier
   * @param coordinate Position coordinate
   */
  constructor(
    public readonly roverId: string,
    public readonly plateauId: string,
    public readonly coordinate: { x: number, y: number },
  ) {}
}
