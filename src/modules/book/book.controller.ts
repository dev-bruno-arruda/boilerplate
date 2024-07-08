import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from '../../core/dtos/book';
import { BookUseCases } from './book.usecases';
import { Book } from '../../core/entities/book.entity';

@Controller('api/books')
export class BookController {
  constructor(private bookUseCases: BookUseCases) {}

  @Get()
  async getAll(): Promise<Book[]> {
    return this.bookUseCases.getAllBooks();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Book> {
    return this.bookUseCases.getBookById(id);
  }

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookUseCases.createBook(createBookDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
    return this.bookUseCases.updateBook(id, updateBookDto);
  }
}
