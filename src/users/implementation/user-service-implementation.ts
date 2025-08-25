import { UsersService } from '../users.service';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ResponseBody } from '../../utils/response-body';
import * as hash from 'bcrypt';

@Injectable()
export class UserServiceImplementation extends UsersService {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }
  async create(data: Prisma.UserCreateInput): Promise<ResponseBody<any>> {
    try {
      // Hashing password before saving to database
      const saltRounds = hash.genSalt(10);
      data.password = await hash.hash(data.password, await saltRounds);
      // Submitting data to database
      const createdUser = await this.prismaService.user.create({
        data,
      });
      return new ResponseBody(201, 'User created successfully', createdUser);
    } catch (e) {
      // @TODO: Handle different types of errors
      return new ResponseBody(500, 'Internal server error', e.message);
    }
  }
}
