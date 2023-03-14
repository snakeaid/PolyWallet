import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MonobankCredentialsModel } from './credentials/monobank-credentials.model';
import { MonobankService } from './monobank.service';
import { JwtGuard } from '../authentication/guards/jwt.guard';

@Controller('/monobank')
export class MonobankController {
  public constructor(private readonly monobankService: MonobankService) {}

  @UseGuards(JwtGuard)
  @Post('/authenticate')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  public async authenticate(
    @Body() credentialsModel: MonobankCredentialsModel,
    @Request() request,
  ): Promise<any> {
    try {
      await this.monobankService.authenticate(request.user.username, credentialsModel);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtGuard)
  @Post('/new')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.BAD_REQUEST)
  public async newUser(
    @Body() credentialsModel: MonobankCredentialsModel,
    @Request() request,
  ): Promise<any> {
    await this.monobankService.addNewUser(request.user.username, credentialsModel);
  }
}
