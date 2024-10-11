import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class AppService {
  private users: User[] = [
    {
      name: 'John',
      age: 20,
    },
    {
      name: 'Jane',
      age: 21,
    },
  ];

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): User {
    this.users.push(user);
    return user;
  }
}
