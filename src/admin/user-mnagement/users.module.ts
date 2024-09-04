import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersAdminService } from './users.service';
import { User } from 'src/auth/schemas/user.schema';
import { UsersAdminController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    UsersAdminService,
  ],
  controllers: [
    UsersAdminController
  ]
})
export class UsersAdminModule {
}
