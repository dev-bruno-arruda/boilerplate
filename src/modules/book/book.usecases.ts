import { Injectable } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto, UpdateBookDto } from '../../core/dtos/book';
import { Book } from '../../core/entities/book.entity';
import { BookFactoryService } from './book.factory';

@Injectable()
export class BookUseCases {
  constructor(
    private bookService: BookService,
    private bookFactoryService: BookFactoryService,
  ) {}

  getAllBooks(): Promise<Book[]> {
    return this.bookService.getAllBooks();
  }

  getBookById(id: number): Promise<Book> {
    return this.bookService.getBookById(id);
  }

  createBook(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.bookFactoryService.createNewBook(createBookDto);
    return this.bookService.createBook(newBook);
  }

  updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = this.bookFactoryService.updateBook(updateBookDto);
    return this.bookService.updateBook(id, updatedBook);
  }
  getBookFirstWhere(column: string, value: string | number, operator = '='): Promise<Book | undefined> {
    return this.bookService.getFirstWhere(column, value, operator);
  }
}
