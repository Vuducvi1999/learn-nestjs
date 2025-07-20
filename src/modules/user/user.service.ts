import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { hash } from 'bcrypt';
import { User } from '../../schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async findOne({ email }: Partial<Pick<User, 'email'>>) {
    return await this.userModel.findOne({ email });
  }

  async create({ name, password, email }: CreateUserDto) {
    const hashedPassword = await hash(password, 10);

    return await this.userModel.create({ name, hashedPassword, email });
  }
}
