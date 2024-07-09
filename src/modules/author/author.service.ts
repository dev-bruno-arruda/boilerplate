import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorRepository } from './author.repository';
import { Author } from '../../core/entities/author.entity';
import { CreateAuthorDto, UpdateAuthorDto } from '../../core/dtos/author';
import { AuthorFactoryService } from './author.factory';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorRepository)
    private authorRepository: AuthorRepository,
    private authorFactoryService: AuthorFactoryService,
  ) {}

  async getAllAuthors(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async getAuthorById(id: number): Promise<Author> {
    return await this.authorRepository.findOne({ where: { id } });
  }

  async createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const newAuthor = this.authorFactoryService.createNewAuthor(createAuthorDto);
    return await this.authorRepository.save(newAuthor);
  }
  
  async updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const updatedAuthor = this.authorFactoryService.updateAuthor(updateAuthorDto);
    await this.authorRepository.update(id, updatedAuthor);
    return await this.getAuthorById(id);
  }
}
