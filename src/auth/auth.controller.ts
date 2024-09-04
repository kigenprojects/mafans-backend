import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './schemas/user.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
@ApiTags('User Authentication')
export class AuthController {

  constructor(
    private readonly jwtS: JwtService, 
    private readonly authService: AuthService,
  ){}

  @Post('login')
  @ApiBody({ 
    type: LoginDTO, 
    required: true, 
    description: 'Login to your Mafans account' 
  })
  async login(@Body() loginDto: LoginDTO): Promise<any> {
    const { username, password } = loginDto;
    const user = await this.authService.login(username, password)
    if (!user) {
      throw new HttpException('Invalid credentials provided', HttpStatus.UNAUTHORIZED)
    }
    const token = this.jwtS.sign({
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      email: user.email,
      verified: user.isVerified,
      role: user.role
    })
    return { token }
  }
}
