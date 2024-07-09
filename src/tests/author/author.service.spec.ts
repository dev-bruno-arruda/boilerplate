import { Test, TestingModule } from '@nestjs/testing';
import { AuthorService } from '../../modules/author/author.service';
import { AuthorRepository } from '../../modules/author/author.repository';
import { AuthorFactoryService } from '../../modules/author/author.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateAuthorDto, UpdateAuthorDto } from '../../core/dtos/author';
import { Author } from '../../core/entities/author.entity';
import { UpdateResult } from 'typeorm';

describe('AuthorService', () => {
  let service: AuthorService;
  let mockAuthorRepository: Partial<AuthorRepository>;
  let authorFactoryService: AuthorFactoryService;

  beforeEach(async () => {
    mockAuthorRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorService,
        AuthorFactoryService,
        {
          provide: getRepositoryToken(AuthorRepository),
          useValue: mockAuthorRepository,
        },
      ],
    }).compile();

    service = module.get<AuthorService>(AuthorService);
    authorFactoryService = module.get<AuthorFactoryService>(AuthorFactoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new author', async () => {
    const createAuthorDto: CreateAuthorDto = {
      name: 'Test Author',
    };

    const mockCreatedAuthor = {
      id: 1,
      name: createAuthorDto.name,
    } as Author;

    jest.spyOn(authorFactoryService, 'createNewAuthor').mockReturnValue(mockCreatedAuthor);
    jest.spyOn(mockAuthorRepository, 'save').mockResolvedValue(mockCreatedAuthor);

    const result = await service.createAuthor(createAuthorDto);

    expect(result).toEqual(mockCreatedAuthor);
    expect(authorFactoryService.createNewAuthor).toHaveBeenCalledWith(createAuthorDto);
    expect(mockAuthorRepository.save).toHaveBeenCalledWith(mockCreatedAuthor);
  });

  it('should get all authors', async () => {
    const mockAuthors = [
      { id: 1, name: 'Author 1' } as Author,
      { id: 2, name: 'Author 2'} as Author,
    ];

    jest.spyOn(mockAuthorRepository, 'find').mockResolvedValue(mockAuthors);

    const result = await service.getAllAuthors();

    expect(result).toEqual(mockAuthors);
    expect(mockAuthorRepository.find).toHaveBeenCalled();
  });

  it('should get a author by ID', async () => {
    const mockAuthor = { id: 1, name: 'Test Atuhor' } as Author;

    jest.spyOn(mockAuthorRepository, 'findOne').mockResolvedValue(mockAuthor);

    const result = await service.getAuthorById(1);

    expect(result).toEqual(mockAuthor);
    expect(mockAuthorRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a author', async () => {
    const updateAuthorDto: UpdateAuthorDto = {
      name: 'Updated Atuhor'      
    };

    const mockUpdatedAuthor = {
      id: 1,
      name: updateAuthorDto.name,
    } as Author;

    const mockUpdateResult: UpdateResult = {
      affected: 1,
      raw: {},
      generatedMaps: [],
    };

    jest.spyOn(authorFactoryService, 'updateAuthor').mockReturnValue(mockUpdatedAuthor);
    jest.spyOn(mockAuthorRepository, 'update').mockResolvedValue(mockUpdateResult);
    jest.spyOn(mockAuthorRepository, 'findOne').mockResolvedValue(mockUpdatedAuthor);

    const result = await service.updateAuthor(1, updateAuthorDto);

    expect(result).toEqual(mockUpdatedAuthor);
    expect(authorFactoryService.updateAuthor).toHaveBeenCalledWith(updateAuthorDto);
    expect(mockAuthorRepository.update).toHaveBeenCalledWith(1, mockUpdatedAuthor);
    expect(mockAuthorRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});