import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || 'mysql',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'boilerplate',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // Use true apenas em desenvolvimento
};
