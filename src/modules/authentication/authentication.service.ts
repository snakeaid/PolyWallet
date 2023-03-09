import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../../data-access/users/users.repository';
import { UsersEntity } from '../../data-access/users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { ScopeLogger } from '../logger/scope-logger';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthenticationService {
  private readonly logger: ScopeLogger;

  public constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    loggerService: LoggerService,
  ) {
    loggerService.setContext(AuthenticationService.name);
    this.logger = loggerService.toScopeLogger(null);
  }

  public async validateUser(username: string, password: string) {
    const user = await this.usersRepository.getByUsername(username);
    if (user && user.password === password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  public async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  public async register(username: string, password: string): Promise<UsersEntity> {
    const user = this.usersRepository.add(username, password);

    return user;
  }
}
