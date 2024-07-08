
import { DataSource, Repository } from 'typeorm';
import { Genre } from '../../core/entities/genre.entity';
import {Injectable} from '@nestjs/common';

@Injectable()
export class GenreRepository extends Repository<Genre>{
  constructor(private dataSource: DataSource)
  {
    super(Repository, dataSource.createEntityManager());
  }

  async firstWhere(column: string, value: string | number, operator = '='): Promise<Genre | undefined>
    {
        return await this.createQueryBuilder()
                         .where(`Genre.${column} ${operator} :value`, {value: value})
                         .getOne();
    }
}
