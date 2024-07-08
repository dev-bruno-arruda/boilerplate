import { Injectable } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto, UpdateAuthorDto } from '../../core/dtos/author';
import { Author } from '../../core/entities/author.entity';

@Injectable()
export class AuthorUseCases {
  constructor(private authorService: AuthorService) {}

  getAllAuthors(): Promise<Author[]> {
    return this.authorService.getAllAuthors();
  }

  getAuthorById(id: number): Promise<Author> {
    return this.authorService.getAuthorById(id);
  }

  createAuthor(createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorService.createAuthor(createAuthorDto);
  }

  updateAuthor(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return this.authorService.updateAuthor(id, updateAuthorDto);
  }
}
