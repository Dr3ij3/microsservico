import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.model';
import { CpfValidator } from 'src/utils/cpf-validator';
import { MongoNetworkError } from 'mongodb';
import { error } from 'console';
import { strict } from 'assert';

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
    user.cpf = user.cpf.replace(/[\D]/g, '');
    this.CpfValidator.validate(user.cpf);
    const userExists = await this.findOne(user.cpf);
    if (userExists) {
      throw new HttpException('CPF já registrado!', HttpStatus.BAD_REQUEST);
    }
    return this.usersModel.create(user);
  }

  async findOne(cpf: string): Promise<User> {
    this.CpfValidator.validate(cpf);
    return await this.usersModel.findOne({ cpf });
  }

  async findOneAndUpdate(cpf: string, name: string): Promise<User> {
    this.CpfValidator.validate(cpf);
    return await this.usersModel
      .findOneAndUpdate({ cpf }, { name }, { new: true })
      .exec();
  }

  async findOneAndDelete(cpf: string): Promise<User> {
    this.CpfValidator.validate(cpf);
    return await this.usersModel.findOneAndDelete({ cpf });
  }
}
