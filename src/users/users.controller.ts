import { Controller, Post, HttpCode, Body } from "@nestjs/common";
import { CreateUsersDto } from "./data/create-users.dto";
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
  constructor(
    private readonly _userService: UsersService
  ) {
  }
  @Post()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUsersDto): CreateUsersDto {
    return this._userService.create(createUserDto);
  }
}
