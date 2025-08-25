import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../utils/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthServiceImplementation } from './implementation/auth-service-implementation';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [AuthController],
  imports: [
    PrismaModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: AuthService,
      useClass: AuthServiceImplementation,
    },
  ],
})
export class AuthModule {}
