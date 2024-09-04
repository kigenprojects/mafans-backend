import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'src/auth/schemas/user.dto';

@Controller('api/registration')
@ApiTags('User Registration')
export class UsersController {

  constructor(
    private readonly userService: UsersService
  ) {}

  @Post()
  @ApiBody({ 
    type: CreateUserDTO, 
    required: true, 
    description: 'Create new Mafans user' 
  })
  async createUser(@Body() newuser: CreateUserDTO):  Promise<any> {
    return this.userService.userRegistration(newuser)
  }
}
