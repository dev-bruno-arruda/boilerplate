import { Controller, Get, Param, Post, Body, Put } from '@nestjs/common';
import { CreateAuthorDto, UpdateAuthorDto } from '../../core/dtos/author';
import { AuthorUseCases } from './author.usecases';
import { Author } from '../../core/entities/author.entity';

@Controller('api/authors')
export class AuthorController {
  constructor(private authorUseCases: AuthorUseCases) {}

  @Get()
  async getAll(): Promise<Author[]> {
    return this.authorUseCases.getAllAuthors();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Author> {
    return this.authorUseCases.getAuthorById(id);
  }

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorUseCases.createAuthor(createAuthorDto);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    return this.authorUseCases.updateAuthor(id, updateAuthorDto);
  }
}
