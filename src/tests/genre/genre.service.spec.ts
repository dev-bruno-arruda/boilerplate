import { Test, TestingModule } from '@nestjs/testing';
import { GenreService } from '../../modules/genre/genre.service';
import { GenreRepository } from '../../modules/genre/genre.repository';
import { GenreFactoryService } from '../../modules/genre/genre.factory';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateGenreDto, UpdateGenreDto } from '../../core/dtos/genre';
import { Genre } from '../../core/entities/genre.entity';
import { UpdateResult } from 'typeorm';

describe('GenreService', () => {
  let service: GenreService;
  let mockGenreRepository: Partial<GenreRepository>;
  let genreFactoryService: GenreFactoryService;

  beforeEach(async () => {
    mockGenreRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenreService,
        GenreFactoryService,
        {
          provide: getRepositoryToken(GenreRepository),
          useValue: mockGenreRepository,
        },
      ],
    }).compile();

    service = module.get<GenreService>(GenreService);
    genreFactoryService = module.get<GenreFactoryService>(GenreFactoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new genre', async () => {
    const createGenreDto: CreateGenreDto = {
      name: 'Test Genre',
    };

    const mockCreatedGenre = {
      id: 1,
      name: createGenreDto.name,
    } as Genre;

    jest.spyOn(genreFactoryService, 'createNewGenre').mockReturnValue(mockCreatedGenre);
    jest.spyOn(mockGenreRepository, 'save').mockResolvedValue(mockCreatedGenre);

    const result = await service.createGenre(createGenreDto);

    expect(result).toEqual(mockCreatedGenre);
    expect(genreFactoryService.createNewGenre).toHaveBeenCalledWith(createGenreDto);
    expect(mockGenreRepository.save).toHaveBeenCalledWith(mockCreatedGenre);
  });

  it('should get all genres', async () => {
    const mockGenres = [
      { id: 1, name: 'Genre 1' } as Genre,
      { id: 2, name: 'Genre 2'} as Genre,
    ];

    jest.spyOn(mockGenreRepository, 'find').mockResolvedValue(mockGenres);

    const result = await service.getAllGenres();

    expect(result).toEqual(mockGenres);
    expect(mockGenreRepository.find).toHaveBeenCalled();
  });

  it('should get a genre by ID', async () => {
    const mockGenre = { id: 1, name: 'Test Atuhor' } as Genre;

    jest.spyOn(mockGenreRepository, 'findOne').mockResolvedValue(mockGenre);

    const result = await service.getGenreById(1);

    expect(result).toEqual(mockGenre);
    expect(mockGenreRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should update a genre', async () => {
    const updateGenreDto: UpdateGenreDto = {
      name: 'Updated Atuhor'      
    };

    const mockUpdatedGenre = {
      id: 1,
      name: updateGenreDto.name,
    } as Genre;

    const mockUpdateResult: UpdateResult = {
      affected: 1,
      raw: {},
      generatedMaps: [],
    };

    jest.spyOn(genreFactoryService, 'updateGenre').mockReturnValue(mockUpdatedGenre);
    jest.spyOn(mockGenreRepository, 'update').mockResolvedValue(mockUpdateResult);
    jest.spyOn(mockGenreRepository, 'findOne').mockResolvedValue(mockUpdatedGenre);

    const result = await service.updateGenre(1, updateGenreDto);

    expect(result).toEqual(mockUpdatedGenre);
    expect(genreFactoryService.updateGenre).toHaveBeenCalledWith(updateGenreDto);
    expect(mockGenreRepository.update).toHaveBeenCalledWith(1, mockUpdatedGenre);
    expect(mockGenreRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});