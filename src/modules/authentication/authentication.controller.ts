import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { AuthenticationService } from './authentication.service';
import { UserRegistrationModel } from './models/user-registration.model';
import { JwtGuard } from './guards/jwt.guard';

@Controller('/auth')
export class AuthenticationController {
  public constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  public async register(@Body() registrationModel: UserRegistrationModel): Promise<any> {
    const user = await this.authenticationService.register(
      registrationModel.username,
      registrationModel.password,
    );

    return user;
  }

  @UseGuards(LocalGuard)
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  public async login(@Request() req) {
    return this.authenticationService.login(req.user);
  }

  @UseGuards(JwtGuard)
  @Get('profile')
  public getProfile(@Request() req) {
    return req.user;
  }
}
