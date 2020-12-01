export class PlateauCreatedEvent {
  /**
   * 
   * @param plateauId Plateau identifer
   * @param dimension Plateau dimensions
   */
  constructor(
    public readonly plateauId: string,
    public readonly dimension: { height: number, width: number },
  ) {}
}
