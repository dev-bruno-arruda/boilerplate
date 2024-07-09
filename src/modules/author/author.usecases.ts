import { Injectable } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from '../../core/dtos/author';
import { Author } from '../../core/entities/author.entity';
import { AuthorFactoryService } from './author.factory';

@Injectable()
export class AuthorUseCases {
  constructor(
    private authorService: AuthorService,
    private authorFactoryService: AuthorFactoryService,
  ) {}

  getAllAuthors(): Promise<Author[]> {
    return this.authorService.getAllAuthors();
  }

  getAuthorById(id: number): Promise<Author> {
    return this.authorService.getAuthorById(id);
  }

  createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const newAuthor = this.authorFactoryService.createNewAuthor(createAuthorDto);
    return this.authorService.createAuthor(newAuthor);
  }

  updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const updatedAuthor = this.authorFactoryService.updateAuthor(updateAuthorDto);
    return this.authorService.updateAuthor(id, updatedAuthor);
  }
}
