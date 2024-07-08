import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { CreateGenreDto, UpdateGenreDto } from '../../core/dtos/genre/';
import { GenreUseCases } from './genre.usecases';
import { Genre } from '../../core/entities/genre.entity';

@Controller('api/genres')
export class GenreController {
  constructor(private genreUseCases: GenreUseCases) {}

  @Get()
  async getAll(): Promise<Genre[]> {
    return this.genreUseCases.getAllGenres();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Genre> {
    return this.genreUseCases.getGenreById(id);
  }

  @Post()
  async create(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreUseCases.createGenre(createGenreDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateGenreDto: UpdateGenreDto): Promise<Genre> {
    return this.genreUseCases.updateGenre(id, updateGenreDto);
  }
}
