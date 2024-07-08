import { Injectable } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto, UpdateGenreDto } from '../../core/dtos/genre';
import { Genre } from '../../core/entities/genre.entity';

@Injectable()
export class GenreUseCases {
  constructor(private genreService: GenreService) {}

  getAllGenres(): Promise<Genre[]> {
    return this.genreService.getAllGenres();
  }

  getGenreById(id: number): Promise<Genre> {
    return this.genreService.getGenreById(id);
  }

  createGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreService.createGenre(createGenreDto);
  }

  updateGenre(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    return this.genreService.updateGenre(id, updateGenreDto);
  }
}
