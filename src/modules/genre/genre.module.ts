import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { GenreUseCases } from './genre.usecases';
import { GenreRepository } from './genre.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GenreRepository])],
  controllers: [GenreController],
  providers: [GenreService, GenreUseCases],
})
export class GenreModule {}
