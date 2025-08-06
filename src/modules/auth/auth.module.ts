import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ValidRefreshToken,
  ValidRefreshTokenSchema,
} from 'src/schemas/refresh-token.schema';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvType } from '../../../env-validation';
import { AuthController } from './auth.controller';
import { UserModule } from '../../shared/modules/user/user.module';
import { UserService } from '../../shared/modules/user/user.service';

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
            expiresIn: '500m',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}
