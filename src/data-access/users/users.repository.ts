import { Injectable } from '@nestjs/common';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  public constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  public async getByUsername(username: string): Promise<UsersEntity> {
    const user = this.usersRepository.findOneBy({ username: username });

    return user;
  }

  public async add(username: string, password: string): Promise<UsersEntity> {
    const user = this.usersRepository.create({
      username: username,
      password: password,
    });

    return this.usersRepository.save(user);
  }
}
