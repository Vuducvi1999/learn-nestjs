import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from '../../shared/types/jwt-payload';
import { UserService } from '../../shared/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (ctx) => {
          const token =
            (ctx as Request).headers.authorization?.split(' ').at(1) || null;

          return token;
        },
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET!,
    });
  }

  async validate({ _id }: JwtPayload) {
    const user = await this.userService.findById(_id.toString());
    console.log({ user });
    if (!user) {
      throw new UnauthorizedException({
        message: 'validate failed',
      });
    }
    return user;
  }
}
