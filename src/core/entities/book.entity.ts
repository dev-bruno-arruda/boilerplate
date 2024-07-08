import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Author } from './author.entity';
import { Genre } from './genre.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @ManyToOne(() => Author, { eager: true })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @Column()
  authorId: number;


  @ManyToOne(() => Genre, { eager: true })
  @JoinColumn({ name: 'genreId' })
  genre: Genre;

  @Column()
  genreId: number;

  @Column()
  publishDate: Date;
}
