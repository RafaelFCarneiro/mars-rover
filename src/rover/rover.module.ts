import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoverService } from './application';
import { CommandHandlers } from './application';
import { RoverRepositories } from './ports';

@Module({
  imports: [CqrsModule],
  providers: [
    ...CommandHandlers,
    ...RoverRepositories,
    RoverService,    
  ],
})
export class RoverModule {}
