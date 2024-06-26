import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreatePlateauCommand } from './create-plateau.command';
import { Plateau, PlateauDimension } from "./../../../domain/models";
import { DIIdentifiers, IPlateauRepository } from "../../interfaces";

@CommandHandler(CreatePlateauCommand)
export class CreatePlateauHandler implements ICommandHandler<CreatePlateauCommand> {
  
  constructor(
    @Inject(DIIdentifiers.IPlateauRepository) private readonly repo: IPlateauRepository,
    private readonly publisher: EventPublisher
  ) { }

  async execute(command: CreatePlateauCommand): Promise<IPlateauDto>{
    const { id, dimension } = command;

    const findedPlateau = await this.repo.findById(id);    
    const hasFound = !!findedPlateau;
    if (hasFound) {
      throw new Error(CreatePlateauErros.PlateauAlreadyExist);
    };

    const plateau = new Plateau({
      id, dimension: new PlateauDimension(dimension)
    });

    const insertedPlateau = this.publisher.mergeObjectContext(
      await this.repo.insert(plateau)
    );
    
    insertedPlateau.commit();
    return { ...insertedPlateau } as IPlateauDto
  }
}

export interface IPlateauDto {
  id: string;
  dimension: { height: number; width: number; };
}

export const CreatePlateauErros = {
  PlateauAlreadyExist: 'Plateau already exists for the given identifier',
}