import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from '../../modules/book/book.service';
import { BookRepository } from '../../modules/book/book.repository';
import { BookFactoryService } from '../../modules/book/book.factory';
import { BookUseCases } from '../../modules/book/book.usecases';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateBookDto, UpdateBookDto } from '../../core/dtos/book';
import { Book } from '../../core/entities/book.entity';
import { Author } from '../../core/entities/author.entity';
import { Genre } from '../../core/entities/genre.entity';
import { UpdateResult } from 'typeorm';
import { mockBookRepository, mockBooks, mockBook, createBookDto, updateBookDto, mockUpdateResult, mockCreatedBook, mockUpdatedBook  } from './book.mocks';

describe('BookService and BookUseCases', () => {
  let service: BookService;
  let useCases: BookUseCases;
  //let mockBookRepository: Partial<BookRepository>;
  let bookFactoryService: BookFactoryService;

  beforeEach(async () => {
    // mockBookRepository = {
    //   find: jest.fn(),
    //   findOne: jest.fn(),
    //   create: jest.fn(),
    //   save: jest.fn(),
    //   update: jest.fn(),
    // };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        BookFactoryService,
        BookUseCases,
        {
          provide: getRepositoryToken(BookRepository),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    useCases = module.get<BookUseCases>(BookUseCases);
    bookFactoryService = module.get<BookFactoryService>(BookFactoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('BookService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('BookUseCases should be defined', () => {
    expect(useCases).toBeDefined();
  });

  // Tests for BookService
  it('should create a new book in BookService', async () => {
    
    jest.spyOn(bookFactoryService, 'createNewBook').mockReturnValue(mockCreatedBook);
    jest.spyOn(mockBookRepository, 'save').mockResolvedValue(mockCreatedBook);

    const result = await service.createBook(createBookDto);

    expect(result).toEqual(mockCreatedBook);
    expect(bookFactoryService.createNewBook).toHaveBeenCalledWith(createBookDto);
    expect(mockBookRepository.save).toHaveBeenCalledWith(mockCreatedBook);
  });

  it('should get all books in BookService', async () => {

    jest.spyOn(mockBookRepository, 'find').mockResolvedValue(mockBooks);

    const result = await service.getAllBooks();

    expect(result).toEqual(mockBooks);
    expect(mockBookRepository.find).toHaveBeenCalled();
  });

  it('should get a book by ID in BookService', async () => {

    jest.spyOn(mockBookRepository, 'findOne').mockResolvedValue(mockBook);

    const result = await service.getBookById(1);

    expect(result).toEqual(mockBook);
    expect(mockBookRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a book in BookService', async () => {

    jest.spyOn(bookFactoryService, 'updateBook').mockReturnValue(mockUpdatedBook);
    jest.spyOn(mockBookRepository, 'update').mockResolvedValue(mockUpdateResult);
    jest.spyOn(mockBookRepository, 'findOne').mockResolvedValue(mockUpdatedBook);

    const result = await service.updateBook(1, updateBookDto);

    expect(result).toEqual(mockUpdatedBook);
    expect(bookFactoryService.updateBook).toHaveBeenCalledWith(updateBookDto);
    expect(mockBookRepository.update).toHaveBeenCalledWith(1, mockUpdatedBook);
    expect(mockBookRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  // Tests for BookUseCases
  it('should get all books in BookUseCases', async () => {
   
    jest.spyOn(service, 'getAllBooks').mockResolvedValue(mockBooks);

    const result = await useCases.getAllBooks();

    expect(result).toEqual(mockBooks);
    expect(service.getAllBooks).toHaveBeenCalled();
  });

  it('should get a book by ID in BookUseCases', async () => {

    jest.spyOn(service, 'getBookById').mockResolvedValue(mockBook);

    const result = await useCases.getBookById(1);

    expect(result).toEqual(mockBook);
    expect(service.getBookById).toHaveBeenCalledWith(1);
  });

  it('should create a new book in BookUseCases', async () => {

    jest.spyOn(bookFactoryService, 'createNewBook').mockReturnValue(mockCreatedBook);
    jest.spyOn(service, 'createBook').mockResolvedValue(mockCreatedBook);

    const result = await useCases.createBook(createBookDto);

    expect(result).toEqual(mockCreatedBook);
    expect(bookFactoryService.createNewBook).toHaveBeenCalledWith(createBookDto);
    expect(service.createBook).toHaveBeenCalledWith(mockCreatedBook);
  });

  it('should update a book in BookUseCases', async () => {
    jest.spyOn(bookFactoryService, 'updateBook').mockReturnValue(mockUpdatedBook);
    jest.spyOn(service, 'updateBook').mockResolvedValue(mockUpdatedBook);

    const result = await useCases.updateBook(1, updateBookDto);

    expect(result).toEqual(mockUpdatedBook);
    expect(bookFactoryService.updateBook).toHaveBeenCalledWith(updateBookDto);
    expect(service.updateBook).toHaveBeenCalledWith(1, mockUpdatedBook);
  });

  it('should get first where', async () => {
    const column = 'id';
    const value = 1;
    const operator = '=';
  
    jest.spyOn(mockBookRepository, 'firstWhere').mockResolvedValue(mockBook);
  
    const result = await service.getFirstWhere(column, value, operator);
  
    expect(result).toEqual(mockBook);
    expect(mockBookRepository.firstWhere).toHaveBeenCalledWith(column, value, operator);
  });
  
  
});
