import { Module } from '@nestjs/common';
import { PlateauController } from './ports/controller/plateau.controller';
import { CommandHandlers } from './application';
import { PlateauRepositories } from './ports';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
    imports: [CqrsModule],
    controllers: [PlateauController],
    providers: [
        ...CommandHandlers,
        ...PlateauRepositories
    ],
})
export class PlateauModule { }
