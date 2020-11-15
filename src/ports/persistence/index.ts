import { DIIdentifiers } from './../../application/Interfaces';
import { RoverRepository } from './rover.repository';

export const Repositories = [
  { provide: DIIdentifiers.IRoverRepository, useClass: RoverRepository }
]