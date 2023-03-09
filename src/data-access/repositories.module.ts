import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './users/users.entity';
import { UsersRepository } from './users/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class RepositoriesModule {}
