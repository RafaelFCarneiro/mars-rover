export class CreatePlateauCommand {
  /**
   * 
   * @param name 
   * @param dimension 
   */
  constructor(
    public readonly name: string,
    public readonly dimension: { height: number, width: number },
  ) {
  }
}