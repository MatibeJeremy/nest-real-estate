import { CreateUsersDto } from './data/dto/create-users.dto';
import { ResponseBody } from '../utils/response-body';
import { CreateUsersInterface } from '../utils/interfaces';

export abstract class UsersService {
  abstract create(
    data: CreateUsersDto,
  ): Promise<ResponseBody<CreateUsersInterface>>;
}
