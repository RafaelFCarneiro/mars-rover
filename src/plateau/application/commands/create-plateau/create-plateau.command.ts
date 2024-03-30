export class CreatePlateauCommand {
  /**
   * 
   * @param id 
   * @param dimension 
   */
  constructor(
    public readonly id: string,
    public readonly dimension: { height: number, width: number },
  ) {
  }
}