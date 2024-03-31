export class PlateauCreatedEvent {
  /**
   * 
   * @param id Plateau identifier
   * @param name Plateau name
   * @param dimension Plateau dimensions
   */
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly dimension: { height: number, width: number },
  ) {}
}
