import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from '../../core/entities/author.entity';
import { CreateAuthorDto, UpdateAuthorDto } from '../../core/dtos/author';
import { AuthorFactoryService } from './author.factory';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    private readonly authorFactoryService: AuthorFactoryService,
  ) {}

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const newAuthor = this.authorFactoryService.createNewAuthor(createAuthorDto);
    return await this.authorRepository.save(newAuthor);
  }

  async getAllAuthors(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async getAuthorById(id: number): Promise<Author> {
    return await this.authorRepository.findOne({ where: { id } });
  }

  async updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const updatedAuthor = this.authorFactoryService.updateAuthor(updateAuthorDto);
    await this.authorRepository.update(id, updatedAuthor);
    return await this.authorRepository.findOne({ where: { id } });
  }
}
