import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { MonobankCredentialsModel } from './monobank-credentials.model';
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
    await this.monobankService.authenticate(request.user.username, credentialsModel);
  }
}
