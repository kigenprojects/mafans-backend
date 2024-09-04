import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-strategy/jwt-auth.guard';
import { PaymentsDTO } from './payments/payments.dto';
import { RoleGuard } from 'src/shared/guards/role.guard';

@Controller('api/payments')
@ApiTags('MPESA Daraja API')
export class PaymentsController {
  
  constructor(
    private paymentS: PaymentsService
  ){}

  @Post()
  async initiateSTK(
    @Body() body
  ): Promise<PaymentsDTO> {
    return await this.paymentS.initiateSTK(body)
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getUserPaymentDetails(
    @Request() req: { 
      user: {
        userId: string,
        username: string
      }
    }
  ): Promise<PaymentsDTO> {
    return await this.paymentS.getPayments(req)
  }

  @Get('amount')
  @UseGuards(JwtAuthGuard)
  async getTotalAmount(@Request() req: { 
    user: {
      userId: string,
      username: string
    }
  }): Promise<{Totalamount: number, withdrawable: boolean}> {
    return await this.paymentS.getTotalFanAmount(req.user.userId)
  }
}


