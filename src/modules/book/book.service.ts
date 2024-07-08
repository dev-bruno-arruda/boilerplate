import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './book.repository';
import { Book } from '../../core/entities/book.entity';
import { CreateBookDto, UpdateBookDto } from '../../core/dtos/book';
import { BookFactoryService } from './book.factory';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository)
    private bookRepository: BookRepository,
    private bookFactoryService: BookFactoryService,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async getBookById(id: number): Promise<Book> {
    return this.bookRepository.findOne({ where: { id: id } });
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.bookFactoryService.createNewBook(createBookDto);
    return this.bookRepository.save(newBook);
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = this.bookFactoryService.updateBook(updateBookDto);
    await this.bookRepository.update(id, updatedBook);
    return this.getBookById(id);
  }
}
