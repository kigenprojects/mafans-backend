import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-strategy/jwt-auth.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { UsersAdminService } from './users.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/auth/schemas/user.schema';

@Controller('admin/users')
@ApiTags('Admin User Management')
@UseGuards(JwtAuthGuard, RoleGuard)

export class UsersAdminController {

  constructor(
    private userAdminServie: UsersAdminService
  ){}

  @Get('all')
  @ApiOperation({ 
    summary: 'Get all registered users',
    description: 'Retrieve a list of all registered users.'
  })
  async getAllRegisteredUsers(){
    return await this.userAdminServie.getUsers()
  }

  @Put(':id')
  @ApiOperation({ 
    summary: 'Update registered user',
    description: 'Update registered user details.'
  })
  async updateUser(@Param('id') id: string, @Body() updatedUser: Partial<User>): Promise<User> {
    return this.userAdminServie.updateUser(id, updatedUser)
  }
}
