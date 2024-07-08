import { Injectable } from '@nestjs/common';
import { CreateGenreDto, UpdateGenreDto } from '../../core/dtos/genre';
import { Genre } from '../../core/entities/genre.entity';

@Injectable()
export class GenreFactoryService {
  createNewGenre(createGenreDto: CreateGenreDto): Genre {
    const newGenre = new Genre();
    newGenre.name = createGenreDto.name;
    return newGenre;
  }

  updateGenre(updateGenreDto: UpdateGenreDto): Genre {
    const updatedGenre = new Genre();
    updatedGenre.name = updateGenreDto.name;
    return updatedGenre;
  }
}
