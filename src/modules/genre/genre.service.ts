import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreRepository } from './genre.repository';
import { Genre } from '../../core/entities/genre.entity';
import { CreateGenreDto, UpdateGenreDto } from '../../core/dtos/genre';
import { GenreFactoryService } from './genre.factory';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(GenreRepository)
    private readonly genreRepository: GenreRepository,
    private readonly genreFactoryService: GenreFactoryService,
  ) {}

  async getAllGenres(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async getGenreById(id: number): Promise<Genre> {
    return await this.genreRepository.findOne({ where: { id } });
  }
  
  async createGenre(createGenreDto: CreateGenreDto): Promise<Genre> {
    const newGenre = this.genreFactoryService.createNewGenre(createGenreDto);
    return await this.genreRepository.save(newGenre);
  }
  
  async updateGenre(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    const updatedGenre = this.genreFactoryService.updateGenre(updateGenreDto);
    await this.genreRepository.update(id, updatedGenre);
    return await this.genreRepository.findOne({ where: { id } });
  }
}
