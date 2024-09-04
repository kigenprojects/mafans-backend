import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeORMconfig } from './configs/typeorm.config';
import { UsersModule } from './components/users/users.module';
import { AccountsModule } from './components/accounts/accounts.module';
import { PaymentsModule } from './components/payments/payments.module';
import { AllExceptionsFilter } from './shared/errors/error.handler';
import { ErrorsEntity } from './shared/errors/error.schema';
import { UsersAdminModule } from './admin/user-mnagement/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMconfig),
    TypeOrmModule.forFeature([ErrorsEntity]),
  
    AuthModule,
    UsersModule,
    AccountsModule,
    PaymentsModule,


    // admin
    UsersAdminModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }
  ],
})
export class AppModule {}
