import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Payments } from './payments/payments.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentsService {
  
  creds:string = btoa(`${process.env.DARAJA_MPESA_KEY}:${process.env.DARAJA_MPESA_SECRET}`)
  
  constructor(
    private http: HttpService,
    @InjectRepository(Payments)
    private paymentsRepository: Repository<Payments>
  ){}

  async getPayments(id):Promise<any> {
    return this.paymentsRepository.find({ where: {
      user: { 
        id: id.user.userId 
      }
    }})
  }

  async getTotalFanAmount(userId: string): Promise<{Totalamount: number, withdrawable: boolean}> {
    const queryBuilder = this.paymentsRepository.createQueryBuilder('payments')
    const result = await queryBuilder
      .select('SUM(payments.fan_amount) as total')
      .where('payments.user.id = :userId', { userId })
      .getRawOne();
  
    const totalAmount = parseFloat(result.total) || 0
  
    const baseRateResult = await this.paymentsRepository
      .createQueryBuilder('payments')
      .select('payments.baseRate', 'baseRate')
      .where('payments.user.id = :userId', { userId })
      .getRawOne();
  
    const baseRate = parseFloat(baseRateResult.baseRate) || 0
  
    const withdrawable = totalAmount * (baseRate/100) >= 500
  
    return {
      Totalamount: totalAmount * baseRate,
      withdrawable: withdrawable
    };
  }


  getCurrentTimestamp(): string {
    const now = new Date() 
    const year = now.getFullYear().toString()
    const month = this.padZero(now.getMonth() + 1)
    const date = this.padZero(now.getDate())
    const hour = this.padZero(now.getHours())
    const minute = this.padZero(now.getMinutes())
    const second = this.padZero(now.getSeconds())

    const timestamp = `${year}${month}${date}${hour}${minute}${second}`

    return timestamp
  }

  padZero(value: number): string {
    return value.toString().padStart(2, '0')
  }

  async initiateSTK(body: any): Promise<any> {
    // auth
    const creds = Buffer.from(`${process.env.DARAJA_MPESA_KEY}:${process.env.DARAJA_MPESA_SECRET}`).toString('base64')
    try {
      const response = await lastValueFrom(this.http
        .get(process.env.DARAJA_AUTH_ENDPOINT, { 
          headers: { 
            'Authorization': `Basic ${creds}` 
          } 
        }))
        // stk
      try {

        const payload = {
          "BusinessShortCode": process.env.DARAJA_MPESA_BUSINESS_SHORTCODE,
          "Password": Buffer.from(`${process.env.DARAJA_MPESA_BUSINESS_SHORTCODE}${process.env.DARAJA_MPESA_PASSKEY}${this.getCurrentTimestamp()}`).toString('base64'),
          "Timestamp": this.getCurrentTimestamp(),
          "TransactionType": "CustomerPayBillOnline",
          "Amount": body.fan_amount,
          "PartyA": body.fan_phone_number,
          "PartyB": process.env.DARAJA_MPESA_BUSINESS_SHORTCODE,
          "PhoneNumber": body.fan_phone_number,
          "CallBackURL": "https://mydomain.com/path",
          "AccountReference": "CompanyXLTD",
          "TransactionDesc": "Payment of X" 
        }

        const resp = await lastValueFrom(this.http.post(process.env.DARAJA_STK_ENDPOINT, payload, {
          headers: { 
            'Authorization': `Bearer ${response.data.access_token}`
           }
        }))
        const datWithID = Object.assign(body, { user: body.account_id })
        const payments = this.paymentsRepository.create(datWithID)
        await this.paymentsRepository.save(payments)
        return resp.data
      } catch (error) {
        // console.log(error)
        throw new HttpException (
          {
            status: error.code,
            message: error.data,
            error: {
              message : error.message,
              code: error.code,
              status: error.status
            },
          },
          HttpStatus.FORBIDDEN,
        )
      }      
    } catch (error) {
      throw new HttpException (
        {
          status: error.code,
          message: error.data.message,
          error: {
            message : error.message,
            code: error.code,
            status: error.status
          },
        },
        HttpStatus.FORBIDDEN,
      )
    }
  }
}
