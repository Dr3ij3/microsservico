import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';


@Module({
  imports: [UsersModule, MongooseModule.forRoot('mongodb+srv://rhadijadreige:admin123@cluster0.i7f6hqi.mongodb.net/users-api?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
