import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginInterface } from './interfaces';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class Utils {
  constructor(private readonly prismaService: PrismaService) {}
  async validateUserPermissions(user: LoginInterface, role: string) {
    const userDetails = await this.prismaService.user.findUnique({
      where: { email: user.email },
      select: { role: true, userId: true, email: true },
    });
    if (userDetails?.role !== role) {
      throw new ForbiddenException(
        `As a ${userDetails.role}, you do not have permission to perform this action.`,
      );
    }
    return userDetails;
  }
}
