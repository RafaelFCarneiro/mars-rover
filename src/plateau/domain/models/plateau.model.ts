import { PlateauCreatedEvent } from './../events/plateau-created.event';
import { AggregateRoot } from "@nestjs/cqrs";
import { PlateauDimension } from "./value-objects";

export class Plateau extends AggregateRoot{    
  public readonly id: string
  public readonly dimension: PlateauDimension;
  
  constructor(data: {
    id: string,
    dimension: PlateauDimension
  }) {
    super();
    const { id, dimension } = data;
    
    this.validId(id);
    this.validDimensionRef(dimension);

    this.id = id;
    this.dimension = dimension;

    this.apply(new PlateauCreatedEvent(this.id, this.dimension))
  }

  private validDimensionRef(dimension: PlateauDimension) {
    const notValidDimension = !dimension || 
      !(dimension instanceof PlateauDimension)
    
    if (notValidDimension) {
      throw new Error(PlateauErrors.MustHaveDimension);
    }      
  }
  
  private validId(id: string) {
    const notHaveValidId = !id || !id.trim().length;
    if (notHaveValidId) {
      throw new Error(PlateauErrors.MustHaveValidId);
    }
  }  
}

export const PlateauErrors = {
  MustHaveValidId: 'Plateau must have a valid id!',
  MustHaveDimension: 'Plateau must have a dimension!',
}