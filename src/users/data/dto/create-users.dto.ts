import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserTypes } from '../enums/user-types';

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(UserTypes, {
    message: 'userType must be one of: HOME_OWNER, CONTRACTOR, PROJECT_MANAGER',
  })
  @IsNotEmpty()
  role: UserTypes;

  @IsString()
  @IsNotEmpty()
  password: string;
}
