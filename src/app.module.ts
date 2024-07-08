import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../app.controller';
import { BookModule } from './modules/book/book.module';
import { AuthorModule } from './modules/author/author.module';
import { GenreModule } from './modules/genre/genre.module';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(typeOrmConfig),
    BookModule,
    AuthorModule,
    GenreModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
