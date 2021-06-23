import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findOne(id: string): Promise<User> {
    return null;
    // return this.usersRepository.findOne(id);
  }

  findByEmail(email: string): Promise<User> {
    // return null;
    return this.usersRepository.findOne({
      where: {
        email: email,
      },
    });
  }
}
