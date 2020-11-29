import { Module } from '@nestjs/common';
import { RoverModule } from './rover/rover.module';

@Module({
  imports: [
    RoverModule,
  ],
})
export class AppModule {}
