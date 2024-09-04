import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Accounts } from './accounts/accounts.schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountsDTO } from './accounts/accounts.dto';

@Injectable()
export class AccountsService {

  constructor(
    @InjectRepository(Accounts)
    private AccountsRepository: Repository<any>
  ){}

  async getAccountDetails(user:any): Promise<any> {
    return this.AccountsRepository.find({where: {
        user: { id: user.user.userId }
    }})
  }

  async updateAccountDetails(userId: string, accountId: string, updates: Partial<Accounts>): Promise<Accounts> {
    const account = await this.AccountsRepository.findOne({
      where: {
        id: accountId,
        user: { id: userId },
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    Object.assign(account, updates);
    return this.AccountsRepository.save(account);
  }


  async fuzzySearchAccounts(query: string): Promise<any> {
    const similarSearches = await this.AccountsRepository
      .createQueryBuilder('accounts')
      .where('LOWER(accounts.paymentName) LIKE LOWER(:query)', { query: `%${query}%` })
      .getOne()
    return similarSearches
  }

  async createPaymentPage(slugName): Promise<Object>{
    const account = await this.AccountsRepository.find({ where: {
      paymentName : slugName
    }, 
    select: ['id', 'amounts', 'paymentName', 'slogan', 'description', 'message'],
    relations: ['user']
    })

    const publicAccountDetails = account.map(account => ({
      id: account.id,
      amounts: account.amounts,
      paymentName: account.paymentName,
      slogan: account.slogan,
      description: account.description,
      message: account.message,
      account_id: {
        id: account.user.id,
      }
    }))
    return publicAccountDetails
  }

  async createAccountDetails(accountData:AccountsDTO, user:any): 
  Promise<{message: string, status: string | number}> {
    // console.log(user, "USER DETAILS")
    try {
        const data: AccountsDTO = Object.assign(accountData, { user: user.user.userId })
  
        const account = this.AccountsRepository.create(data)
        await this.AccountsRepository.save(account)
  
        return {
          message: 'Account created successfully',
          status: HttpStatus.CREATED,
        };
      } catch (error) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'An error occured when sdaving your account details',
            error: error.message,
          },
          HttpStatus.BAD_REQUEST
        )
      }
    }
}
