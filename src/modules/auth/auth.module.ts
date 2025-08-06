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
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvType } from '../../../env-validation';

@Module({
  imports: [
    UserModule,
    PassportModule,
    MongooseModule.forFeature([
      { name: ValidRefreshToken.name, schema: ValidRefreshTokenSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvType>) => {
        return {
          secret: configService.get('JWT_SECRET', { infer: true }),
          signOptions: {
            expiresIn: '5m',
          },
        };
      },
    }),
  ],
  providers: [AuthService, UserService, AuthStrategy],
})
export class AuthModule {}
