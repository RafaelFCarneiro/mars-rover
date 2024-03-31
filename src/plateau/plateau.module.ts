import { Module } from '@nestjs/common';
import { PlateauController } from './ports/controllers/plateau.controller';
import { CommandHandlers, QueryHandlers } from './application';
import { PlateauRepositories } from './ports';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule],
    controllers: [PlateauController],
    providers: [
        ...CommandHandlers,
        ...QueryHandlers,
        ...PlateauRepositories
    ],
})
export class PlateauModule { }
