import { PlateauCreatedEvent } from './../events/plateau-created.event';
import { AggregateRoot } from "@nestjs/cqrs";
import { PlateauDimension } from "./value-objects";
import { IPlateauDto } from 'src/plateau/application';
import { isUUID } from 'class-validator';

export class Plateau extends AggregateRoot{    
  public readonly id: string;
  public readonly dimension: PlateauDimension;
  public readonly name: string;
  
  constructor(data: IPlateauDto) {
    super();
    const { id, dimension, name } = data;
    
    this.validId(id);
    this.validName(name);
    this.validDimensionRef(dimension);

    this.id = id;
    this.dimension = dimension;
    this.name = name;

    this.apply(new PlateauCreatedEvent(this.id, this.name, this.dimension))
  }

  private validDimensionRef(dimension: PlateauDimension) {
    const notValidDimension = !dimension || 
      !(dimension instanceof PlateauDimension)
    
    if (notValidDimension) {
      throw new Error(PlateauErrors.MustHaveDimension);
    }      
  }
  
  private validName(name: string) {
    if (IsEmpty(name)) {
      throw new Error(PlateauErrors.MustHaveValidName);
    }
  }  
  
  private validId(id: string) {
    if (IsEmpty(id) || !isUUID(id)) {
      throw new Error(PlateauErrors.MustHaveValidId);
    }
  }  
}

export const PlateauErrors = {
  MustHaveValidId: 'Plateau must have a valid id!',
  MustHaveValidName: 'Plateau must have a valid name!',
  MustHaveDimension: 'Plateau must have a dimension!',
}

function IsEmpty(name: string) {
  return !name || !name.trim().length;
}
