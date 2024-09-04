import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/schemas/user.schema';
import { Repository } from 'typeorm';

@Injectable()
export class UsersAdminService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ){}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({
      select: [
        'id',
        'first_name',
        'last_name',
        'username',
        'phone_number',
        'email',
        'isActive',
        'isVerified',
        'role',
        'createdAt'
      ]
    })
  }

  async updateUser(id: string, updatedUser: Partial<User>): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { id },
    })
    if (!user) {
      throw new NotFoundException('User not found')
    }
  
    Object.assign(user, updatedUser)
    const updatedUserRecord = await this.usersRepository.save(user)

    return {
      status: HttpStatus.OK,
      message: "Data has been successfully updated",
      data: {
        id: updatedUserRecord.id,
        first_name: updatedUserRecord.first_name,
        last_name: updatedUserRecord.last_name,
        username: updatedUserRecord.username,
        phone_number: updatedUserRecord.phone_number,
        email: updatedUserRecord.email,
        isActive: updatedUserRecord.isActive, 
        isVerified: updatedUserRecord.isVerified,
        role: updatedUserRecord.role,
        createdAt: updatedUserRecord.createdAt,
      }
    }
  }
  
}
