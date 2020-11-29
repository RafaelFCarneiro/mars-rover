import { Module } from '@nestjs/common';
import { PlateauModule } from './plateau/plateau.module';
import { RoverModule } from './rover/rover.module';

@Module({
  imports: [
    PlateauModule,
    RoverModule,
  ],
})
export class AppModule { }
