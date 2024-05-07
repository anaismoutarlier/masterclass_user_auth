import { Injectable } from '@nestjs/common';
import { users } from './users.mock';

@Injectable()
export class UsersService {
  getUser(userId: string) {
    return users.find((user) => String(user.id) === userId);
  }
}
