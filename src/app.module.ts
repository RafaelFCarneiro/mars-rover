import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoverService } from './application';
import { CommandHandlers } from './application/commands';
import { Repositories } from './ports/persistence';

@Module({
  imports: [CqrsModule],
  providers: [
    ...CommandHandlers,
    ...Repositories,
    RoverService,    
  ],
})
export class AppModule {}
