import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { CreateUsersDto } from './data/dto/create-users.dto';
import { UsersService } from './users.service';
import { ResponseBody } from '../utils/response-body';

@Controller('users')
export class UsersController {
  constructor(private readonly _userService: UsersService) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() createUserDto: CreateUsersDto,
  ): Promise<ResponseBody<any>> {
    return await this._userService.create(createUserDto);
  }
}
