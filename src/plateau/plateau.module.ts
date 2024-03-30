import { Module } from '@nestjs/common';
import { PlateauController } from './ports/controller/plateau/plateau.controller';
import { CommandHandlers } from './application';

@Module({
    imports: [],
    controllers: [PlateauController],
    providers: [
        ...CommandHandlers,
    ],
})
export class PlateauModule { }
