import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';
import { promises } from 'dns';
import { cpf, validator } from 'cpf-cnpj-validator';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  async createUser(@Body() payload: User): Promise<User> {
    const createUser = await this.userService.create(payload);
    return createUser;
  }

  @Get()
  async findAllUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':cpf')
  async findByCpf(@Param('cpf') cpf: string): Promise<User> {
    return await this.userService.findOne(cpf);
  }

  @Patch(':cpf')
  async updateByCpf(
    @Param('cpf') cpf: string,
    @Body('name') name: string,
  ): Promise<User> {
    return await this.userService.findOneAndUpdate(cpf, name);
  }

  @Delete(':cpf')
  async deleteByCpf(@Param('cpf') cpf: string): Promise<User> {
    return await this.userService.findOneAndDelete(cpf);
  }
}
