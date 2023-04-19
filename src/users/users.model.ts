import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  cpf: string;
}

export const UsersSchema = SchemaFactory.createForClass(User);
