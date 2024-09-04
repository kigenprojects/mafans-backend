import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/schemas/user.schema';
import { UsersController } from './users.controller';

@Module({
  providers: [
    UsersService
  ],
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UsersController]
})
export class UsersModule {}
