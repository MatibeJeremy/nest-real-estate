import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginInterface, LoginResponseInterface } from '../../utils/interfaces';
import { PrismaService } from '../../prisma/prisma.service';
import * as hash from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthServiceImplementation extends AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async login(loginPayload: LoginInterface): Promise<LoginResponseInterface> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email: loginPayload.email,
        },
      });
      if (user) {
        // Compare hashed passwords
        const isPasswordValid = await hash.compare(
          loginPayload.password,
          user.password,
        );
        if (isPasswordValid) {
          // Generate JWT token or any other login success logic
          const generateToken = await this.jwtService.signAsync(loginPayload);
          // exclude password from user object before returning
          delete user.password;
          return {
            accessToken: generateToken,
            expiresIn: 3600,
            user: user,
          };
        } else {
          return { message: 'Invalid credentials', statusCode: 401 };
        }
      } else {
        return { message: 'User not found', statusCode: 404 };
      }
    } catch (e) {
      return { message: e.message, statusCode: 500 };
    }
  }
}
