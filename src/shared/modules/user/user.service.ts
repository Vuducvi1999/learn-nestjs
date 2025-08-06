import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { User } from '../../../schemas/user.schema';
import { CreateUserDto } from '../../../modules/auth/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findById(id: string, lean = false) {
    return await this.userModel.findById(id).lean(lean);
  }

  async findOne({ email }: Partial<Pick<User, 'email'>>) {
    return await this.userModel.findOne({ email });
  }

  async create({ name, password, email }: CreateUserDto) {
    const hashedPassword = await hash(password, 10);

    return await this.userModel.create({ name, hashedPassword, email });
  }
}
