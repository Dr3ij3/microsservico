import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
import { CpfValidator } from 'src/utils/cpf-validator';
import { MongoNetworkError } from 'mongodb';
import { error } from 'console';

//import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<User>,
    private CpfValidator: CpfValidator,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersModel.find().exec();
  }

  async create(user: User): Promise<User> {
    if (!this.CpfValidator.validate(user.cpf)) {
      throw new HttpException(
        'CPF não valido, tente novamente!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const userExists = await this.findOne(user.cpf);
    if (userExists) {
      throw new HttpException('CPF já registrado!', HttpStatus.BAD_REQUEST);
    }
    return this.usersModel.create(user);
  }

  async findOne(cpf: String): Promise<User> {
    return await this.usersModel.findOne({ cpf });
  }

  async findOneAndDelete(cpf: String): Promise<User> {
    return await this.usersModel.findOneAndDelete({ cpf });
  }
}
