import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { ValidRefreshToken } from 'src/schemas/refresh-token.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    @InjectModel(ValidRefreshToken.name)
    private validRefreshTokenModel: Model<ValidRefreshToken>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne({ email });
    if (user && compareSync(password, user.hashedPassword)) {
      return user;
    }
    return null;
  }

  async register({ name, password, email }: CreateUserDto) {
    await this.usersService.create({ name, password, email });
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOne(loginDto);
    if (!user) throw new UnauthorizedException('User not exist');
    return this.generateNewToken(user);
  }

  async refreshToken(user: UserDocument, token: string) {
    const currentRefreshToken = await this.validRefreshTokenModel.findOne({
      token,
    });

    if (!currentRefreshToken)
      throw new UnauthorizedException({ message: 'Invalid Refresh Token' });

    const { accessToken, refreshToken } = await this.generateNewToken(user);

    await this.validRefreshTokenModel.updateOne(
      { token },
      { token: refreshToken },
    );

    return { accessToken, refreshToken };
  }

  private async generateNewToken(user: UserDocument) {
    const payload = { name: user.name, _id: user._id };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.sign({}, { expiresIn: '1w' }),
    ]);
    return { accessToken, refreshToken };
  }
}
