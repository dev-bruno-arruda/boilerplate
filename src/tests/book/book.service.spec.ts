import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../../modules/book/book.service';
import { BookRepository } from '../../modules/book/book.repository';
import { BookFactoryService } from '../../modules/book/book.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateBookDto, UpdateBookDto } from '../../core/dtos/book';
import { Book } from '../../core/entities/book.entity';
import { Author } from '../../core/entities/author.entity';
import { Genre } from '../../core/entities/genre.entity';
import { UpdateResult } from 'typeorm';

describe('BookService', () => {
  let service: BookService;
  let mockBookRepository: Partial<BookRepository>;
  let bookFactoryService: BookFactoryService;

  beforeEach(async () => {
    mockBookRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        BookFactoryService,
        {
          provide: getRepositoryToken(BookRepository),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    bookFactoryService = module.get<BookFactoryService>(BookFactoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new book', async () => {
    const createBookDto: CreateBookDto = {
      title: 'Test Book',
      authorId: 1,
      genreId: 1,
      publishDate: new Date(),
    };

    const mockCreatedBook = {
      id: 1,
      title: createBookDto.title,
      author: { id: createBookDto.authorId } as Author,
      genre: { id: createBookDto.genreId } as Genre,
      publishDate: createBookDto.publishDate,
    } as Book;

    jest.spyOn(bookFactoryService, 'createNewBook').mockReturnValue(mockCreatedBook);
    jest.spyOn(mockBookRepository, 'save').mockResolvedValue(mockCreatedBook);

    const result = await service.createBook(createBookDto);

    expect(result).toEqual(mockCreatedBook);
    expect(bookFactoryService.createNewBook).toHaveBeenCalledWith(createBookDto);
    expect(mockBookRepository.save).toHaveBeenCalledWith(mockCreatedBook);
  });

  it('should get all books', async () => {
    const mockBooks = [
      { id: 1, title: 'Book 1', author: { id: 1 } as Author, genre: { id: 1 } as Genre, publishDate: new Date() } as Book,
      { id: 2, title: 'Book 2', author: { id: 2 } as Author, genre: { id: 2 } as Genre, publishDate: new Date() } as Book,
    ];

    jest.spyOn(mockBookRepository, 'find').mockResolvedValue(mockBooks);

    const result = await service.getAllBooks();

    expect(result).toEqual(mockBooks);
    expect(mockBookRepository.find).toHaveBeenCalled();
  });

  it('should get a book by ID', async () => {
    const mockBook = { id: 1, title: 'Test Book', author: { id: 1 } as Author, genre: { id: 1 } as Genre, publishDate: new Date() } as Book;

    jest.spyOn(mockBookRepository, 'findOne').mockResolvedValue(mockBook);

    const result = await service.getBookById(1);

    expect(result).toEqual(mockBook);
    expect(mockBookRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a book', async () => {
    const updateBookDto: UpdateBookDto = {
      title: 'Updated Book',
      authorId: 1,
      genreId: 1,
      publishDate: new Date(),
    };

    const mockUpdatedBook = {
      id: 1,
      title: updateBookDto.title,
      author: { id: updateBookDto.authorId } as Author,
      genre: { id: updateBookDto.genreId } as Genre,
      publishDate: updateBookDto.publishDate,
    } as Book;

    const mockUpdateResult: UpdateResult = {
      affected: 1,
      raw: {},
      generatedMaps: [],
    };

    jest.spyOn(bookFactoryService, 'updateBook').mockReturnValue(mockUpdatedBook);
    jest.spyOn(mockBookRepository, 'update').mockResolvedValue(mockUpdateResult);
    jest.spyOn(mockBookRepository, 'findOne').mockResolvedValue(mockUpdatedBook);

    const result = await service.updateBook(1, updateBookDto);

    expect(result).toEqual(mockUpdatedBook);
    expect(bookFactoryService.updateBook).toHaveBeenCalledWith(updateBookDto);
    expect(mockBookRepository.update).toHaveBeenCalledWith(1, mockUpdatedBook);
    expect(mockBookRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});