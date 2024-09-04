import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/auth/schemas/user.dto';
import { User } from 'src/auth/schemas/user.schema';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<any>,
  ) {}

  async userRegistration(data:CreateUserDTO): Promise<any> {
   try {
    const { password, ...userData } = data
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = this.userRepository.create({ password: hashedPassword, ...userData })
    await this.userRepository.save(newUser)
    return { 
      message: 'User created successfully',
      status: HttpStatus.CREATED
    }
   } 
   catch (error: any) {
    let errorMessage = error.code === '23505' ? 'Username or email is already taken.' :
          error.code === '22P02' ? 'Invalid phone number format.' :
          error.message.includes('password') ? 'Invalid password length.' :
          'An error occurred during user registration.'


    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        message: errorMessage,
        error: error.message,
      },
      HttpStatus.BAD_REQUEST
    )}
  }

}
