import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { Inject } from "@nestjs/common";
import { CreatePlateauCommand } from "./create-plateau.command";
import { Plateau, PlateauDimension } from "./../../../domain/models";
import { DIIdentifiers, IPlateauRepository } from "../../interfaces";
import { IPlateauDto } from "../../interfaces/plateau-dto.interface";
import { v4 as uuid } from "uuid";

@CommandHandler(CreatePlateauCommand)
export class CreatePlateauHandler
  implements ICommandHandler<CreatePlateauCommand>
{
  constructor(
    @Inject(DIIdentifiers.IPlateauRepository)
    private readonly repo: IPlateauRepository,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: CreatePlateauCommand): Promise<IPlateauDto> {
    const { name, dimension } = command;

    await this.validate(name);

    const plateau = new Plateau({
      id: uuid(),
      name,
      dimension: new PlateauDimension(dimension),
    });

    const insertedPlateau = this.publisher.mergeObjectContext(
      await this.repo.insert(plateau)
    );

    insertedPlateau.commit();
    return { ...insertedPlateau } as IPlateauDto;
  }

  private async validate(name: string) {
    const foundPlateau = await this.repo.find({ name });
    if (!!foundPlateau) {
      throw new Error(CreatePlateauErrors.PlateauAlreadyExist);
    }
  }
}

export const CreatePlateauErrors = {
  PlateauAlreadyExist: "Plateau already exists for the given name",
};
