import { UsersService } from "../users.service";
import { CreateUsersDto } from "../data/create-users.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserServiceImplementation extends UsersService{
  create(data: CreateUsersDto): CreateUsersDto {
    return data;
  }
}