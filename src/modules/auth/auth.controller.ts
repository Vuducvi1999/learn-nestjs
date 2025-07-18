import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'src/common/decorators/current-user';
import { AuthService } from './auth.service';
import { RequestRefreshTokenDto } from './dto/request-refresh-token.dto';
import { Public } from 'src/common/decorators/public-api';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserDocument } from 'src/schemas/user.schema';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('auth/login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('auth/refresh-token')
  refreshToken(
    @CurrentUser() user: UserDocument,
    @Body() { refreshToken }: RequestRefreshTokenDto,
  ) {
    return this.authService.refreshToken(user, refreshToken);
  }
}
