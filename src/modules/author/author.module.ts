import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './author.controller';
import { AuthorService } from './author.service';
import { AuthorUseCases } from './author.usecases';
import { AuthorRepository } from './author.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuthorRepository])],
  controllers: [AuthorController],
  providers: [AuthorService, AuthorUseCases],
})
export class AuthorModule {}
