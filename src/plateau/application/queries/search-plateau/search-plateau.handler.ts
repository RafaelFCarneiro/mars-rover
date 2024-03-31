import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DIIdentifiers, IPlateauRepository } from '../../interfaces';
import { Plateau } from '../../../domain';
import { SearchPlateauQuery } from './search-plateau.query';

@QueryHandler(SearchPlateauQuery)
export class SearchPlateauHandler implements IQueryHandler<SearchPlateauQuery> {
  constructor(
    @Inject(DIIdentifiers.IPlateauRepository)
    private readonly repo: IPlateauRepository,
  ) {}

  async execute(query: SearchPlateauQuery): Promise<Plateau[]> {
    return this.repo.search(query);
  }
}