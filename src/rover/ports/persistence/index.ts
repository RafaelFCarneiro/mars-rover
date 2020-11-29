import { DIIdentifiers } from '../../application/Interfaces';
import { RoverRepository } from './rover.repository';

export const RoverRepositories = [
  { provide: DIIdentifiers.IRoverRepository, useClass: RoverRepository }
]