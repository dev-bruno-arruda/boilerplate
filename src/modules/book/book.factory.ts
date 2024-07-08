import { Injectable } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from '../../core/dtos/book';
import { Book } from '../../core/entities/book.entity';

@Injectable()
export class BookFactoryService {
  createNewBook(createBookDto: CreateBookDto): Book {
    const newBook = new Book();
    newBook.title = createBookDto.title;
    newBook.authorId = createBookDto.authorId;
    newBook.genreId = createBookDto.genreId;
    newBook.publishDate = createBookDto.publishDate;
    return newBook;
  }

  updateBook(updateBookDto: UpdateBookDto): Book {
    const updatedBook = new Book();
    updatedBook.title = updateBookDto.title;
    updatedBook.authorId = updateBookDto.authorId;
    updatedBook.genreId = updateBookDto.genreId;
    updatedBook.publishDate = updateBookDto.publishDate;
    return updatedBook;
  }
}
