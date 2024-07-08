import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookUseCases } from './book.usecases';
import { BookRepository } from './book.repository';
import { BookFactoryService } from './book.factory';

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository])],
  controllers: [BookController],
  providers: [BookService, BookUseCases, BookFactoryService],
})
export class BookModule {}
