import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './user.model';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('users')
  getUsers(): User[] {
    return this.appService.getUsers();
  }

  @Post('users')
  addUser(@Body() user: User): User {
    return this.appService.addUser(user);
  }
}
