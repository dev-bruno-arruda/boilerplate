import { Injectable } from '@nestjs/common';
import { CreateAuthorDto, UpdateAuthorDto } from '../../core/dtos/author';
import { Author } from '../../core/entities/author.entity';

@Injectable()
export class AuthorFactoryService {
  createNewAuthor(createAuthorDto: CreateAuthorDto): Author {
    const newAuthor = new Author();
    newAuthor.name = createAuthorDto.name;
    return newAuthor;
  }

  updateAuthor(updateAuthorDto: UpdateAuthorDto): Author {
    const updatedAuthor = new Author();
    updatedAuthor.name = updateAuthorDto.name;
    return updatedAuthor;
  }
}
