import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('create')
  create() {
    return this.userService.create();
  }

  @Get('list')
  list() {
    return this.userService.findAll();
  }
}
