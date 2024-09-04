import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from './payments/payments.schema';


@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Payments])
  ],
  providers: [
    PaymentsService
  ],
  controllers: [
    PaymentsController
]
})
export class PaymentsModule {}
