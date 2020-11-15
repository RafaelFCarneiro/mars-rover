import { RoverRepository } from './rover.repository';

export const Repositories = [
  { provide: 'IRoverRepository', useClass: RoverRepository }
]