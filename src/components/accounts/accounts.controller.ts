import { Body, Controller, Get, Post, UseGuards, Request, Req, Query, Param, Patch } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { JwtAuthGuard } from 'src/auth/jwt-strategy/jwt-auth.guard';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccountsDTO } from './accounts/accounts.dto';

@Controller('api/accounts')
@ApiTags('User Account Details')
export class AccountsController {

  constructor(
    private accountService: AccountsService
  ){}


  @Patch(':userId/:accountId')
  @ApiBody({ 
    type: AccountsDTO,
    required: true, 
    description: 'Update Account Details' 
  })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiParam({ name: 'accountId', description: 'Account ID' })
  async updateAccountDetails(
    @Param('userId') userId: string,
    @Param('accountId') accountId: string,
    @Body() updates: Partial<AccountsDTO>,
  ): Promise<AccountsDTO> {
    return this.accountService.updateAccountDetails(userId, accountId, updates)
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  async getAccountDetails(@Request() req: { 
    user: {
      userId: string,
      username: string
    }
  }): Promise<AccountsDTO> {
    return this.accountService.getAccountDetails(req)
  }

  @Get('search')
  async searchAccounts(@Query('query') query: string): Promise<AccountsDTO> {
  return this.accountService.fuzzySearchAccounts(query)
  }


  @Post()
  @ApiBody({ 
    type: AccountsDTO,
    required: true, 
    description: 'Add Account Details' 
  })
  @UseGuards(JwtAuthGuard)
  async createAccountDetails(
    @Body() accountData,
    @Request() req: { 
      user: {
        userId: string,
        username: string
      }
    }
  ): Promise<{message: string, status: string | number}> {
    return this.accountService.createAccountDetails(accountData, req)
  }


  @ApiBody({ 
    required: true, 
    description: 'Get Payment Page Details' 
  })
  @Post(':subdomain')
  async createPaymentPage(
    @Req() request: any
    ):Promise<Object> {
    return this.accountService.createPaymentPage(request.params.subdomain)
  }
}
