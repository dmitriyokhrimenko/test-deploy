import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // findOne(id: string): Promise<User> {
  //   return this.usersRepository.findOne(id);
  // }
  //
  // findByEmail(email: string): Promise<User> {
  //   return this.usersRepository.findOne({
  //     where: {
  //       email: email,
  //     },
  //   });
  // }
}
