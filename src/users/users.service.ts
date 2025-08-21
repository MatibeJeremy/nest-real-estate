import { CreateUsersDto } from "./data/create-users.dto";

export abstract class UsersService {
  abstract create(data: CreateUsersDto): CreateUsersDto;
}