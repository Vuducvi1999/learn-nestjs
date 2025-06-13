import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('users')
@UsePipes(
  new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }),
)
export class UsersController {
  @Get('/')
  getAll() {
    return 1;
  }
}
