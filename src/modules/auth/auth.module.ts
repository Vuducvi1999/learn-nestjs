import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ValidRefreshToken,
  ValidRefreshTokenSchema,
} from 'src/schemas/refresh-token.schema';

@Module({
  imports: [
    UserModule,
    PassportModule,
    MongooseModule.forFeature([
      { name: ValidRefreshToken.name, schema: ValidRefreshTokenSchema },
    ]),
  ],
  providers: [AuthService, UserService, AuthStrategy],
})
export class AuthModule {}
