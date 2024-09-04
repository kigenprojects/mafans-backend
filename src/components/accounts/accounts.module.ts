import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './accounts/accounts.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [
    AccountsService,
    JwtService
  ],
  controllers: [
    AccountsController
  ],
  imports: [
    TypeOrmModule.forFeature([Accounts]),
  ]
})
export class AccountsModule {}
