// book.mocks.ts
import { Book } from '../../core/entities/book.entity';
import { Author } from '../../core/entities/author.entity';
import { Genre } from '../../core/entities/genre.entity';
import { CreateBookDto, UpdateBookDto } from '../../core/dtos/book';

export const mockBookRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  firstWhere: jest.fn()
};

export const mockBooks: Book[] = [
  { id: 1, title: 'Book 1', author: { id: 1 } as Author, genre: { id: 1 } as Genre, publishDate: new Date() } as Book,
  { id: 2, title: 'Book 2', author: { id: 2 } as Author, genre: { id: 2 } as Genre, publishDate: new Date() } as Book,
];

export const mockBook: Book = { id: 1, title: 'Test Book', author: { id: 1 } as Author, genre: { id: 1 } as Genre, publishDate: new Date() } as Book;

export const createBookDto: CreateBookDto = {
  title: 'Test Book',
  authorId: 1,
  genreId: 1,
  publishDate: new Date(),
};

export const updateBookDto: UpdateBookDto = {
  title: 'Updated Book',
  authorId: 1,
  genreId: 1,
  publishDate: new Date(),
};

export const mockCreatedBook = {
  id: 1,
  title: createBookDto.title,
  author: { id: createBookDto.authorId } as Author,
  genre: { id: createBookDto.genreId } as Genre,
  publishDate: createBookDto.publishDate,
} as Book;

export const mockUpdateResult = {
  affected: 1,
  raw: {},
  generatedMaps: [],
};

export const mockUpdatedBook = {
  id: 1,
  title: updateBookDto.title,
  author: { id: updateBookDto.authorId } as Author,
  genre: { id: updateBookDto.genreId } as Genre,
  publishDate: updateBookDto.publishDate,
} as Book;
