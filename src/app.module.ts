import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME_FOR_ENTITIES,
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(options)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
