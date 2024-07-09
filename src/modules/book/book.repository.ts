import { DataSource, Repository } from 'typeorm';
import { Book } from '../../core/entities/book.entity';
import {Injectable} from '@nestjs/common';

@Injectable()
export class BookRepository extends Repository<Book>{
  constructor(private dataSource: DataSource)
  {
    super(Repository, dataSource.createEntityManager());
  }

  async firstWhere(column: string, value: string | number, operator = '='): Promise<Book | undefined>
    {
        return await this.createQueryBuilder()
                         .where(`Book.${column} ${operator} :value`, {value: value})
                         .getOne();
    }
}
