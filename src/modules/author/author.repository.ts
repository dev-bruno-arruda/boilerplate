import { DataSource, Repository } from 'typeorm';
import { Author } from '../../core/entities/author.entity';
import {Injectable} from '@nestjs/common';

@Injectable()
export class AuthorRepository extends Repository<Author>{
  constructor(private dataSource: DataSource)
  {
    super(Repository, dataSource.createEntityManager());
  }

  async firstWhere(column: string, value: string | number, operator = '='): Promise<Author | undefined>
    {
        return await this.createQueryBuilder()
                         .where(`Author.${column} ${operator} :value`, {value: value})
                         .getOne();
    }
}
